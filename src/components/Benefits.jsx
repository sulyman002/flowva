import React from "react";
import {
  Check,
  Apple,
  Play,
  Hourglass,
  Smartphone,
  QrCode,
} from "lucide-react";

const Benefits = ({ viewMode }) => {
  // Static content matching the image mostly, but adaptable to viewMode if needed in text
  const isBrand = viewMode === "brands";

  const benefitsList = [
    "QUICK DAILY CHECK-INS",
    "DISCOVER TOOLS ANYWHERE",
    "NEVER MISS A REWARD",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT CARD: Pink / Download */}
          <div className="bg-[#FFF0F0] rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden min-h-[500px]">
            <div>
              <div className="inline-block bg-[#EAD4D4] bg-opacity-50 text-gray-800 text-xs font-bold px-4 py-2 rounded-full mb-6">
                Download
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black leading-tight mb-10 w-4/5 uppercase">
                ORGANIZE, DISCOVER, AND EARN ON THE GO.
              </h2>
            </div>

            {/* App Store Buttons & QR */}
            <div className="bg-white rounded-3xl p-4 flex items-center justify-between gap-4 max-w-md shadow-sm z-10 relative">
              <div className="flex flex-col gap-3 flex-1">
                {/* Apple Button */}
                <button className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-bold text-sm">
                  {/* Lucide doesn't have official brand logos usually, implementing a generic look or finding path if needed. 
                       Using generic or text for now. Apple icon exists in Lucide but is generic fruit. */}
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[10px]">
                    A
                  </div>
                  Apple App Store
                </button>
                {/* Google Button */}
                <button className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-bold text-sm">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[10px]">
                    G
                  </div>
                  Google Play Store
                </button>
              </div>

              {/* QR Code */}
              <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-300">
                {/* Placeholder QR */}
                <QrCode className="w-20 h-20 text-black" />
              </div>
            </div>

            {/* Coming Soon Pill */}
            <div className="mt-8 bg-white rounded-full px-6 py-4 flex items-center gap-3 w-fit shadow-sm z-10 relative">
              <Hourglass className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span className="font-bold text-gray-800">Coming soon</span>
            </div>

            {/* Background Decor (optional, to match soft vibe) */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          </div>

          {/* RIGHT CARD: Black / Benefits */}
          <div className="bg-[#111] rounded-[40px] p-10 flex flex-col relative overflow-hidden text-white min-h-[500px]">
            <div className="z-10">
              <div className="inline-block bg-gray-800 text-gray-300 text-xs font-bold px-4 py-2 rounded-full mb-8">
                Benefits
              </div>

              <ul className="space-y-6 mb-12">
                {benefitsList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <span
                      className={`text-xl md:text-2xl font-bold ${
                        idx === 0 ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phone Mockups Container */}
            <div className="flex gap-4 mt-auto relative z-10 translate-y-10">
              {/* Phone 1 (Active/Modal) */}
              <div className="bg-white rounded-t-3xl p-3 w-60 shadow-2xl transform translate-y-4">
                {/* Fake Modal UI */}
                <div className="bg-gray-100 h-40 rounded-t-2xl p-3 flex flex-col gap-2 relative">
                  <div className="flex justify-between items-center text-[10px] text-gray-500">
                    <span>How's your moment?</span>
                    <span>×</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="mt-2 flex justify-between px-2">
                    <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                    <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                    <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  </div>
                  <div className="mt-auto h-8 bg-white rounded-lg shadow-sm border flex items-center justify-between px-3">
                    <span className="text-[8px] font-bold">Skip</span>
                    <span className="text-[8px] font-bold">Check-in</span>
                  </div>
                </div>
              </div>

              {/* Phone 2 (Placeholder) */}
              <div className="bg-gray-800 rounded-t-3xl w-24 h-40 opacity-50 transform translate-y-10 border border-gray-700"></div>

              {/* Phone 3 (Placeholder) */}
              <div className="bg-gray-800 rounded-t-3xl w-24 h-40 opacity-50 transform translate-y-10 border border-gray-700"></div>
            </div>

            {/* Dark Gradient Overlay at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
