import React, { useState, useEffect } from "react";
import {
  Star,
  Calendar,
  Zap,
  Menu, // Hamburger icon
  Bell, // Bell icon
  ChevronRight, // Arrow?
  CheckCircle2, // Tick for streaks
  Award, // Points icon
  Gift, // Redeem icon
  Share2,
  Copy,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  X,
  Layers,
  Share2Icon,
  Users, // For stack icon
} from "lucide-react";
import { toast } from "sonner";
import { rewardsData } from "../../data/data";
import { useRewardsStore } from "../../store/useRewardsStore";

// We can import Sidebar context if needed for the hamburger, but for now we'll stick to UI.
import { useOutletContext } from "react-router-dom"; // Might need this for sidebar toggle if it was passed down, but usually Sidebar is sibling.
// Actually, in DashboardLayout, logic handles the sidebar.
// The user provided a hamburger button in the HTML. I should probably hook it up if possible, but DashboardLayout handles the toggle.
// I will create a prop or just leave it visual for now if I can't easily access the toggle.
// Wait, I can't easily toggle the sidebar from here unless I use a context.
// However, the previous DashboardLayout passed `isSidebarOpen` to Sidebar.
// I'll assume for this specific page, the header is "visual" matching the snippet,
// but I'll try to make the hamburger functional if I can access the context.
// Providing a "dummy" hamburger for now as per snippet request.

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("earn"); // 1 | 2
  const [redeemTab, setRedeemTab] = useState("all");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  // Mapped: 1 -> earn, 2 -> redeem

  // Mock Data
  // Global State
  const {
    points,
    currentStreak: streak,
    claimedToday,
    loading,
    fetchRewardsState,
    claimDailyStreak,
    userId,
    referralsCount,
    referralPoints,
  } = useRewardsStore();

  useEffect(() => {
    fetchRewardsState();
  }, []);

  const handleClaim = async () => {
    await claimDailyStreak();
    // Toast is handled in store for better error/success precision
  };

  const handleCopyLink = () => {
    const origin = window.location.origin;
    const link = `${origin}/signup?ref=${userId || "..."}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied to clipboard!");
  };

  const goal = 5000;
  const progress = Math.min((points / goal) * 100, 100);

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Mon=0, Sun=6

  // Generate dynamic week days based on streak
  const weekDays = days.map((day, index) => {
    let status = "future"; // 'checked', 'current', 'future'

    // Simple visual logic:
    // We don't want to calculate exact dates here to avoid TZ bugs.
    // Instead we visualize the streak count for the previous days ending yesterday/today.

    // If I claimed today, my streak is N. The Nth day (today) is checked. N-1 was yesterday.
    // If I didn't claim today, my streak is M. Today is active (waiting). M days before were checked.

    const isToday = index === todayIndex;

    if (isToday) {
      status = claimedToday ? "checked" : "current";
    } else if (index < todayIndex) {
      // Days before today in this week
      // This is a rough visualization since streak can be 100 days (more than a week).
      // We only want to show if they kept the streak *this week*.

      // We assume for the "Current Week" UI, if streak > 0, they probably checked in yesterday etc.
      // But accurate historical data requires fetching fetching 'last_checkin' or a calendar table.

      // Let's use a simplified heuristic for better UX:
      // If index is past day, and effective streak is high enough to cover it.

      const daysAgo = todayIndex - index;
      const effectiveStreak = claimedToday ? streak : streak;

      // e.g. Today is Wed (2). Index Mon (0). daysAgo = 2.
      // If streak is 5, then 5 >= 2, so Mon was checked.
      // If streak is 1, then 1 < 2, so Mon was missed.

      if (effectiveStreak >= daysAgo) {
        status = "checked";
      } else {
        status = "missed";
      }
    }

    return { day, status };
  });

  return (
    <main className="w-full bg-gray-50 px-[1rem] lg:px-[2rem] lg:pt-[2rem] min-h-screen flex-grow md:overflow-y-auto box-border lg:min-h-0">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-gray-50 pb-2">
        <div className="relative">
          <div className="flex py-2 pt-3 lg:pt-0 lg:py-0 justify-between items-center w-full">
            {/* Left: Hamburger + Title */}
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl md:text-[1.5rem] font-medium text-gray-900">
                Rewards Hub
              </h1>
            </div>
            {/* Right: Notifications */}
            <div className="mt-2">
              <div className="notification-container group relative">
                <button
                  className="notification-bell has-unread relative p-2"
                  aria-label="Notifications (1 unread)"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="notification-badge absolute top-1 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* Subtitle */}
          <p className="text-gray-600 mt-1 pb-2">
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="lg:h-[calc(100vh-140px)] overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="ant-tabs ant-tabs-top ant-tabs-mobile css-1d4w9r2 mt-2">
          {/* Tab Headers */}
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="ant-tabs-nav w-full border-b border-gray-200"
          >
            <div className="ant-tabs-nav-wrap">
              <div
                className="ant-tabs-nav-list flex gap-6"
                style={{ transform: "translate(0px, 0px)" }}
              >
                <div
                  data-node-key="1"
                  className={`ant-tabs-tab cursor-pointer pb-3 px-1 transition-colors relative ${
                    activeTab === "earn"
                      ? "ant-tabs-tab-active text-[#9013fe] font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("earn")}
                >
                  <div
                    role="tab"
                    aria-selected={activeTab === "earn"}
                    className="ant-tabs-tab-btn"
                    tabIndex="0"
                    id="rc-tabs-0-tab-1"
                    aria-controls="rc-tabs-0-panel-1"
                  >
                    Earn Points
                  </div>
                  {activeTab === "earn" && (
                    <div className="ant-tabs-ink-bar ant-tabs-ink-bar-animated absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#9013fe]"></div>
                  )}
                </div>

                <div
                  data-node-key="2"
                  className={`ant-tabs-tab cursor-pointer pb-3 px-1 transition-colors relative ${
                    activeTab === "redeem"
                      ? "ant-tabs-tab-active text-[#9013fe] font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("redeem")}
                >
                  <div
                    role="tab"
                    aria-selected={activeTab === "redeem"}
                    className="ant-tabs-tab-btn"
                    tabIndex="-1"
                    id="rc-tabs-0-tab-2"
                    aria-controls="rc-tabs-0-panel-2"
                  >
                    Redeem Rewards
                  </div>
                  {activeTab === "redeem" && (
                    <div className="ant-tabs-ink-bar ant-tabs-ink-bar-animated absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#9013fe]"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Panels */}
          <div className="ant-tabs-content-holder mt-6">
            <div className="ant-tabs-content ant-tabs-content-top">
              {/* Earn Points Panel */}
              {activeTab === "earn" && (
                <div
                  role="tabpanel"
                  tabIndex="0"
                  aria-hidden="false"
                  className="ant-tabs-tabpane ant-tabs-tabpane-active"
                  id="rc-tabs-0-panel-1"
                  aria-labelledby="rc-tabs-0-tab-1"
                >
                  {/* Your Rewards Journey Section */}
                  <div className="mb-10">
                    <h2 className="text-lg md:text-2xl my-3 text-black border-l-4 border-[#9301fe] pl-[0.75rem] font-semibold">
                      Your Rewards Journey
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Points Balance Card */}
                      <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden duration-200 bg-white">
                        <div className="p-[1rem] relative border-b border-b-[#f3f4f6] bg-[#eef2ff]">
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                            {/* Award SVG */}
                            <Award className="w-5 h-5 text-[#9013fe]" />
                            Points Balance
                          </h3>
                        </div>
                        <div className="p-[1rem] flex justify-between items-center">
                          <div className="font-extrabold text-[36px] text-[#9013fe]">
                            {points}
                          </div>
                          <div className="lf-player-container w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            {/* Lottie animation placeholder -> Star Icon */}
                            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                          </div>
                        </div>
                        <div className="px-[1rem] pb-[1rem] mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">
                              Progress to{" "}
                              <span className="font-medium">$5 Gift Card</span>
                            </span>
                            <span className="font-medium">
                              {points}/{goal}
                            </span>
                          </div>
                          <div className="h-[8px] bg-[#e5e7eb] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-br from-[#9013fe] to-[#FF9FF5] rounded-full transition-[width] duration-500 ease-in-out"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            🚀 Just getting started — keep earning points!
                          </p>
                        </div>
                      </div>

                      {/* Daily Streak Card */}
                      <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden transition-shadow duration-200 bg-white">
                        <div className="p-[1rem] relative border-b border-b-[#f3f4f6] bg-[#eef2ff]">
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                            {/* Calendar SVG */}
                            <Calendar className="w-5 h-5 text-[#9013fe]" />
                            Daily Streak
                          </h3>
                        </div>
                        <div className="p-4 text-center">
                          <div className="font-extrabold text-[36px] text-[#9013fe] mb-2">
                            {streak} days
                          </div>
                          <div className="flex mt-4 space-x-2 justify-center">
                            {weekDays.map((d, idx) => (
                              <div
                                key={idx}
                                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold 
                                  ${
                                    d.status === "checked"
                                      ? "bg-gray-200 text-gray-500"
                                      : d.status === "current"
                                      ? "bg-gray-300 text-gray-500 ring-2 ring-[#9013fe] ring-offset-2"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                              >
                                {d.status === "checked" ? (
                                  <CheckCircle2
                                    size={16}
                                    className="text-[#9013fe]"
                                  />
                                ) : (
                                  d.day
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-[0.875rem] text-gray-600 mt-3">
                            Check in daily to earn +5 points
                          </p>
                          <button
                            className={`mt-3 w-full py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 
                            ${
                              claimedToday
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-[#9013fe] text-white hover:bg-purple-700 cursor-pointer shadow-md hover:shadow-lg"
                            }`}
                            disabled={claimedToday || loading}
                            onClick={handleClaim}
                          >
                            {/* Zap SVG */}
                            <Zap className="w-4 h-4" />
                            {loading
                              ? "Claiming..."
                              : claimedToday
                              ? "Claimed Today"
                              : "Claim +5 Points"}
                          </button>
                        </div>
                      </div>

                      {/* Top Tool Spotlight */}
                      <div className="bg-gradient-to-br from-[#7F56D9] to-[#6941C6] rounded-[16px] p-1 shadow-sm text-white h-full hover:translate-y-[-5px] transition-transform duration-200">
                        <div className="bg-white rounded-[14px] h-full p-6 flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F4EBFF] text-[#6941C6] mb-2">
                                Featured
                              </span>
                              <h3 className="text-lg font-bold text-gray-900">
                                Top Tool Spotlight
                              </h3>
                              <p className="text-[#6941C6] font-medium">
                                Reclaim
                              </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Award className="text-white w-6 h-6" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 leading-relaxed mb-6">
                              Reclaim.ai is an AI-powered calendar assistant.
                              Free to try — earn Flowva Points when you sign up!
                            </p>
                          </div>
                          <button className="w-full bg-[#9013FE] text-white py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
                            Check it out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Earn More Points Section */}
                  <div className="space-y-6 mb-10">
                    <h2 className="text-lg md:text-2xl my-3 text-black font-semibold border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem]">
                      Earn More Points
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Card 1 */}
                      <div className="border border-[#e5e7eb] rounded-xl overflow-hidden transition-all duration-200 ease-linear hover:border-[#9013fe] hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                        {/* Header */}
                        <div className="p-[1rem] bg-white flex items-center gap-[0.75rem] border-b border-[#f3f4f6]">
                          <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[rgba(228,144,230,0.1)] text-[#9013fe]">
                            {/* Star Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679 a2.123 2.123 0 0 0 1.595 1.16l5.166.756 a.53.53 0 0 1 .294.904l-3.736 3.638 a2.123 2.123 0 0 0-.611 1.878l.882 5.14 a.53.53 0 0 1-.771.56l-4.618-2.428 a2.122 2.122 0 0 0-1.973 0L6.396 21.01 a.53.53 0 0 1-.77-.56l.881-5.139 a2.122 2.122 0 0 0-.611-1.879L2.16 9.795 a.53.53 0 0 1 .294-.906l5.165-.755 a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                          </div>

                          <h3 className="font-semibold">
                            Refer and win 10,000 points!
                          </h3>
                        </div>

                        {/* Body */}
                        <div className="p-[1rem]">
                          <p className="font-medium text-sm">
                            Invite 3 friends by Nov 20 and earn a chance to be
                            one of 5 winners of
                            <span className="text-[#9013fe]">
                              {" "}
                              10,000 points
                            </span>
                            . Friends must complete onboarding to qualify.
                          </p>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="border border-[#e5e7eb] rounded-xl overflow-hidden transition-all duration-200 ease-linear hover:border-[#9013fe] hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                        {/* Header */}
                        <div className="p-[1rem] bg-white flex items-center gap-[0.75rem] border-b border-[#f3f4f6]">
                          <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[rgba(144,19,254,0.1)] text-[#9013fe]">
                            {/* Share Icon */}
                            <Share2Icon />
                          </div>

                          <div>
                            <h3 className="font-semibold">Share Your Stack</h3>
                            <p className="text-xs text-gray-500">
                              Earn +25 pts
                            </p>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-[1rem] flex items-center justify-between">
                          <p className="font-medium text-sm">
                            Share your tool stack
                          </p>

                          <button
                            onClick={() => setIsShareModalOpen(true)}
                            className="bg-[#eef2ff] text-[#9013fe] text-sm font-semibold py-2 px-4 rounded-full inline-flex items-center gap-2 transition-all duration-200 hover:bg-[#9013fe] hover:text-white"
                          >
                            {/* Share Icon */}
                            <Share2Icon />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Refer & Earn Section */}
                  <div className="space-y-6 mb-10">
                    <h2 className="text-lg md:text-2xl my-3 text-black font-semibold border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem]">
                      Refer &amp; Earn
                    </h2>

                    <div className="border border-[#f3f4f6] rounded-[16px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                      {/* Header */}
                      <div className="p-[1rem] bg-[#eef2ff] border-b border-[#f3f4f6]">
                        <div className="flex items-center gap-3">
                          {/* Users Icon */}
                          <Users className=" text-[#9013fe]" />

                          <div>
                            <h3 className="text-xl font-semibold text-gray-700">
                              Share Your Link
                            </h3>
                            <p className="text-sm text-gray-500">
                              Invite friends and earn 25 points when they join!
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-[1rem]">
                        <div className="space-y-6">
                          {/* Stats */}
                          <div className="flex justify-between mb-[1rem]">
                            <div className="flex-1 text-center p-[0.5rem]">
                              <div className="text-[1.5rem] font-semibold text-[#9013fe]">
                                {referralsCount}
                              </div>
                              <div className="text-gray-600">Referrals</div>
                            </div>

                            <div className="flex-1 text-center p-[0.5rem]">
                              <div className="text-[1.5rem] font-semibold text-[#9013fe]">
                                {referralPoints}
                              </div>
                              <div className="text-gray-600">Points Earned</div>
                            </div>
                          </div>

                          {/* Referral Link */}
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-sm mb-2 text-gray-700">
                              Your personal referral link:
                            </p>

                            <div className="relative">
                              <input
                                type="text"
                                readOnly
                                value={`${window.location.origin}/signup?ref=${
                                  userId || "..."
                                }`}
                                className="w-full pr-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />

                              <button
                                onClick={handleCopyLink}
                                className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                              >
                                {/* Copy Icon */}
                                <Copy size={16} className="text-[#9013fe]" />
                              </button>
                            </div>
                          </div>

                          {/* Social Share */}
                          <div className="flex justify-center gap-[1rem] mt-[1rem]">
                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "rgb(24, 119, 242)" }}
                            >
                              {/* Facebook */}
                              <svg viewBox="0 0 320 512" fill="currentColor">
                                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                              </svg>
                            </button>

                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "black" }}
                            >
                              {/* X */}
                              <svg viewBox="0 0 512 512" fill="currentColor">
                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48z" />
                              </svg>
                            </button>

                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "rgb(0, 119, 181)" }}
                            >
                              {/* LinkedIn */}
                              <svg viewBox="0 0 448 512" fill="currentColor">
                                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2z" />
                              </svg>
                            </button>

                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "rgb(37, 211, 102)" }}
                            >
                              {/* WhatsApp */}
                              <svg viewBox="0 0 448 512" fill="currentColor">
                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Redeem Rewards Panel */}
              {activeTab === "redeem" && (
                <div
                  role="tabpanel"
                  tabIndex="0"
                  aria-hidden="true"
                  className="ant-tabs-tabpane ant-tabs-tabpane-active"
                  id="rc-tabs-0-panel-2"
                  aria-labelledby="rc-tabs-0-tab-2"
                >
                  <div className="mt-6">
                    {/* Section Title */}
                    <h2 className="text-lg md:text-2xl my-3 text-black font-semibold border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem]">
                      Redeem Your Points
                    </h2>

                    {/* Tabs Wrapper */}
                    <div className="ant-tabs ant-tabs-top css-1d4w9r2">
                      {/* Tabs Navigation */}
                      <div
                        role="tablist"
                        aria-orientation="horizontal"
                        className="ant-tabs-nav w-full border-b border-gray-200 mb-6"
                      >
                        <div className="ant-tabs-nav-wrap">
                          <div className="ant-tabs-nav-list flex gap-6">
                            {/* All Rewards */}
                            <div
                              className={`ant-tabs-tab cursor-pointer pb-2 px-1 transition-colors relative ${
                                redeemTab === "all"
                                  ? "ant-tabs-tab-active text-[#9013fe] border-b-2 border-[#9013fe]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setRedeemTab("all")}
                            >
                              <div
                                role="tab"
                                aria-selected={redeemTab === "all"}
                                className="ant-tabs-tab-btn flex items-center gap-1"
                              >
                                All Rewards
                                <span className="ml-2 text-xs rounded-full h-5 px-2 inline-flex items-center justify-center bg-[#9031fe]/10 text-[#9031fe] font-semibold">
                                  {rewardsData.length}
                                </span>
                              </div>
                            </div>

                            {/* Unlocked */}
                            <div
                              className={`ant-tabs-tab cursor-pointer pb-2 px-1 transition-colors relative ${
                                redeemTab === "unlocked"
                                  ? "ant-tabs-tab-active text-[#9013fe] border-b-2 border-[#9013fe]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setRedeemTab("unlocked")}
                            >
                              <div
                                role="tab"
                                aria-selected={redeemTab === "unlocked"}
                                className="ant-tabs-tab-btn flex items-center gap-1"
                              >
                                Unlocked
                                <span className="ml-2 text-xs rounded-full h-5 px-2 bg-[#E2E8F0] text-[#CBD5E0]">
                                  {
                                    rewardsData.filter(
                                      (r) => r.status === "Unlocked"
                                    ).length
                                  }
                                </span>
                              </div>
                            </div>

                            {/* Locked */}
                            <div
                              className={`ant-tabs-tab cursor-pointer pb-2 px-1 transition-colors relative ${
                                redeemTab === "locked"
                                  ? "ant-tabs-tab-active text-[#9013fe] border-b-2 border-[#9013fe]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setRedeemTab("locked")}
                            >
                              <div
                                role="tab"
                                aria-selected={redeemTab === "locked"}
                                className="ant-tabs-tab-btn flex items-center gap-1"
                              >
                                Locked
                                <span className="ml-2 text-xs rounded-full h-5 px-2 bg-[#E2E8F0] text-[#CBD5E0]">
                                  {
                                    rewardsData.filter(
                                      (r) => r.status === "Locked"
                                    ).length
                                  }
                                </span>
                              </div>
                            </div>

                            {/* Coming Soon */}
                            <div
                              className={`ant-tabs-tab cursor-pointer pb-2 px-1 transition-colors relative ${
                                redeemTab === "coming_soon"
                                  ? "ant-tabs-tab-active text-[#9013fe] border-b-2 border-[#9013fe]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setRedeemTab("coming_soon")}
                            >
                              <div
                                role="tab"
                                aria-selected={redeemTab === "coming_soon"}
                                className="ant-tabs-tab-btn flex items-center gap-1"
                              >
                                Coming Soon
                                <span className="ml-2 text-xs rounded-full h-5 px-2 bg-[#E2E8F0] text-[#CBD5E0]">
                                  {
                                    rewardsData.filter(
                                      (r) => r.status === "Coming Soon"
                                    ).length
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tabs Content */}
                      <div className="ant-tabs-content-holder">
                        <div className="ant-tabs-content ant-tabs-content-top">
                          <div className="ant-tabs-tabpane ant-tabs-tabpane-active">
                            <div className="grid mt-6 gap-[1.5rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                              {rewardsData
                                .filter((reward) => {
                                  if (redeemTab === "all") return true;
                                  if (redeemTab === "unlocked")
                                    return reward.status === "Unlocked";
                                  if (redeemTab === "locked")
                                    return reward.status === "Locked";
                                  if (redeemTab === "coming_soon")
                                    return reward.status === "Coming Soon";
                                  return true;
                                })
                                .map((reward) => (
                                  <div
                                    key={reward.id}
                                    className={`bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden group min-h-[300px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                      reward.status === "Unlocked"
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed"
                                    }`}
                                  >
                                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                      {reward.icon}
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2 truncate w-full">
                                      {reward.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-3">
                                      {reward.description}
                                    </p>
                                    <div className="flex items-center gap-1 text-yellow-500 font-medium mb-4 text-sm">
                                      <Star className="w-4 h-4 fill-yellow-500" />
                                      {reward.points} pts
                                    </div>
                                    <button
                                      disabled={reward.status !== "Unlocked"}
                                      className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors
                                      ${
                                        reward.status === "Unlocked"
                                          ? "bg-[#9013fe] text-white hover:bg-purple-700"
                                          : "bg-[#E2E8F0] text-[#CBD5E0] cursor-not-allowed"
                                      }
                                    `}
                                    >
                                      {reward.status}
                                    </button>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Share Your Stack Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs shadow-xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Share Your Stack
              </h3>

              <div className="flex flex-col items-center justify-center gap-4 ">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#9013fe]">
                  <Layers className="w-5 h-5" />
                </div>
                <p className="text-gray-600 max-w-[250px] leading-relaxed text-sm">
                  You have no stack created yet, go to Tech Stack to create one.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Rewards;
