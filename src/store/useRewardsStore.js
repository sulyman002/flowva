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

    // ⚡ Optimized: Single RPC call to get all rewards state
    const { data, error } = await supabase.rpc("get_user_rewards_state");

    if (error) {
      console.error("Error fetching rewards state:", error);
      return;
    }

    // Fetch Referrals separately (can be optimized later)
    const { data: referrals } = await supabase
      .from("referrals")
      .select("id")
      .eq("referrer_id", user.id);

    const refCount = referrals?.length || 0;

    if (data && data.length > 0) {
      const { current_points, current_streak_count, is_claimed_today } =
        data[0];

      set({
        points: current_points,
        currentStreak: current_streak_count,
        claimedToday: is_claimed_today, // Trust the server!
        referralsCount: refCount,
        referralPoints: refCount * 25,
      });
    }
  },

  claimDailyStreak: async () => {
    if (get().claimedToday) return;

    set({ loading: true });

    // ⚡ Optimistic Update (Better UX)
    const previousState = {
      points: get().points,
      streak: get().currentStreak,
      claimed: get().claimedToday,
    };

    set((state) => ({
      claimedToday: true,
      currentStreak: state.currentStreak + 1,
      points: state.points + 5,
    }));

    try {
      const { data, error } = await supabase.rpc("claim_daily_streak");

      if (error) throw error;

      if (data && data.length > 0) {
        // ✅ Confirmed success - Sync with Server
        const { current_points, current_streak_count, is_claimed_today } =
          data[0];
        set({
          points: current_points,
          currentStreak: current_streak_count,
          claimedToday: is_claimed_today,
        });
        toast.success("Daily reward claimed! +5 points");
      }
    } catch (error) {
      console.error("Streak claim failed:", error);
      toast.error(error.message || "Claim failed. Please try again.");

      // ❌ Rollback
      set({
        points: previousState.points,
        currentStreak: previousState.streak,
        claimedToday: previousState.claimed,
      });
      await get().fetchRewardsState(); // Force re-sync
    } finally {
      set({ loading: false });
    }
  },
}));
