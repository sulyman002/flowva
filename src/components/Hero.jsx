import React from "react";
import { Zap, Star, Shield } from "lucide-react";
import { tabs } from "../data/data.js";
import { useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";

const carouselImages = [
  "https://placehold.co/150x80?text=Brand+1",
  "https://placehold.co/150x80?text=Brand+2",
  "https://placehold.co/150x80?text=Brand+3",
  "https://placehold.co/150x80?text=Brand+4",
  "https://placehold.co/150x80?text=Brand+5",
  "https://placehold.co/150x80?text=Brand+6",
  "https://placehold.co/150x80?text=Brand+7",
  "https://placehold.co/150x80?text=Brand+8",
  "https://placehold.co/150x80?text=Brand+8",
  "https://placehold.co/150x80?text=Brand+8",
];

const Hero = ({ viewMode, setViewMode }) => {
  const location = useLocation();
  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-24 w-ful">
      <div className="  px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <div className=" inline-flex items-center bg-gray-100 p-1.5 rounded-full mb-8 shadow-inner gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.viewMode)}
                className={`flex items-center justify-center cursor-pointer
           px-1 py-4 gap-1 w-full
           text-sm font-bold font-[manrope]
           rounded-full ${
             viewMode === tab.viewMode
               ? "bg-[#111111] shadow-md text-gray-900 shadow-[0px_2px_4px_0px_#0000001A]"
               : "text-gray-500 hover:text-gray-700"
           }`}
              >
                <img src={tab.icon} className="w-6 mr-2" alt={tab.title} />
                <span
                  className="bg-gradient-to-r from-[#ECD6FF] to-[#FF8687]
             bg-clip-text text-nowrap text-transparent
             transition-colors duration-300"
                >
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-black leading-[0.95] tracking-tight mb-8 max-w-6xl mx-auto uppercase">
            {viewMode === "users" ? (
              <>
                YOUR{" "}
                <span className="relative inline-block px-8 py-0 mx-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full transform -skew-x-6">
                  SMART
                </span>{" "}
                SPACE TO MANAGE YOUR DIGITAL LIFE AND BE REWARDED
              </>
            ) : (
              <>
                GROW YOUR{" "}
                <span className="relative inline-block px-8 py-0 mx-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full transform -skew-x-6">
                  BRAND
                </span>{" "}
                WITH THE FLOWVA ECOSYSTEM
              </>
            )}
          </h1>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              class={` font-manrope text-sm font-bold border-[#9013FE1A] rounded-[100px] border p-1 ${
                viewMode === "users"
                  ? "bg-white"
                  : "bg-blue-600 hover:bg-blue-700"
              } `}
            >
              <div class="cursor-pointer h-full flex items-center justify-center px-10 py-5  w-full whitespace-nowrap rounded-[100px] relative bg-[#111111] hover:bg-[#b362fae3] transition-all ease-linear duration-200 text-white shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,0px_40px_11px_0px_#00000000,-4px_13px_19px_0px_#ECD6FF80_inset]">
                {viewMode === "users"
                  ? "Start Earning Today"
                  : "Partner With Us"}
              </div>
            </button>
          </div>
        </div>

        {/* Dual Carousel */}
        <div className="mt-16 space-y-8 fade-mask ">
          {/* Row 1: Left */}
          <Marquee gradient={true} gradientColor="white" speed={50}>
            {carouselImages.map((img, index) => (
              <div key={`l-${index}`} className="mx-8">
                <img
                  src={img}
                  alt={`brand-${index}`}
                  className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </Marquee>

          {/* Row 2: Right */}
          <Marquee
            direction="right"
            gradient={true}
            gradientColor="white"
            speed={50}
          >
            {carouselImages.map((img, index) => (
              <div key={`r-${index}`} className="mx-8">
                <img
                  src={img}
                  alt={`brand-${index}`}
                  className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Hero;
