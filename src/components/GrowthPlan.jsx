import React from "react";

const GrowthPlan = () => {
  return (
    <>
      <section class="px-[14px] select-none">
        <h2 class="text-[56px] md:text-[64px] font-[impact] mb-10 text-center">
          GROWTH PLANS
        </h2>

        <div class="w-full md:max-w-6xl mx-auto md:px-6 grid md:grid-cols-3 gap-8 font-manrope">
          <div
            class="w-full md:max-w-[410px] relative h-auto rounded-[24px] shadow-lg p-6 flex flex-col justify-between border"
            style={{
              backgroundColor: "rgb(249, 249, 249)",
              color: "black",
              borderColor: "rgba(0, 0, 0, 0.16)",
            }}
          >
            <div>
              <h3 class="text-sm font-semibold mb-2">Launch</h3>

              <p class="text-[36px] font-[impact] font-semibold">$50/Month</p>
              <p class="text-sm font-semibold">Save 20% - $480/year</p>

              <button
                class="mt-10 w-full h-[74px] text-sm font-bold rounded-[100px] border p-[6px] hover:scale-102 transition-all duration-300"
                style={{
                  borderColor: "rgba(0, 0, 0, 0.16)",
                }}
              >
                <div class="cursor-pointer h-full w-full flex items-center justify-center rounded-[100px] text-white bg-black transition-color duration-400 hover:bg-purple-400 shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,-4px_13px_19px_0px_#ECD6FF80_inset]">
                  Start Your 3-Day Free Trial
                </div>
              </button>

              <hr class="my-8 border-black/20" />

              <h4 class="font-bold italic">
                Perfect for brands testing Flowva or running focused campaigns.
              </h4>

              <ul class="space-y-2 text-sm mt-2">
                <li class="flex gap-2">✔ Self-serve campaign dashboard</li>
                <li class="flex gap-2">
                  ✔ Run 1–2 featured campaigns per month
                </li>
                <li class="flex gap-2">
                  ✔ Featured placement in Discovery & Newsletter
                </li>
                <li class="flex gap-2">
                  ✔ Basic analytics & performance reporting
                </li>
                <li class="flex gap-2">✔ Offer perks and discounts</li>
              </ul>
            </div>
          </div>

          <div
            class="w-full md:max-w-[410px] relative h-auto rounded-[24px] shadow-lg p-6 flex flex-col justify-between border text-white"
            style={{
              backgroundColor: "rgb(107, 22, 202)",
              borderColor: "rgba(255, 255, 255, 0.16)",
            }}
          >
            <div>
              <span class="absolute top-[2px] right-[2px] bg-white text-[#9013FE] px-4 py-2 rounded-bl-[24px] rounded-tr-[24px]">
                Most Popular
              </span>

              <h3 class="text-sm font-bold mb-2">Accelerate</h3>

              <p class="text-[36px] font-[impact] font-bold">$250/Month</p>
              <p class="text-sm font-semibold">Save 20% - $2,400/year</p>

              <button class="mt-10 w-full h-[74px] text-sm border border-[#ffffff29] font-bold rounded-[100px] border p-[6px] hover:scale-102 transition-all duration-300 cursor-pointer">
                <div
                  class="h-full w-full flex items-center bg-white text-black justify-center hover:bg-black transition-color duration-300 hover:text-white  rounded-[100px] shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,-4px_13px_19px_0px_#ECD6FF80_inset]"
                 
                >
                  Get Started Now
                </div>
              </button>

              <hr class="my-8 border-white/20" />

              <h4 class="font-bold italic">
                For brands ready to scale visibility and engagement.
              </h4>

              <ul class="space-y-2 text-sm mt-2">
                <li class="flex gap-2">✔ 3–5 featured campaigns per month</li>
                <li class="flex gap-2">
                  ✔ Priority visibility & recommendations
                </li>
                <li class="flex gap-2">✔ Advanced analytics & insights</li>
                <li class="flex gap-2">✔ Rewards page promotions</li>
              </ul>
            </div>
          </div>

          <div
            class="w-full md:max-w-[410px] relative h-auto rounded-[24px] shadow-lg p-6 flex flex-col justify-between border"
            style={{
              backgroundColor: "rgb(249, 249, 249)",
              color: "black",
              borderColor: "rgba(0, 0, 0, 0.16)",
            }}
          >
            <div>
              <h3 class="text-sm font-semibold mb-2">Dominate</h3>

              <p class="text-[36px] font-[impact] font-bold">$450/Month</p>
              <p class="text-sm font-semibold">Save 20% - $4,320/year</p>

            

              <button
                class="mt-10 w-full h-[74px] text-sm font-bold rounded-[100px] border p-[6px] hover:scale-102 transition-all duration-300"
                style={{
                  borderColor: "rgba(0, 0, 0, 0.16)",
                }}
              >
                <div class="cursor-pointer h-full w-full flex items-center justify-center rounded-[100px] text-white bg-black transition-color duration-400 hover:bg-purple-400 shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,-4px_13px_19px_0px_#ECD6FF80_inset]">
                   Get Started Now
                </div>
              </button>

              <hr class="my-8 border-black/20" />

              <h4 class="font-bold italic">
                For brands seeking premium positioning across Flowva.
              </h4>

              <ul class="space-y-2 text-sm mt-2">
                <li class="flex gap-2">✔ Unlimited campaigns</li>
                <li class="flex gap-2">✔ Premium placement everywhere</li>
                <li class="flex gap-2">✔ Advanced reports & trend tracking</li>
                <li class="flex gap-2">✔ Early access & managed campaigns</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GrowthPlan;
