import React from "react";
import { Layers, Search, Gift } from "lucide-react";

const Features = ({ viewMode }) => {
  const userFeatures = [
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Organize",
      description:
        "Keep all your favorite tools in one place. Create custom workspaces for different projects.",
      color: "bg-blue-500",
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Discover",
      description:
        "Find new AI tools and software that boost your productivity. Daily updates.",
      color: "bg-primary",
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: "Get Rewarded",
      description:
        "Earn points for using tools and sharing with friends. Redeem for premium subscriptions.",
      color: "bg-green-500",
    },
  ];

  const brandFeatures = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Targeted Reach",
      description:
        "Connect with a highly engaged audience of tech enthusiasts and early adopters.",
      color: "bg-indigo-500",
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Deep Analytics",
      description:
        "Gain insights into user behavior, conversion rates, and campaign performance in real-time.",
      color: "bg-blue-600",
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: "Drive Growth",
      description:
        "Accelerate your user acquisition with incentivized discovery and community rewards.",
      color: "bg-purple-600",
    },
  ];

  const features = viewMode === "brands" ? brandFeatures : userFeatures;

  return (
    <section className="bg-mint py-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-black mb-4 uppercase">
            {viewMode === "brands"
              ? "POWERFUL TOOLS FOR GROWTH"
              : "EVERYTHING IN ONE PLACE"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {viewMode === "brands"
              ? "Scale your product with precision tools designed for modern marketing teams."
              : "Stop switching between tabs. Consolidate your workflow."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-start h-full transform hover:-translate-y-1"
            >
              <div
                className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
              <a
                href="#"
                className="mt-auto pt-6 text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
