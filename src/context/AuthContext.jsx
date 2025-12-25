import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase/client";
import {
  signIn as supabaseSignIn,
  signUp as supabaseSignUp,
  signOut as supabaseSignOut,
  checkOnboardingStatus as supabaseCheckOnboarding,
} from "../supabase/auth";
import PageLoader from "../components/PageLoader";

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
    const status = await supabaseCheckOnboarding(userId);
    setOnboardingComplete(status);
    return status;
  };

  useEffect(() => {
    // Check active session
    const initSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await updateOnboardingState(session.user.id);
        } else {
          setOnboardingComplete(false);
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
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await updateOnboardingState(session.user.id);
      } else {
        setOnboardingComplete(false);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    return supabaseSignUp(email, password);
  };

  const signIn = async (email, password) => {
    return supabaseSignIn(email, password);
  };

  const signOut = async () => {
    return supabaseSignOut();
  };

  const checkOnboardingStatus = async (userId) => {
    return updateOnboardingState(userId);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
