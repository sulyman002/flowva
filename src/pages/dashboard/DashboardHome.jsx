import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Bell, CreditCard, Gift, Box, Layers, ArrowRight } from "lucide-react";

const DashboardHome = () => {
  const { user } = useAuth();
  // Safe accessor for name, fallback to email prefix or 'User'
  const displayName =
    user?.user_metadata?.first_name || user?.email?.split("@")[0] || "User";

  return (
    <div className="w-full space-y-6">
      {/* Page Header (Sticky) */}
      <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm pt-2 pb-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Good afternoon,{" "}
          <span className="text-[#9013FE] capitalize">{displayName}</span>
        </h1>
        {/* Desktop Notification Bell */}
        <button className="hidden md:block relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
          <Bell size={24} className="text-[#2D3748]" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#9013FE] border-2 border-white"></span>
          </span>
        </button>
      </div>

      {/* MOBILE ONLY: Big News Card */}
      <div className="md:hidden bg-[#9013FE] rounded-2xl p-6 text-white shadow-lg text-center space-y-4">
        <div className="bg-white/20 w-fit mx-auto px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          Exciting Update 🚀
        </div>

        <div className="w-24 h-24 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          {/* Placeholder for the image within the card in screenshot */}
          <Gift size={40} className="text-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            Big News: We're Becoming Bravoo! 🎉
          </h2>
          <p className="text-sm text-purple-100 leading-relaxed">
            Bravoo a platform designed to make learning fun, simple, and truly
            rewarding. With Bravoo, you'll complete quick, engaging missions
            that help you build real digital skills...
          </p>
        </div>

        <button className="text-xs font-semibold underline hover:text-purple-200">
          Read more inside &rarr;
        </button>
      </div>

      {/* MOBILE ONLY: Stats Grid (My Tools, Tech Stack) */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {/* My Tools */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#9013FE]">
              <Box size={20} />
            </div>
            <span className="text-2xl font-bold text-[#9013FE]">1</span>
          </div>
          <h3 className="font-bold text-gray-900">My Tools</h3>
          <p className="text-xs text-gray-500 mb-3">
            All tools in your personal library
          </p>
          <button className="text-sm text-[#9013FE] font-medium hover:underline flex items-center gap-1">
            View tools <ArrowRight size={14} />
          </button>
        </div>

        {/* My Tech Stack */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <Layers size={20} />
            </div>
            <span className="text-2xl font-bold text-[#9013FE]">0</span>
          </div>
          <h3 className="font-bold text-gray-900">My Tech Stack</h3>
          <p className="text-xs text-gray-500 mb-3">
            Your curated tool collections
          </p>
          <button className="text-sm text-[#9013FE] font-medium hover:underline flex items-center gap-1">
            View stacks <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* DESKTOP CONTENT: Subscriptions & Rewards Cards (As per Desktop Mockup) */}
      <div className="hidden md:flex flex-col gap-6">
        {/* No Subscriptions Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm min-h-[250px]">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <CreditCard size={32} className="text-[#9013FE]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No Subscriptions Added
          </h3>
          <p className="text-gray-500 max-w-md mb-8">
            Add your tool subscriptions to manage renewals, track spending, and
            discover potential savings.
          </p>
          <button className="bg-[#9013FE] hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2">
            + Add Subscription
          </button>
        </div>

        {/* Earn Rewards Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm min-h-[250px]">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Gift size={32} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Earn Your First Reward
          </h3>
          <p className="text-gray-500 max-w-md mb-8">
            Start earning points by adding tools, writing reviews, and sharing
            your stacks. Redeem points for discounts and perks.
          </p>
          <button className="bg-[#FF5A5F] hover:bg-[#FF4046] text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2">
            <Gift size={18} /> Explore Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
