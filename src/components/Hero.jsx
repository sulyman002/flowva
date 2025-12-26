import React from "react";
import { Zap, Star, Shield } from "lucide-react";
import { tabs } from "../data/data.js";
import { useLocation, Link  } from "react-router-dom";
import { setItem } from "../utils/localStorage.js";
import asana from "../assets/asana.svg";
import chatgpt from "../assets/chatgpt.svg";
import coin from "../assets/coin.svg";
import framer from "../assets/framer.svg";
import google from "../assets/google.svg";
import vsCode from "../assets/vs_code.svg";
import zoom from "../assets/zoom.svg";
// ToolsMarquee.jsx
import Marquee from "react-fast-marquee";
import FlipCard from "./FlipCard.jsx";
import { cardsData } from "../data/data.js";

const carouselImages = [
  asana,
  coin,
  chatgpt,
  coin,
  framer,
  coin,
  google,
  coin,
  vsCode,
  coin,
  zoom,
  coin,
];

const Hero = ({ viewMode, setViewMode }) => {
  const location = useLocation();
  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-24 w-full">
      <div className="  px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="container mx-auto">
          <div className=" inline-flex items-center bg-gray-100 p-1 rounded-full mb-8 shadow-inner gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setViewMode(tab.viewMode);
                  setItem("tab", tab.viewMode);
                }}
                className={`flex items-center justify-center cursor-pointer
           px-3 py-5 gap-1 w-full
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
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading text-black leading-[0.95] tracking-tight mb-8 max-w-6xl mx-auto uppercase">
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
                viewMode === "users" ? "bg-white" : "bg-white "
              } `}
            >
              <Link to="/signup"  class="cursor-pointer h-full flex items-center justify-center px-10 py-5  w-full whitespace-nowrap rounded-[100px] relative bg-[#111111] hover:bg-[#b362fae3] transition-all ease-linear duration-200 text-white shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,0px_40px_11px_0px_#00000000,-4px_13px_19px_0px_#ECD6FF80_inset]">
                {viewMode === "users"
                  ? "Start Earning Today"
                  : "Partner With Us"}
              </Link>
            </button>
          </div>
        </div>

        {/* Dual Carousel */}
        {viewMode === "users" ? (
          <div className="mt-16 space-y-8 fade-mask ">
            {/* Row 1: Left */}
            <Marquee gradient={true} gradientColor="white" speed={50}>
              {carouselImages.map((img, index) => (
                <div key={`l-${index}`} className="mx-8">
                  <img
                    src={img}
                    alt={`brand-${index}`}
                    className="h-28 w-auto  hover:opacity-100 transition-opacity "
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
                    className="h-28 w-auto  hover:opacity-100 transition-opacity "
                  />
                </div>
              ))}
            </Marquee>
          </div>
        ) : (
          <Marquee speed={50} gradient={true}  gradientColor={[243, 244, 246]} className="">
            {cardsData.concat(cardsData).map((card, index) => (
              <FlipCard key={index} card={card} />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
};

export default Hero;
