import { create } from "zustand";
import { supabase } from "../supabase/client";
import { toast } from "sonner";

export const useRewardsStore = create((set, get) => ({
  points: 0,
  currentStreak: 0,
  claimedToday: false,
  loading: false,
  userId: null,
  referralsCount: 0,
  referralPoints: 0,

  fetchRewardsState: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    set({ userId: user.id });

    // Fetch profile points
    const { data: profile } = await supabase
      .from("profiles")
      .select("points")
      .eq("id", user.id)
      .single();

    // Fetch streak
    const { data: streak } = await supabase
      .from("daily_streaks")
      .select("current_streak, last_checkin")
      .eq("user_id", user.id)
      .single();

    // Fetch Referrals Stats
    const { data: referrals } = await supabase
      .from("referrals")
      .select("id")
      .eq("referrer_id", user.id);

    // Calculate referral points (assuming 25 pts per referral)
    // Ideally we sum from point_transactions or store in a separate column
    // For now, let's just use count * 25 for display if not stored in profile
    const refCount = referrals?.length || 0;

    const today = new Date().toISOString().slice(0, 10);

    set({
      points: profile?.points ?? 0,
      currentStreak: streak?.current_streak ?? 0,
      claimedToday: streak?.last_checkin === today,
      referralsCount: refCount,
      referralPoints: refCount * 25,
    });
  },

  claimDailyStreak: async () => {
    if (get().claimedToday) return;

    set({ loading: true });

    // 🔥 Optimistic UI
    set((state) => ({
      claimedToday: true,
      currentStreak: state.currentStreak + 1,
      points: state.points + 5,
    }));

    const { data, error } = await supabase.rpc("claim_daily_streak");

    console.log("Claim Response:", { data, error }); // Debug log

    if (error) {
      console.error("Streak claim failed:", error);
      toast.error(`Claim failed: ${error.message}`); // Notify user of error
      // ❌ Rollback on failure
      await get().fetchRewardsState();
    } else if (data && data.length > 0) {
      // ✅ Confirmed success - update with SERVER values
      set({
        currentStreak: data[0].current_streak,
        points: data[0].points,
        claimedToday: true,
      });
    }

    set({ loading: false });
  },
}));
