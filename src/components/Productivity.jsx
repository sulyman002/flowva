import React from "react";
import { productivityData } from "../data/data.js";
import users_icon from "../assets/users.svg";
import { Wrench, Globe } from "lucide-react";
import { logos } from "../data/data.js";

// Helper function to render footer content based on card type
const renderCardFooter = (type) => {
  switch (type) {
    case "users":
      return (
        <div className="flex items-center gap-2 mt-4">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=1" alt="User" />
            </div>
            <div className="inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=2" alt="User" />
            </div>
            <div className="inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=3" alt="User" />
            </div>
            <div className="inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=4" alt="User" />
            </div>
          </div>
          <span className="text-sm font-bold text-gray-700">10,000+</span>
        </div>
      );
    case "tools":
      return (
        <div className="flex items-center gap-2 mt-4">
          {/* Using placeholder icons/logos */}
          <div className="flex gap-1 text-gray-400">
            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
              ⚛️
            </div>
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              🔷
            </div>
            <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
              🦊
            </div>
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
              ✅
            </div>
            <span className="text-xs text-black ml-1 pt-1 font-semibold">
              and many more
            </span>
          </div>
        </div>
      );
    case "countries":
      return (
        <div className="flex items-center gap-2 mt-4 text-xl">
          <span>🇳🇬</span>
          <span>🇺🇸</span>
          <span>🇮🇳</span>
          <span>🇨🇦</span>
          <span>🇵🇭</span>
          <span>🇰🇪</span>
          <span>🇬🇧</span>
        </div>
      );
    default:
      return null;
  }
};

const Productivity = ({ viewMode }) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      {viewMode === "users" ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-Manrope font-600 font-semibold text-black leading-tight tracking-tight max-w-4xl mx-auto">
              Turn productivity into rewards with a calm, smart space that
              organizes your tools, and keeps you in control.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productivityData.map((card) => (
              <div
                key={card.label}
                className="bg-[#F9F5FF] rounded-2xl p-8 flex flex-col justify-between h-full border border-purple-50 hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <div className="text-4xl sm:text-5xl font-heading font-medium text-black mb-2">
                    {card.value}
                  </div>
                  <div className="text-lg font-medium text-black mb-6">
                    {card.label}
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {card.description}
                  </p>
                </div>
                <div>{renderCardFooter(card.type)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div class="flex justify-center w-full text-center my-16 md:my-24 px-[14px]">
          <div class="w-full md:max-w-[80%]">
            <p class="text-[#535862]">
              <strong>Trusted by 20+ forward-thinking brands</strong>
              <br />
              Join companies already reaching 10,000+ remote workers and
              freelancers actively discovering and organizing their digital
              tools
            </p>

            <div className="flex flex-wrap justify-center w-full gap-5 mt-5">
              {logos.map((logo) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={logo.alt}
                  className="w-[127.5px]"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Productivity;
