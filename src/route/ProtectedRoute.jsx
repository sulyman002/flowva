import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/PageLoader";

const ProtectedRoute = ({ children }) => {
  const { user, loading, onboardingComplete } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If user is authenticated but onboarding is not complete, redirect to onboarding
  // preventing access to other protected pages.
  // Exception: If we are already ON the onboarding page, don't redirect (handled in App routes usually,
  // but good to keep in mind. ProtectedRoute usually wraps dashboard/home).
  if (!onboardingComplete && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // If user has completed onboarding but tries to access onboarding again,
  // redirect to home/dashboard (optional logic, but good UX).
  if (onboardingComplete && location.pathname === "/onboarding") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
