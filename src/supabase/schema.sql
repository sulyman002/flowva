-- ==========================================
-- FLOWVA DB SCHEMA REPAIR SCRIPT
-- ==========================================

-- 1. Tables Setup (Safe Creation)
create table if not exists daily_streaks (
  user_id uuid references auth.users primary key,
  current_streak int default 0,
  last_checkin date
);

create table if not exists point_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  amount int default 0,
  type text, -- 'earned', 'redeemed', 'referral'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists profiles (
  id uuid references auth.users not null primary key,
  email text,
  points int default 0,
  streak int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists referrals (
  id uuid default gen_random_uuid() primary key,
  referrer_id uuid references auth.users(id) not null,
  referee_id uuid references auth.users(id),
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Column Repairs (Fix "Column does not exist" errors)
do $$
begin
  -- Add streak to profiles if missing
  if not exists (select 1 from information_schema.columns where table_name='profiles' and column_name='streak') then
    alter table profiles add column streak int default 0;
  end if;

  -- Add amount to point_transactions if missing
  if not exists (select 1 from information_schema.columns where table_name='point_transactions' and column_name='amount') then
    alter table point_transactions add column amount int default 0;
  end if;

  -- Add type to point_transactions if missing
  if not exists (select 1 from information_schema.columns where table_name='point_transactions' and column_name='type') then
    alter table point_transactions add column type text default 'earned';
  end if;
end $$;

-- 3. Security Policies (RLS)
alter table profiles enable row level security;
alter table daily_streaks enable row level security;
alter table point_transactions enable row level security;
alter table referrals enable row level security;

-- Drop existing policies to avoid duplication errors during repair
drop policy if exists "Users can select own profile" on profiles;
drop policy if exists "Users can select own streak" on daily_streaks;
drop policy if exists "Users can select own point transactions" on point_transactions;
drop policy if exists "Users can read own referrals" on referrals;

create policy "Users can select own profile" on profiles for select using (auth.uid() = id);
create policy "Users can select own streak" on daily_streaks for select using (auth.uid() = user_id);
create policy "Users can select own point transactions" on point_transactions for select using (auth.uid() = user_id);
create policy "Users can read own referrals" on referrals for select using (auth.uid() = referrer_id);


-- 4. RPC Functions (Logic Layer)

-- Function: Get User Rewards State (Single RPC for performance)
create or replace function get_user_rewards_state()
returns table(
  current_points int,
  current_streak_count int,
  last_checkin_date date,
  is_claimed_today boolean
)
language plpgsql
security definer
as $$
declare
  user_points int;
  user_streak int;
  last_check date;
begin
  -- Get Profile Points
  select points into user_points from profiles where id = auth.uid();
  if user_points is null then user_points := 0; end if;

  -- Get Streak Info
  select current_streak, last_checkin into user_streak, last_check
  from daily_streaks where user_id = auth.uid();

  if user_streak is null then user_streak := 0; end if;

  return query select 
    user_points as current_points,
    user_streak as current_streak_count,
    last_check as last_checkin_date,
    (last_check = timezone('utc'::text, now())::date) as is_claimed_today;
end;
$$;

-- Function: Claim Daily Streak (Transactional)
create or replace function claim_daily_streak()
returns table(
  current_points int,
  current_streak_count int,
  is_claimed_today boolean
) 
language plpgsql
security definer
as $$
declare
  user_streak int;
  last_check date;
  today_date date;
begin
  today_date := timezone('utc'::text, now())::date;

  -- Get current streak info
  select d.current_streak, d.last_checkin into user_streak, last_check
  from daily_streaks d where d.user_id = auth.uid();

  if user_streak is null then user_streak := 0; end if;

  -- Check compatibility
  if last_check = today_date then
     raise exception 'Already claimed for today';
  end if;

  -- Reset streak if missed a day
  if last_check < (today_date - 1) then
     user_streak := 0;
  end if;

  -- Increment streak
  user_streak := user_streak + 1;

  -- Upsert daily_streaks
  insert into daily_streaks (user_id, current_streak, last_checkin)
  values (auth.uid(), user_streak, today_date)
  on conflict (user_id) do update
  set current_streak = excluded.current_streak,
      last_checkin = excluded.last_checkin;

  -- Upsert Profile Points
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

  -- Log transaction (This fixed the "amount" error)
  insert into point_transactions (user_id, amount, type)
  values (auth.uid(), 5, 'Daily Streak Claim');

  -- Return updated values
  return query select 
      p.points as current_points, 
      p.streak as current_streak_count,
      true as is_claimed_today
  from profiles p where p.id = auth.uid();
end;
$$;


-- 5. User Creation Trigger
-- 5. User Creation Trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, points, streak)
  values (new.id, new.email, 0, 0)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Force schema reload
NOTIFY pgrst, 'reload schema';
