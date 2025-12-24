import React, { useState } from "react";

const HowItWorks = ({ viewMode }) => {
  const userSteps = [
    {
      id: 1,
      title: "Simple",
      content:
        "Sign up in seconds. No credit card required. Just your email and passion for productivity.",
    },
    {
      id: 2,
      title: "Rewarding",
      content:
        "Use tools, leave reviews, and share with friends to earn points redeemable for real value.",
    },
    {
      id: 3,
      title: "Calm",
      content:
        "Enjoy a clutter-free interface designed to help you focus on what matters most.",
    },
  ];

  const brandSteps = [
    {
      id: 1,
      title: "Connect",
      content:
        "Integrate your product with our platform in minutes. Our team handles the technical setup.",
    },
    {
      id: 2,
      title: "Scale",
      content:
        "Reach a tailored audience of power users. Leverage our community to boost adoption.",
    },
    {
      id: 3,
      title: "Monetize",
      content:
        "Convert engagement into revenue. Track ROI with our comprehensive dashboard.",
    },
  ];

  const steps = viewMode === "brands" ? brandSteps : userSteps;
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="bg-lavender py-24 relative overflow-hidden transition-colors duration-500">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-full h-full bg-[radial-gradient(#E2FBE2_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span
            className={`${
              viewMode === "brands" ? "text-indigo-600" : "text-primary"
            } font-bold tracking-widest uppercase text-sm mb-2 block`}
          >
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-gray-900">
            HOW IT WORKS
          </h2>
        </div>

        {/* Custom Tab/Slider Interface */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-2 rounded-full shadow-md">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeStep === step.id
                    ? viewMode === "brands"
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-primary text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <div className="text-center">
          {steps.map(
            (step) =>
              activeStep === step.id && (
                <div key={step.id} className="animate-fade-in-up">
                  <div
                    className={`text-[120px] sm:text-[180px] font-heading ${
                      viewMode === "brands"
                        ? "text-indigo-900/10"
                        : "text-primary/10"
                    } leading-none select-none -mb-10 sm:-mb-16 transition-colors duration-500`}
                  >
                    {step.id}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 relative">
                    It's {step.title}
                  </h3>
                  <p className="text-lg sm:text-x text-gray-600 max-w-lg mx-auto leading-relaxed">
                    {step.content}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
