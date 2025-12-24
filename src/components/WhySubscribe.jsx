import React from "react";

const WhySubscribe = () => {
  return (
    <>
      <section className="my-20 px-[14px] flex justify-center">
        <div className="w-full md:max-w-[80%]">
          {/* Heading */}
          <h2 className="mb-10 text-center font-[impact] text-[56px] md:text-[64px]">
            WHY SUBSCRIBE TO FLOWVA?
          </h2>

          {/* Cards */}
          <div className="flex justify-center">
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {/* Value Proposition (Desktop only, spans 2 columns) */}
              <div className="hidden xl:col-span-2 xl:block rounded-[16px] xl:min-h-[301px]">
                <p className="font-manrope font-bold xl:text-start text-center">
                  VALUE PROPOSITION
                </p>
                <h2 className="font-[impact] text-[56px] xl:text-start text-center">
                  TRUSTED BY LEADING PRODUCTS WITH ORGANIC MARKETING SUCCESS
                </h2>
              </div>

              {/* Card */}
              <div className="rounded-[16px] bg-[#D966FF] p-4 xl:min-h-[301px]">
                <img
                  src="/assets/verified_3d-DX3lAycr.svg"
                  alt="Verified engagement"
                />
                <h3 className="mt-5 font-manrope text-[24px] font-bold text-white">
                  Verified engagement
                </h3>
                <p className="mt-2 font-manrope text-white">
                  Reach active tech-savvy professionals who actually try new
                  tools.
                </p>
              </div>

              <div className="rounded-[16px] bg-[#FF66AB] p-4 xl:min-h-[301px]">
                <img
                  src="/assets/growth_3d-DFIO7M0X.svg"
                  alt="Reward Driven Growth"
                />
                <h3 className="mt-5 font-manrope text-[24px] font-bold text-white">
                  Reward-Driven Growth
                </h3>
                <p className="mt-2 font-manrope text-white">
                  Built-in rewards system with zero extra fees.
                </p>
              </div>

              <div className="rounded-[16px] bg-[#FF752C] p-4 xl:min-h-[301px]">
                <img src="/assets/service_3d-u84aqjpA.svg" alt="Self Serve" />
                <h3 className="mt-5 font-manrope text-[24px] font-bold text-white">
                  Full Self-Serve Freedom
                </h3>
                <p className="mt-2 font-manrope text-white">
                  Launch, manage, schedule, and track campaigns anytime.
                </p>
              </div>

              <div className="rounded-[16px] bg-[#2C95FF] p-4 xl:min-h-[301px]">
                <img
                  src="/assets/premium_3d-CcJVucJM.svg"
                  alt="Premium Support"
                />
                <h3 className="mt-5 font-manrope text-[24px] font-bold text-white">
                  Optional Premium Support
                </h3>
                <p className="mt-2 font-manrope text-white">
                  Hands-on campaign optimization and analytics.
                </p>
              </div>

              <div className="rounded-[16px] bg-[#FC2367] p-4 xl:min-h-[301px]">
                <img
                  src="/assets/access_3d-Cau1LIbK.svg"
                  alt="Exclusive Access"
                />
                <h3 className="mt-5 font-manrope text-[24px] font-bold text-white">
                  Exclusive Access
                </h3>
                <p className="mt-2 font-manrope text-white">
                  Curated, verified audience with limited campaign slots.
                </p>
              </div>

              <div className="rounded-[16px] bg-[#5BBB6A] p-4 xl:min-h-[301px]">
                <img src="/assets/analytic-DSNjUwc0.svg" alt="Analytics" />
                <h3 className="mt-5 font-manrope text-[24px] font-bold text-white">
                  Actionable Analytics
                </h3>
                <p className="mt-2 font-manrope text-white">
                  Track real engagement — not just impressions.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 flex justify-center">
            <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
              {[
                { value: "1200+", label: "ACTIVE USERS / MONTH" },
                { value: "35M+", label: "IMPRESSIONS" },
                { value: "4200+", label: "PERSONALIZED ADS" },
              ].map((item) => (
                <div key={item.label}>
                  <h2 className="font-[impact] text-[56px]">{item.value}</h2>
                  <hr className="my-4" />
                  <p className="font-manrope text-sm font-bold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhySubscribe;
