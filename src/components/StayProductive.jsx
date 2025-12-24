import React from "react";
import coin from "../assets/coin.svg";

const StayProductive = () => {
  return (
    <section className="flex justify-center mb-20 px-[14px]">
      <div className="relative w-full bg-[#F7FF5D] overflow-hidden min-h-[394px] md:min-h-[550px] py-16 border border-[#00000014] rounded-[16px] md:rounded-[32px] md:max-w-[80%]">
        {/* Content */}
        <div className="relative z-10 px-[45px]">
          <h2 className="text-[40px] md:text-[64px] leading-[120%] font-heading mb-10 text-center uppercase font-black text-black">
            STAY PRODUCTIVE. <br />
            GET REWARDED.
          </h2>

          <p className="md:text-[28px] leading-[30px] md:leading-[35px] font-semibold text-center font-sans text-black">
            Turn your tools, subscriptions, and daily habits into
            <br className="hidden md:block" />
            rewards all in one calm space
          </p>

          <div className="flex justify-center mt-10">
            <button className="relative cursor-pointer w-[232px] text-sm font-bold font-sans border border-[#9013FE1A] rounded-[100px] p-[6px]">
              <div className="w-full whitespace-nowrap p-[24px] rounded-[100px] bg-[#111111] text-white text-sm hover:bg-[#b362fae3] transition-all duration-200 ease-linear shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,0px_40px_11px_0px_#00000000,-4px_13px_19px_0px_#ECD6FF80_inset]">
                Unlock Rewards Now
              </div>
            </button>
          </div>
        </div>

        {/* Left Coins */}
        <div className="absolute -left-16 top-[60%] md:-left-10 md:top-1/2 md:-translate-y-1/2">
          <img src={coin} alt="flowva_coin" className="w-[100px] md:w-auto" />
          <img
            src={coin}
            className="ml-28 w-[100px] md:w-auto"
            alt="flowva_coin"
          />
          <img
            src={coin}
            className="ml-24 w-[100px] md:w-auto"
            alt="flowva_coin"
          />
          <img src={coin} alt="flowva_coin" className="w-[100px] md:w-auto" />
        </div>

        {/* Right Coins */}
        <div className="absolute -right-24 -top-[68%] rotate-180 md:-right-10 md:top-1/2 md:-translate-y-1/2">
          <img src={coin} alt="flowva_coin" className="w-[100px] md:w-auto" />
          <img
            src={coin}
            className="ml-28 w-[100px] md:w-auto"
            alt="flowva_coin"
          />
          <img
            src={coin}
            className="ml-24 w-[100px] md:w-auto"
            alt="flowva_coin"
          />
          <img src={coin} alt="flowva_coin" className="w-[100px] md:w-auto" />
        </div>
      </div>
    </section>
  );
};

export default StayProductive;
