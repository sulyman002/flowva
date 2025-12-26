import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle2, XCircle } from "lucide-react";
import PageLoader from "../../components/PageLoader";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { checkOnboardingStatus } = useAuth();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        setMessage("Verifying authentication...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth error:", error);
          setStatus("error");
          setMessage("Verification Link Expired or Invalid");
          return;
        }

        if (session) {
          // User is authenticated
          setMessage("Checking user profile...");

          // Wait a brief moment to ensure profile trigger might have run (for new users)
          // or just proceed to check status logic

          const userId = session.user.id;

          setMessage("Checking onboarding status...");
          const isOnboarded = await checkOnboardingStatus(userId);

          if (isOnboarded) {
            setMessage("Redirecting to dashboard...");
            setTimeout(() => {
              navigate("/dashboard", { replace: true });
            }, 1500);
          } else {
            setMessage("Redirecting to onboarding...");
            setTimeout(() => {
              navigate("/onboarding", { replace: true });
            }, 1500);
          }
        } else {
          // No session found? Check for hash params error
          const params = new URLSearchParams(window.location.hash.substring(1));
          if (params.get("error")) {
            setStatus("error");
            setMessage(
              params.get("error_description") || "Verification Failed"
            );
          } else {
            // No session and no error param -> likely just visited /auth/callback manually or token invalid
            setStatus("error");
            setMessage("No valid authentication session found.");
          }
        }
      } catch (e) {
        console.error("Callback Exception:", e);
        setStatus("error");
        setMessage("An unexpected error occurred during verification.");
      }
    };

    handleAuth();

    // Also listen for immediate signed-in event if the above getSession is racing
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          // We could potentially re-run logic here if the initial check failed or missed it
          // But normally getSession handles it.
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, checkOnboardingStatus]);

  if (status === "verifying" || status === "success") {
    // Show loader for both verifying AND success (which is effectively the redirecting phase now)
    return <PageLoader message={message} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">Flowva</h2>

        {status === "error" && (
          <>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Authentication Failed
            </h3>
            <p className="text-gray-500 mb-6 text-sm">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-full transition-colors"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
