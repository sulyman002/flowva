import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { CheckCircle2, XCircle } from "lucide-react";
import PageLoader from "../../components/PageLoader";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const handleAuth = async () => {
      try {
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
          setStatus("success");
          setMessage("Account Verified Successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          const params = new URLSearchParams(window.location.hash.substring(1));
          if (params.get("error")) {
            setStatus("error");
            setMessage(
              params.get("error_description") || "Verification Failed"
            );
          }
        }
      } catch (e) {
        console.error("Callback Exception:", e);
        setStatus("error");
        setMessage("An unexpected error occurred during verification.");
      }
    };

    handleAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setStatus("success");
          setMessage("Account Verified Successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (status === "verifying") {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">Flowva</h2>

        {status === "success" && (
          <>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Account Verified Successfully!
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Your Flowva account has been successfully verified. You can now
              login.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-full transition-colors"
            >
              Continue to Login
            </button>
            <p className="mt-4 text-xs text-gray-400">
              Redirecting in 3 seconds...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verification Link Expired
            </h3>
            <p className="text-gray-500 mb-6 text-sm">{message}</p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-full transition-colors"
            >
              Resend Verification Link
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
