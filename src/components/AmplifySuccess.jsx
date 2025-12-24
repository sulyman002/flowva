import React from "react";
import exclusive from "../assets/exclusive_offer.svg";
import tech_savy from "../assets/tech_savy.svg";
import top_tool_spotlight from "../assets/top_tool_spotlight.svg";
import reviews_icon from "../assets/reviews_icon.svg";
import progress_icon from "../assets/progress_icon.svg";

const AmplifySuccess = () => {
  return (
    <section className="flex justify-center mb-20 overflow-hidden">
      <div className="w-full md:max-w-[80%] px-[14px]">
        {/* Heading */}
        <h2 className="text-[56px] md:text-[64px] font-[impact] mb-10 text-center">
          AMPLIFY YOUR BRAND&apos;S SUCCESS
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-[24px]">
          {/* Card 1 */}
          <div className="h-[453px] lg:col-span-3 bg-[#F5EBFF] rounded-[24px] p-[32px] flex flex-col items-start justify-between">
            <h3 className="text-[32px] font-manrope font-bold">
              Engage an active community of tech savvy users
            </h3>

            <img src={tech_savy} alt="Tech savvy users" />

            <p className="text-[20px] text-[#535862]">
              Thousands of engaged users explore and use tools on our platform
              everyday
            </p>
          </div>

          {/* Card 2 */}
          <div className="h-[453px] lg:col-span-4 bg-[#F5EBFF] rounded-[24px] p-[32px] flex flex-col items-start justify-between">
            <h3 className="text-[32px] font-manrope font-bold">
              Offer Exclusive Value
            </h3>

            <img src={exclusive} alt="Exclusive offer" />

            <p className="text-[20px] text-[#535862]">
              Stand out with special discounts, cashback, or unique perks for
              our users
            </p>
          </div>

          {/* Card 3 */}
          <div className="h-[453px] lg:col-span-4 bg-[#F5EBFF] rounded-[24px] p-[32px] flex flex-col items-start justify-between">
            <h3 className="text-[32px] font-manrope font-bold">
              Boost Your Visibility
            </h3>

            <img src={top_tool_spotlight} alt="Top tool spotlight" />

            <p className="text-[20px] text-[#535862]">
              Get featured across our Homepage, Discover section, Rewards Hub,
              Library, Newsletter, and Blog
            </p>
          </div>

          {/* Card 4 – Dark */}
          <div className="h-[453px] lg:col-span-3 bg-[#111111] text-white rounded-[24px] p-[32px] flex flex-col overflow-hidden">
            <h3 className="text-[32px] font-manrope font-bold">
              Measure Your Impact
            </h3>

            <p className="text-[20px] mt-5 text-[#FFFFFFCC]">
              Track how many users unlock, engage with, and activate your offer.
            </p>

            <div className="flex items-center mt-auto">
              <div className="flex flex-col">
                <h4 className="font-[impact] text-[56px] -ml-2 -mb-3">
                  30,000+
                </h4>
                <p className="text-[20px]">Tools Added to Libraries</p>
              </div>

              <div className="flex w-[200px]">
                <img
                  src={reviews_icon}
                  alt="Reviews icon"
                  className="w-full h-full"
                />
                <img
                  src={progress_icon}
                  alt="Progress icon"
                  className="w-full h-full -ml-24 -mt-14"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmplifySuccess;
