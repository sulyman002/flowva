import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlowvaLayout from "./layout/FlowvaLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthCallback from "./pages/auth/AuthCallback";
import PublicRoute from "./route/PublicRoute";
import ProtectedRoute from "./route/ProtectedRoute";
import Onboarding from "./pages/Onboarding";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Discover from "./pages/dashboard/Discover";
import Library from "./pages/dashboard/Library";
import TechStack from "./pages/dashboard/TechStack";
import Subscriptions from "./pages/dashboard/Subscriptions";
import Rewards from "./pages/dashboard/Rewards";
import Settings from "./pages/dashboard/Settings";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Public Landing Pages (Wrapped in Layout & PublicRoute to redirect auth users) */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <FlowvaLayout />
              </PublicRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>

          {/* Full Screen Auth Routes (No Layout, also PublicRoute) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Full Screen Onboarding (Protected) */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="discover" element={<Discover />} />
            <Route path="library" element={<Library />} />
            <Route path="tech-stack" element={<TechStack />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
