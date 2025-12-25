import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/PageLoader";

const PublicRoute = ({ children }) => {
  const { user, loading, onboardingComplete } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (user) {
    // User is authenticated, redirect to appropriate protected page
    if (onboardingComplete) {
      return <Navigate to="/dashboard" replace />;
    } else {
      // If we are already on onboarding, don't redirect (infinite loop prevention if this was used on onboarding, but it shouldn't be)
      // Actually PublicRoute is for Login/Signup.
      return <Navigate to="/onboarding" replace />;
    }
  }

  return children;
};

export default PublicRoute;
