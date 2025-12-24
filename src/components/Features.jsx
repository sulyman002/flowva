import React, { useEffect, useRef, useState, useCallback } from "react";
import { Layers, Search, Gift } from "lucide-react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import AmplifySuccess from "./AmplifySuccess";

gsap.registerPlugin(Draggable);

const Features = ({ viewMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const timerRef = useRef(null);

  // Ensure cardsRef is always the correct size
  cardsRef.current = [];
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const userFeatures = [
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Organize",
      description:
        "Keep all your favorite tools in one place. Create custom workspaces for different projects.",
      color: "bg-blue-500",
      sectionBg: "#dcfce7", // Greenish
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Discover",
      description:
        "Find new AI tools and software that boost your productivity. Daily updates.",
      color: "bg-primary",
      sectionBg: "#ffe4e6", // Pinkish
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: "Get Rewarded",
      description:
        "Earn points for using tools and sharing with friends. Redeem for premium subscriptions.",
      color: "bg-green-500",
      sectionBg: "#e0e7ff", // Blueish
    },
  ];

  const brandFeatures = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Targeted Reach",
      description:
        "Connect with a highly engaged audience of tech enthusiasts and early adopters.",
      color: "bg-indigo-500",
      sectionBg: "#f3e8ff", // Purple
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Deep Analytics",
      description:
        "Gain insights into user behavior, conversion rates, and campaign performance in real-time.",
      color: "bg-blue-600",
      sectionBg: "#dbeafe", // Blue
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: "Drive Growth",
      description:
        "Accelerate your user acquisition with incentivized discovery and community rewards.",
      color: "bg-purple-600",
      sectionBg: "#fae8ff", // Light Purple
    },
  ];

  const features = viewMode === "brands" ? brandFeatures : userFeatures;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  }, [features.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  }, [features.length]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(timerRef.current);
  }, [nextSlide]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4000);
  };

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Section Background
      gsap.to(sectionRef.current, {
        backgroundColor: features[activeIndex].sectionBg,
        duration: 0.8,
        ease: "power2.inOut",
      });

      cardsRef.current.forEach((card, index) => {
        // LINEAR LOGIC:
        // We want 3 slots: Left (-1), Center (0), Right (1).
        // BUT for linear flow Reset:
        // 0: [0, 1, 2] -> offset 0, 1, 2
        // 1: [-1, 0, 1] -> offset -1, 0, 1
        // 2: [-2, -1, 0] -> offset -2, -1, 0

        const offset = index - activeIndex;
        // No wrapping adjustment here because we want strictly linear pile up

        let xPercent = 0;
        let scale = 1;
        let opacity = 1;
        let zIndex = 10;
        let rotationY = 0;
        let filter = "blur(0px)";

        if (offset === 0) {
          // Center
          xPercent = 0;
          scale = 1;
          opacity = 1;
          zIndex = 10;
          rotationY = 0;
          filter = "blur(0px)";
        } else {
          // Side cards
          // xPercent: 90% per step
          xPercent = offset * 90;

          // Scale/Opacity
          const absOffset = Math.abs(offset);
          scale = 1 - absOffset * 0.15;
          opacity = 1 - absOffset * 0.3;
          zIndex = 10 - absOffset;

          // Rotation: Face inward
          // Right (offset > 0) -> RotateY -20
          // Left (offset < 0) -> RotateY 20
          rotationY = offset * -20;

          // Optional: If offset is very large (e.g. 2 or -2), make it even more faint
        }

        gsap.to(card, {
          xPercent: xPercent,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          rotationY: rotationY,
          filter: filter,
          duration: 0.8,
          ease: "power3.out",
          transformOrigin: "center center",
        });
      });

      // Draggable logic
      Draggable.create(containerRef.current, {
        type: "x",
        trigger: containerRef.current,
        inertia: true,
        zIndexBoost: false,
        onDragStart: () => {
          clearInterval(timerRef.current);
        },
        onDragEnd: function () {
          const direction = this.getDirection("start");
          if (direction === "left") {
            if (activeIndex < features.length - 1) {
              nextSlide();
            } else {
              nextSlide(); // Resets to 0 via modulo
            }
          } else if (direction === "right") {
            if (activeIndex > 0) {
              prevSlide();
            } else {
              prevSlide(); // Loops to end
            }
          }
          resetTimer();
          gsap.set(this.target, { x: 0 }); // Reset container
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex, features, nextSlide, prevSlide]);

  return (
    <>
      {viewMode === "users" ? (
        <section
          ref={sectionRef}
          className="py-20 overflow-hidden transition-colors duration-500" // added duration just in case
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
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

            {/* Carousel Container */}
            <div
              ref={containerRef}
              className="relative h-[450px] w-full flex justify-center items-center touch-pan-y"
              style={{ perspective: "1000px" }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={addToRefs}
                  onClick={() => {
                    setActiveIndex(index);
                    resetTimer();
                  }}
                  className="absolute w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-start h-[400px] cursor-pointer backface-hidden"
                  style={{
                    top: "50%",
                    left: "50%",
                    xPercent: -50,
                    yPercent: -50,
                  }}
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-auto">
                    {feature.description}
                  </p>
                  <div className="mt-6 text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more &rarr;
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    resetTimer();
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-black w-6"
                      : "bg-gray-400/50 w-3 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <AmplifySuccess />
      )}
    </>
  );
};

export default Features;
