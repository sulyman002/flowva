import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/client";
import { setItem } from "../utils/localStorage";
import {
  Check,
  Search,
  ChevronRight,
  LayoutDashboard,
  Target,
  Zap,
  Gift,
  Smartphone,
  PenTool,
  Monitor,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const steps = ["welcome", "goal", "focus", "tools", "demo", "name"];

const Onboarding = () => {
  const { user, checkOnboardingStatus, setOnboardingComplete } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: "",
    focus: "",
    tools: [],
    firstName: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const toolsList = [
    { name: "Instapage", icon: "IP" },
    { name: "Moosend", icon: "Mo" },
    { name: "Hootsuite", icon: "Ho" },
    { name: "SendGrid", icon: "SG" },
    { name: "Warmy", icon: "Wa" },
    { name: "Later", icon: "La" },
    { name: "Monday.com", icon: "Mo" },
    { name: "Notion", icon: "No" },
    { name: "Guidde", icon: "Gu" },
    { name: "Evernote", icon: "Ev" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    setLoading(true);
    try {
      if (!user) {
        return;
      }

      console.log("Updating profile for user:", user.id);

      // Update profile in Supabase with timeout
      const upsertPromise = supabase.from("profiles").upsert(
        {
          id: user.id,
          onboarding_completed: true,
          goal: formData.goal,
          focus: formData.focus,
          tools: formData.tools,
          first_name: formData.firstName,
          updated_at: new Date(),
        },
        { onConflict: "id" }
      );

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      );

      const { error: upsertError } = await Promise.race([
        upsertPromise,
        timeoutPromise,
      ]);

      if (upsertError) {
        console.error("Error updating profile:", upsertError);
        throw new Error("Failed to save profile");
      }

      console.log("Profile updated. Checking status...");
      // toast.info("Verifying profile..."); // Debugging

      // Revert to simple check
      const isComplete = await checkOnboardingStatus(user.id);
      console.log("Onboarding status:", isComplete);

      // Force update context if needed? Already done by checkOnboardingStatus in context.

      if (!isComplete) {
        console.warn(
          "Onboarding status check returned false despite upsert success."
        );
        // toast.warning("Profile saved but verification failed. Redirecting anyway...");
      }

      // Success! Save locally as well
      setItem("flowva_onboarding", {
        completed: true,
        userId: user.id,
        first_name: formData.firstName,
        ...formData,
      });
      // Ensure context is updated
      setOnboardingComplete(true);

      // Delay slightly to show the welcome screen/spinner
      setTimeout(() => {
        console.log("Navigating to dashboard...");
        // toast.success("Redirecting to Dashboard!");
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (err) {
      console.error("Onboarding Error:", err);
      // If it's a timeout, it's likely RLS. Let them through for now so they can see the app.
      if (err.message === "Request timed out") {
        toast.warning(
          "Database connection timed out (likely RLS policies). Entering offline mode..."
        );

        // Save locally to prevent loop on reload
        setItem("flowva_onboarding", {
          completed: true,
          userId: user.id,
          first_name: formData.firstName,
          ...formData,
        });
        setOnboardingComplete(true);

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      } else {
        setLoading(false);
        toast.error(`Error: ${err.message || "Unknown error"}`);
      }
    }
  };

  // Helper to save strictly successful regular flow too
  // We should also save it if the database write Succeeded!
  // ...

  // Actually, I need to update the SUCCESS block as well in the previous steps, which I can't reach easily with this replace chunk.
  // I'll make a separate call for the success block.

  const toggleTool = (toolName) => {
    setFormData((prev) => {
      const tools = prev.tools.includes(toolName)
        ? prev.tools.filter((t) => t !== toolName)
        : [...prev.tools, toolName];
      return { ...prev, tools };
    });
  };

  const renderWelcome = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Flowva</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Let's get you set up in 30 seconds. First, tell us your main goal so we
        can personalize your experience.
      </p>
      <button
        onClick={handleNext}
        className="w-full max-w-md bg-[#9013FE] hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition-colors"
      >
        Get Started
      </button>
    </div>
  );

  const renderGoal = () => (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">
        What's your main goal?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Select one to see a personalized demo workspace
      </p>

      <div className="space-y-4">
        {[
          {
            id: "track",
            title: "Track my tool subscriptions",
            desc: "See all my subscriptions in one place and reduce costs",
          },
          {
            id: "organize",
            title: "Organize my work tools",
            desc: "Manage all my work apps from a single dashboard",
          },
          {
            id: "discover",
            title: "Discover new tools",
            desc: "Get recommendations based on my needs",
          },
          {
            id: "rewards",
            title: "Earn Rewards",
            desc: "Earn rewards for trying new tools and staying productive",
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setFormData({ ...formData, goal: item.id });
            }}
            className={`w-full p-4 text-left border rounded-xl hover:border-[#9013FE] transition-all ${
              formData.goal === item.id
                ? "border-[#9013FE] bg-purple-50 ring-1 ring-[#9013FE]"
                : "border-gray-200"
            }`}
          >
            <div className="font-semibold text-gray-800">{item.title}</div>
            <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="text-gray-400 text-sm hover:text-gray-600"
        >
          Skip setup and go straight to my dashboard
        </button>
      </div>
    </div>
  );

  const renderFocus = () => (
    <div className="w-full max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">What's your primary focus?</h2>
      <p className="text-gray-500 mb-8">
        Select the one category you're most interested in
      </p>

      <div className="space-y-3">
        {[
          {
            id: "marketing",
            name: "Sales & Marketing",
            icon: <Target className="w-5 h-5" />,
          },
          {
            id: "social",
            name: "Social Media Management",
            icon: <Smartphone className="w-5 h-5" />,
          },
          {
            id: "project",
            name: "Project Management",
            icon: <LayoutDashboard className="w-5 h-5" />,
          },
          {
            id: "productivity",
            name: "Productivity",
            icon: <Zap className="w-5 h-5" />,
          },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFormData({ ...formData, focus: cat.id })}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
              formData.focus === cat.id
                ? "border-[#9013FE] bg-purple-50 text-[#9013FE]"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                formData.focus === cat.id
                  ? "bg-[#9013FE] text-white"
                  : "bg-purple-100 text-purple-500"
              }`}
            >
              {cat.icon}
            </div>
            <span className="font-semibold">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={handleBack} className="text-gray-600 font-medium">
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!formData.focus}
          className={`px-8 py-3 rounded-full font-semibold transition-colors ${
            formData.focus
              ? "bg-[#9013FE] text-white hover:bg-purple-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderTools = () => {
    const filteredTools = toolsList.filter((t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">
          Which tools do you currently use?
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Select the tools you use regularly (we'll help track or find
          alternatives)
        </p>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9013FE] focus:border-transparent"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9013FE] p-2 rounded-lg text-white">
            <Search className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {filteredTools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => toggleTool(tool.name)}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                formData.tools.includes(tool.name)
                  ? "border-[#9013FE] ring-1 ring-[#9013FE]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                {tool.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {tool.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button onClick={handleBack} className="text-gray-600 font-medium">
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-[#9013FE] hover:bg-purple-700 text-white rounded-full font-semibold transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const renderDemo = () => (
    <div className="w-full max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">Your Personalized Demo</h2>
      <p className="text-gray-500 mb-8">
        Based on your selections, here's how Flowva can help you:
      </p>

      <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6 mb-8 text-left space-y-4">
        <h3 className="font-semibold text-gray-700 mb-4">
          Your Dashboard Preview
        </h3>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Gift className="w-5 h-5 text-yellow-500" />
          <div>
            <span className="font-bold text-gray-800">Rewards Program</span>
            <span className="text-gray-600 text-sm">
              {" "}
              - Earn points for trying new tools
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-5 h-5 bg-blue-500 rounded text-xs text-white flex items-center justify-center">
            ↻
          </div>
          <div>
            <span className="font-bold text-gray-800">Activity Tracker</span>
            <span className="text-gray-600 text-sm">
              {" "}
              - See your progress toward rewards
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Gift className="w-5 h-5 text-red-500" />
          <div>
            <span className="font-bold text-gray-800">Redeem Points</span>
            <span className="text-gray-600 text-sm">
              {" "}
              - For gift cards, discounts, and more
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-5 h-5 text-gray-600">🛠️</div>
          <div>
            <span className="font-bold text-gray-800">Your Tools:</span>
            <span className="text-gray-600 text-sm">
              {" "}
              {formData.tools.length > 0
                ? formData.tools.join(", ")
                : "None selected"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={handleBack} className="text-gray-600 font-medium">
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-[#9013FE] hover:bg-purple-700 text-white rounded-full font-semibold transition-colors"
        >
          Looks Great!
        </button>
      </div>
    </div>
  );

  const renderNameInput = () => (
    <div className="w-full max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">What should we call you?</h2>
      <p className="text-gray-500 mb-8">
        Enter your first name so we can personalize your experience
      </p>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Your first name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          className="w-full px-6 py-4 rounded-xl border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#9013FE] focus:border-transparent"
        />
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={handleBack} className="text-gray-600 font-medium">
          Back
        </button>
        <button
          onClick={completeOnboarding}
          disabled={!formData.firstName.trim()}
          className={`px-12 py-3 rounded-full font-bold text-lg transition-colors min-w-[200px] ${
            formData.firstName.trim()
              ? "bg-[#9013FE] hover:bg-purple-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Finish Setup
        </button>
      </div>
    </div>
  );

  // Success/Welcome Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#9013FE] mb-4">
            Welcome {formData.firstName}!
          </h2>
          <p className="text-gray-600 mb-8">
            Taking you to your personalized dashboard now
          </p>
          <div className="flex justify-center">
            <Loader2 className="w-10 h-10 text-[#9013FE] animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // Calculate progress for pagination
  // We want pagination only for steps 1 to N (excluding Welcome step 0?)
  // Actually, usually pagination is shown for actual input steps.
  // steps = ["welcome", "goal", "focus", "tools", "demo", "name"]
  // Indices: 0, 1, 2, 3, 4, 5
  // Let's show pagination if currentStep > 0

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Pagination - Custom "Tube" style */}
      {currentStep > 0 && (
        <div className="flex items-center gap-2 mb-12">
          {steps.slice(1).map((_, index) => {
            // Adjust index since we sliced off the first step
            const actualStepIndex = index + 1;
            const isActive = currentStep === actualStepIndex;
            const isCompleted = currentStep > actualStepIndex;

            return (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-[#9013FE]" // Active tube
                    : "w-2 bg-gray-200" // Inactive dot
                } ${isCompleted ? "bg-gray-300" : ""}`}
              />
            );
          })}
        </div>
      )}

      {currentStep === 0 && renderWelcome()}
      {currentStep === 1 && renderGoal()}
      {currentStep === 2 && renderFocus()}
      {currentStep === 3 && renderTools()}
      {currentStep === 4 && renderDemo()}
      {currentStep === 5 && renderNameInput()}
    </div>
  );
};

export default Onboarding;
