import React from "react";
import { howItWorksSteps } from "../data/data";

const HowItWorksSteps = () => {
  return (
    <section className="flex justify-center my-20 px-[14px]">
      <div className="w-full md:max-w-[80%]">
        <h2 className="text-[56px] md:text-[64px] font-[impact] mb-10 text-center">
          HOW IT WORKS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          {howItWorksSteps.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: item.bg }}
              className={`
                h-fit 
                ${
                  item.fullWidth
                    ? "lg:col-span-2 md:min-h-[378px] flex"
                    : "md:h-[628px]"
                }
                p-[20px] md:p-[40px]
                overflow-hidden
                rounded-[16px] md:rounded-[24px]
                w-full
              `}
            >
              <div className="w-[93px] h-[40px] text-nowrap rounded-[100px] p-[10px_24px] font-semibold bg-white font-manrope">
                {item.step}
              </div>

              <h2 className="text-[32px] md:text-[40px] my-8 font-manrope font-bold text-white">
                {item.title}
              </h2>

              <p className="text-[#FFFFFFCC] text-[24px]">{item.description}</p>

              <img
                src={item.image}
                alt={item.title}
                className={`mt-10 ${item.fullWidth ? "lg:-mt-10" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSteps;
