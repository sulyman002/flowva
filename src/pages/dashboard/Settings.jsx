import React, { useState } from "react";
import { User, Bell, Shield, LogOut, Camera, Save, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const Settings = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  // Mock Form State
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.first_name || "User Name",
    email: user?.email || "",
    role: "Marketing Manager",
    bio: "Passionate about growth and automation.",
  });

  const [toggles, setToggles] = useState({
    emailUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account preferences</p>
      </div>

      {/* Coming Soon Message */}
      <div className="mt-20 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Coming Soon</h2>
        <p className="text-gray-500 max-w-md">
          We're working hard to bring you these features. Stay tuned for
          exciting updates!
        </p>
      </div>

      {/* 
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav * /}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-[#9013FE] shadow-sm border border-gray-100"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}

          <hr className="border-gray-100 my-4" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* content Area * /}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-8">
              {/* Avatar Header * /}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400 overflow-hidden">
                    {formData.fullName.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-[#9013FE] rounded-full text-white hover:bg-purple-700 transition-colors border-4 border-white">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {formData.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">{formData.role}</p>
                </div>
              </div>

              {/* Form Fields * /}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9013FE]/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9013FE]/20 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-[#9013FE] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Email Notifications
              </h3>

              {[
                {
                  id: "emailUpdates",
                  label: "Product Updates",
                  desc: "Receive the latest news and feature updates.",
                },
                {
                  id: "marketingEmails",
                  label: "Marketing Promotions",
                  desc: "Get offers and discounts for partner tools.",
                },
                {
                  id: "securityAlerts",
                  label: "Security Alerts",
                  desc: "Instant notifications for key security events.",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-50 last:border-none"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setToggles({ ...toggles, [item.id]: !toggles[item.id] })
                    }
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      toggles[item.id] ? "bg-[#9013FE]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        toggles[item.id] ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl text-orange-700 border border-orange-100">
                <Shield className="flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Password Security</h4>
                  <p className="text-sm">
                    For your security, please verify your email before changing
                    your password.
                  </p>
                </div>
              </div>

              <button className="w-full py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Mail size={18} /> Send Password Reset Email
              </button>
            </div>
          )}
        </div>
      </div>
      */}
    </div>
  );
};

export default Settings;
