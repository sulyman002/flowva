import React, { useState, useEffect } from "react";
import {
  Star,
  Calendar,
  Zap,
  Menu,
  Bell,
  CheckCircle2,
  Award,
  Gift,
  Copy,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  X,
  Layers,
  Share2Icon,
  Users,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { rewardsData, days } from "../../data/data";
import { useRewardsStore } from "../../store/useRewardsStore";

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("earn");
  const [redeemTab, setRedeemTab] = useState("all");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
  };

  const handleCopyLink = () => {
    const origin = window.location.origin;
    const link = `${origin}/signup?ref=${userId || "..."}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied to clipboard!");
  };

  const goal = 5000;
  const progress = Math.min((points / goal) * 100, 100);

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const weekDays = days.map((day, index) => {
    let status = "future";
    const isToday = index === todayIndex;

    if (isToday) {
      status = claimedToday ? "checked" : "current";
    } else if (index < todayIndex) {
      const daysAgo = todayIndex - index;
      const effectiveStreak = claimedToday ? streak : streak;

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
      <div className="sticky top-0 z-20 bg-gray-50 pb-2">
        <div className="relative">
          <div className="flex py-2 pt-3 lg:pt-0 lg:py-0 justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl md:text-[1.5rem] font-medium text-gray-900">
                Rewards Hub
              </h1>
            </div>
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
          <p className="text-gray-600 mt-1 pb-2">
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>
      </div>

      <div className="lg:h-[calc(100vh-140px)] overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="ant-tabs ant-tabs-top ant-tabs-mobile css-1d4w9r2 mt-2">
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

          <div className="ant-tabs-content-holder mt-6">
            <div className="ant-tabs-content ant-tabs-content-top">
              {activeTab === "earn" && (
                <div
                  role="tabpanel"
                  tabIndex="0"
                  aria-hidden="false"
                  className="ant-tabs-tabpane ant-tabs-tabpane-active"
                  id="rc-tabs-0-panel-1"
                  aria-labelledby="rc-tabs-0-tab-1"
                >
                  <div className="mb-10">
                    <h2 className="text-lg md:text-2xl my-3 text-black border-l-4 border-[#9301fe] pl-[0.75rem] font-semibold">
                      Your Rewards Journey
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden duration-200 bg-white">
                        <div className="p-[1rem] relative border-b border-b-[#f3f4f6] bg-[#eef2ff]">
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                            <Award className="w-5 h-5 text-[#9013fe]" />
                            Points Balance
                          </h3>
                        </div>
                        <div className="p-[1rem] flex justify-between items-center">
                          <div className="font-extrabold text-[36px] text-[#9013fe]">
                            {points}
                          </div>
                          <div className="lf-player-container w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
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

                      <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden transition-shadow duration-200 bg-white">
                        <div className="p-[1rem] relative border-b border-b-[#f3f4f6] bg-[#eef2ff]">
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
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
                            <Zap className="w-4 h-4" />
                            {loading
                              ? "Claiming..."
                              : claimedToday
                              ? "Claimed Today"
                              : "Claim +5 Points"}
                          </button>
                        </div>
                      </div>

                      <div className="rounded-[20px] shadow-sm border border-gray-100 overflow-hidden bg-white flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-[#9013FE] to-[#50E3C2] p-6 text-white relative">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm mb-4">
                            Featured
                          </span>
                          <h3 className="text-sm font-semibold opacity-90 mb-1">
                            Top Tool Spotlight
                          </h3>
                          <h2 className="text-3xl font-bold">Reclaim</h2>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex gap-3 mb-3">
                            <Calendar className="w-6 h-6 text-[#9013FE] flex-shrink-0 mt-1" />
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">
                              Automate and Optimize Your Schedule
                            </h3>
                          </div>

                          <p className="text-sm text-gray-500 leading-relaxed mb-6">
                            Reclaim.ai is an AI-powered calendar assistant that
                            automatically schedules your tasks, meetings, and
                            breaks to boost productivity. Free to try — earn
                            Flowva Points when you sign up!
                          </p>

                          <div className="flex items-center justify-between mt-auto gap-3 pt-2">
                            <a
                              href="https://reclaim.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#9013FE] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-purple-700 transition-colors"
                            >
                              <UserPlus size={18} />
                              Sign up
                            </a>

                            <button className="bg-gradient-to-r from-[#FF4D97] to-[#FF9E4D] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                              <Gift size={18} />
                              Claim 50 pts
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <h2 className="text-lg md:text-2xl my-3 text-black font-semibold border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem]">
                      Earn More Points
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-[#e5e7eb] rounded-xl overflow-hidden transition-all duration-200 ease-linear hover:border-[#9013fe] hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                        <div className="p-[1rem] bg-white flex items-center gap-[0.75rem] border-b border-[#f3f4f6]">
                          <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[rgba(228,144,230,0.1)] text-[#9013fe]">
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

                      <div className="border border-[#e5e7eb] rounded-xl overflow-hidden transition-all duration-200 ease-linear hover:border-[#9013fe] hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                        <div className="p-[1rem] bg-white flex items-center gap-[0.75rem] border-b border-[#f3f4f6]">
                          <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[rgba(144,19,254,0.1)] text-[#9013fe]">
                            <Share2Icon />
                          </div>

                          <div>
                            <h3 className="font-semibold">Share Your Stack</h3>
                            <p className="text-xs text-gray-500">
                              Earn +25 pts
                            </p>
                          </div>
                        </div>

                        <div className="p-[1rem] flex items-center justify-between">
                          <p className="font-medium text-sm">
                            Share your tool stack
                          </p>

                          <button
                            onClick={() => setIsShareModalOpen(true)}
                            className="bg-[#eef2ff] text-[#9013fe] text-sm font-semibold py-2 px-4 rounded-full inline-flex items-center gap-2 transition-all duration-200 hover:bg-[#9013fe] hover:text-white"
                          >
                            <Share2Icon />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <h2 className="text-lg md:text-2xl my-3 text-black font-semibold border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem]">
                      Refer &amp; Earn
                    </h2>

                    <div className="border border-[#f3f4f6] rounded-[16px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                      <div className="p-[1rem] bg-[#eef2ff] border-b border-[#f3f4f6]">
                        <div className="flex items-center gap-3">
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

                      <div className="p-[1rem]">
                        <div className="space-y-6">
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
                                <Copy size={16} className="text-[#9013fe]" />
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-center gap-[1rem] mt-[1rem]">
                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "rgb(24, 119, 242)" }}
                            >
                              <Facebook />
                            </button>

                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "black" }}
                            >
                              <Twitter />
                            </button>

                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "rgb(0, 119, 181)" }}
                            >
                              <Linkedin />
                            </button>

                            <button
                              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
                              style={{ background: "rgb(37, 211, 102)" }}
                            >
                              <MessageCircle />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                    <h2 className="text-lg md:text-2xl my-3 text-black font-semibold border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem]">
                      Redeem Your Points
                    </h2>

                    <div className="ant-tabs ant-tabs-top css-1d4w9r2">
                      <div
                        role="tablist"
                        aria-orientation="horizontal"
                        className="ant-tabs-nav w-full border-b border-gray-200 mb-6"
                      >
                        <div className="ant-tabs-nav-wrap">
                          <div className="ant-tabs-nav-list flex gap-6">
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
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs shadow-xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

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
