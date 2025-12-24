import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Check } from "lucide-react";

const HowItWorks = ({ viewMode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Duration for each slide in ms
  const SLIDE_DURATION = 5000;
  const UPDATE_INTERVAL = 50; // Update progress every 50ms

  const steps = [
    {
      id: 1,
      title: "Sign up & Connect",
      description: "Set up your workspace in minutes",
      content: (
        <div className="bg-white rounded-3xl shadow-xl w-64 p-4 transform scale-90 sm:scale-100 origin-top-left">
          {/* Mockup: Login Screen */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Continue</h4>
            <p className="text-gray-500 text-xs text-left mb-2">
              Let's get you started.
            </p>
            <div className="border rounded-lg p-2 text-xs text-gray-400">
              Email address
            </div>
            <div className="border rounded-lg p-2 text-xs text-gray-400 flex justify-between">
              <span>Password</span>
              <span>•</span>
            </div>
            <div className="bg-black text-white text-center py-2 rounded-lg text-xs font-bold shadow-lg">
              Continue
            </div>
            <div className="text-center text-[10px] text-gray-400">OR</div>
            <div className="border rounded-lg p-2 text-xs flex gap-2 items-center justify-center font-bold">
              <span className="text-blue-500 font-bold">G</span> Continue with
              Google
            </div>
            <div className="border rounded-lg p-2 text-xs flex gap-2 items-center justify-center font-bold">
              <span className="font-bold"></span> Continue with Apple
            </div>
            <div className="h-1 w-1/3 bg-gray-300 mx-auto rounded-full mt-2"></div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Organize & Track",
      description: "Add your tools, subscriptions, and tasks.",
      content: (
        <div className="relative w-64 h-80">
          {/* Mockup: Floating Cards */}
          <div className="absolute top-0 right-0 bg-white p-3 rounded-xl shadow-lg w-48 rotate-6 z-10 border border-gray-100">
            <div className="flex gap-2 mb-2">
              <div className="w-6 h-6 bg-black rounded text-white text-[8px] flex items-center justify-center font-bold">
                N
              </div>
              <div className="w-6 h-6 bg-blue-500 rounded text-white text-[8px] flex items-center justify-center font-bold">
                S
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded w-3/4"></div>
          </div>
          <div className="absolute top-20 right-4 bg-white p-3 rounded-xl shadow-lg w-48 -rotate-3 z-20 border border-gray-100">
            <div className="flex gap-2 mb-2">
              <div className="w-6 h-6 bg-yellow-400 rounded text-black text-[8px] flex items-center justify-center font-bold">
                M
              </div>
              <div className="w-6 h-6 bg-purple-500 rounded text-white text-[8px] flex items-center justify-center font-bold">
                T
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded w-1/2 mb-1"></div>
            <div className="h-2 bg-gray-100 rounded w-3/4"></div>
          </div>
          <div className="absolute top-44 right-8 bg-white p-3 rounded-xl shadow-lg w-48 rotate-2 z-30 border border-gray-100">
            <div className="flex gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                #
              </div>
            </div>
            <div className="text-[10px] text-gray-500">
              Remote Team Starter Pack
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Earn & Enjoy",
      description: "Check in daily, try new tools, and watch your points grow.",
      content: (
        <div className="w-64 h-80 flex flex-wrap content-start gap-2 p-4">
          {/* Mockup: Coins */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-400 to-pink-300 flex flex-col items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
            >
              <span className="text-white font-bold text-lg leading-none">
                50
              </span>
              <span className="text-white text-[6px] uppercase tracking-wide">
                FlowCoins
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const increment = (UPDATE_INTERVAL / SLIDE_DURATION) * 100;
          if (prev + increment >= 100) {
            // Move to next slide
            setActiveStep((s) => (s + 1) % steps.length);
            return 0;
          }
          return prev + increment;
        });
      }, UPDATE_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black uppercase mb-4">
            SIMPLE, REWARDING, CALM
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="flex flex-col lg:flex-row gap-6 h-[600px] lg:h-[500px]">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <div
                key={step.id}
                onClick={() => {
                  setActiveStep(index);
                  setProgress(0);
                  setIsPlaying(false); // Pause on manual interaction? Or keep playing? User said "when they pause it would be paused".
                  // Let's keep playing or let controls handle. Usually manual click resets timer.
                  // I'll keep playing but reset progress for smooth UX, or strictly follow pause button.
                  // User request: "when they pause it would be paused". Currently clicking just sets active.
                }}
                className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer
                            ${
                              isActive
                                ? "flex-[3] bg-[#E0CDF7]/30"
                                : "flex-[1] bg-gray-50 hover:bg-gray-100"
                            }
                            bg-[#F3E8FF] 
                        `}
              >
                <div className="p-8 h-full flex flex-col relative w-full">
                  {/* Number */}
                  <div className="text-8xl font-black text-black mb-auto leading-none">
                    {step.id}
                  </div>

                  {/* Content (Active Only) */}
                  <div
                    className={`transition-opacity duration-500 delay-200 ${
                      isActive ? "opacity-100" : "opacity-0 absolute bottom-8"
                    }`}
                  >
                    {isActive && (
                      <div className="flex justify-between items-end">
                        <div className="max-w-xs">
                          <h3 className="text-3xl font-bold mb-2 text-black">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 font-medium">
                            {step.description}
                          </p>
                        </div>
                        {/* Visual Content moved to right side inside container */}
                        <div className="hidden sm:block absolute top-8 right-8 pointer-events-none">
                          {step.content}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Inactive Title (shown when collapsed to ensure it's not empty?) 
                                User img shows: "Sign Up & Connect" at bottom when collapsed.
                            */}
                  {!isActive && (
                    <div className="mt-auto">
                      <h3 className="text-2xl font-bold text-black leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play className="w-5 h-5 text-black ml-1" />
            )}
          </button>

          <div className="bg-gray-100 rounded-full px-2 py-2 flex gap-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className="relative h-2 rounded-full bg-gray-300 w-12 overflow-hidden"
              >
                {idx === activeStep && (
                  <div
                    className="absolute top-0 left-0 h-full bg-black transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                )}
                {idx < activeStep && (
                  <div className="absolute top-0 left-0 h-full w-full bg-black"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
