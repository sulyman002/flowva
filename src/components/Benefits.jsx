import React from "react";
import { Check } from "lucide-react";

const Benefits = ({ viewMode }) => {
  const userBenefits = [
    "Access to premium tools for free",
    "Community-driven reviews",
    "Exclusive rewards and perks",
    "Seamless integration with your workflow",
  ];

  const brandBenefits = [
    "Direct access to early adopters",
    "High-intent user traffic",
    "Detailed performance reporting",
    "Brand safety and verification",
  ];

  const benefitsList = viewMode === "brands" ? brandBenefits : userBenefits;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Card - Dynamic Content */}
          <div className="bg-cream rounded-3xl p-10 lg:p-14 relative overflow-hidden group">
            <div className="relative z-10">
              <span
                className={`bg-white/50 backdrop-blur ${
                  viewMode === "brands" ? "text-indigo-600" : "text-primary"
                } text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block`}
              >
                {viewMode === "brands" ? "Partner Program" : "Mobile App"}
              </span>
              <h3 className="text-3xl md:text-4xl font-heading text-gray-900 mb-6 w-3/4 leading-tight">
                {viewMode === "brands"
                  ? "Join 500+ top brands growing with Flowva."
                  : "Take Flowva with you everywhere."}
              </h3>
              <button
                className={`${
                  viewMode === "brands"
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-black hover:bg-gray-800"
                } text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg`}
              >
                {viewMode === "brands" ? "Become a Partner" : "Download App"}
              </button>
            </div>

            {/* Decorative background */}
            <div
              className={`absolute right-0 bottom-0 w-1/2 h-4/5 bg-gradient-to-t ${
                viewMode === "brands" ? "from-blue-200" : "from-pink-200"
              } to-transparent rounded-tl-[80px] opacity-60 group-hover:scale-105 transition-transform duration-500`}
            ></div>
          </div>

          {/* Right Card - Benefits List */}
          <div className="bg-black rounded-3xl p-10 lg:p-14 text-white hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-heading mb-8">
              {viewMode === "brands" ? "Why Partner with Us?" : "Why Flowva?"}
            </h3>
            <ul className="space-y-6">
              {benefitsList.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      viewMode === "brands" ? "bg-indigo-500" : "bg-primary"
                    } flex items-center justify-center flex-shrink-0 transition-colors duration-300`}
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-lg text-gray-200 font-medium">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-10 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Trusted by Industry Leaders
              </p>
              <div className="flex gap-4 mt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                {/* Placeholder logos */}
                <div className="h-6 w-20 bg-white/20 rounded"></div>
                <div className="h-6 w-20 bg-white/20 rounded"></div>
                <div className="h-6 w-20 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
