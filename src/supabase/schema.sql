-- Enable RLS
alter table profiles enable row level security;
alter table daily_streaks enable row level security;
alter table point_transactions enable row level security;

-- Add streak column to profiles if it doesn't exist
alter table profiles add column if not exists streak int default 0;

-- Create policies for safe read access provided by the user
create policy "Users can select own profile"
on profiles for select
using (auth.uid() = id);

create policy "Users can select own streak"
on daily_streaks for select
using (auth.uid() = user_id);

create policy "Users can select own point transactions"
on point_transactions for select
using (auth.uid() = user_id);

-- Create RPC function to claim daily streak
create or replace function claim_daily_streak()
returns table(current_streak int, points int) 
language plpgsql
security definer
as $$
declare
  user_streak int;
  last_check date;
begin
  -- Get current streak info (Aliased to avoid ambiguity)
  select d.current_streak, d.last_checkin into user_streak, last_check
  from daily_streaks d where d.user_id = auth.uid();

  -- If no streak record, initialize
  if user_streak is null then
    user_streak := 0;
  end if;

  -- Check compatibility (if already claimed today)
  if last_check = timezone('utc'::text, now())::date then
     -- Already claimed, return current state from profiles
     return query select p.streak as current_streak, p.points from profiles p where p.id = auth.uid();
     return;
  end if;

  -- Reset streak if missed a day (check if last check was yesterday)
  -- If last_check < yesterday, streak = 0
  if last_check < (timezone('utc'::text, now())::date - 1) then
     user_streak := 0;
  end if;

  -- Increment streak
  user_streak := user_streak + 1;

  -- Upsert daily_streaks
  insert into daily_streaks (user_id, current_streak, last_checkin)
  values (auth.uid(), user_streak, timezone('utc'::text, now())::date)
  on conflict (user_id) do update
  set current_streak = excluded.current_streak,
      last_checkin = excluded.last_checkin;

  -- Upsert Profile Points (Safety check covers missing profile)
  insert into profiles (id, email, points, streak)
  values (
    auth.uid(), 
    (select email from auth.users where id = auth.uid()), 
    5, 
    user_streak
  )
  on conflict (id) do update
  set points = profiles.points + 5,
      streak = excluded.streak;

  -- Log transaction
  insert into point_transactions (user_id, amount, type)
  values (auth.uid(), 5, 'Daily Streak Claim');

  -- Return updated values
  return query select p.streak as current_streak, p.points from profiles p where p.id = auth.uid();
end;
$$;

-- Create Referrals Table
create table if not exists referrals (
  id uuid default gen_random_uuid() primary key,
  referrer_id uuid references auth.users(id) not null,
  referee_id uuid references auth.users(id),
  status text default 'pending', -- pending, completed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table referrals enable row level security;

create policy "Users can read own referrals"
on referrals for select
using (auth.uid() = referrer_id);

-- Create Trigger to automatically create profile on signup
-- This solves the issue where points might reset if profile doesn't exist
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, points)
  values (new.id, new.email, 0);
  return new;
end;
$$;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
