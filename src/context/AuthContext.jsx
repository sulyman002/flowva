import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase/client";
import {
  signIn as supabaseSignIn,
  signUp as supabaseSignUp,
  signOut as supabaseSignOut,
  checkOnboardingStatus as supabaseCheckOnboarding,
} from "../supabase/auth";
import PageLoader from "../components/PageLoader";
import { getItem, setItem, removeItem } from "../utils/localStorage";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Helper to update local state logic based on user ID
  const updateOnboardingState = async (userId) => {
    // 1. Check Local Storage First
    const hasProfile = getItem("hasProfile");
    const storedProfileId = getItem("profileId");

    if (hasProfile && storedProfileId === userId) {
      console.log("Onboarding status found in local storage (strict mode)");
      setOnboardingComplete(true);
      return true;
    }

    // 2. Fallback to Server Check (Only if not found locally)
    const status = await supabaseCheckOnboarding(userId);
    setOnboardingComplete(status);

    // Sync to local if true
    if (status) {
      setItem("hasProfile", true);
      setItem("profileId", userId);
    }

    return status;
  };

  useEffect(() => {
    // Check active session
    const initSession = async () => {
      try {
        // Optimistic check: if we have local flags, we might want to unblock loading earlier?
        // For now, let's keep it safe and wait for session, but trust local profile status.

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setSession(session);
          setUser(session.user);
          setItem("authenticated", true); // Ensure this is set
          await updateOnboardingState(session.user.id);
        } else {
          // No session
          setSession(null);
          setUser(null);
          setOnboardingComplete(false);
          // Don't clear authenticated here immediately to avoid flickering if it's just a lag?
          // No, if getSession returns null, we are likely out.
          removeItem("authenticated");
          removeItem("hasProfile");
          removeItem("profileId");
        }
      } catch (error) {
        console.error("Error initializing session:", error);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setItem("authenticated", true);
        await updateOnboardingState(session.user.id);
      } else if (event === "SIGNED_OUT") {
        setOnboardingComplete(false);
        removeItem("authenticated");
        removeItem("hasProfile");
        removeItem("profileId");
        removeItem("flowva_onboarding"); // Cleanup old one too just in case
        removeItem("sidebar_open"); // Optional: clear UI state
      }

      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    // We don't set authenticated = true here usually until they verify or auto-sign-in happens
    return supabaseSignUp(email, password);
  };

  const signIn = async (email, password) => {
    const result = await supabaseSignIn(email, password);
    if (!result.error) {
      setItem("authenticated", true);
    }
    return result;
  };

  const signOut = async () => {
    removeItem("authenticated");
    removeItem("hasProfile");
    removeItem("profileId");
    removeItem("flowva_onboarding");
    return supabaseSignOut();
  };

  const checkOnboardingStatus = async (userId) => {
    return updateOnboardingState(userId);
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  };

  const value = {
    user,
    session,
    loading,
    onboardingComplete,
    signUp,
    signIn,
    signOut,
    checkOnboardingStatus,
    setOnboardingComplete,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
