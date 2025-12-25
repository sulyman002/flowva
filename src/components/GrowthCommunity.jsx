import React, { useEffect, useRef, useState } from "react";
import { Star, Heart } from "lucide-react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { testimonials } from "../data/data";
import HowItWorksSteps from "./HowItWorksSteps";

gsap.registerPlugin(Draggable);

const GrowthCommunity = ({ viewMode }) => {
  const [activeIndex, setActiveIndex] = useState(0); // 0, 1, or 2 (representing dots)
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logic:
      // We have 5 cards. Visible viewport shows 3 cards.
      // Card width + Gap needs to be calculated.
      // Total scrollable width involves showing cards 4 and 5.
      // Positions:
      // Index 0 (Dot 1): Shows Cards 1, 2, 3. Track X = 0.
      // Index 1 (Dot 2): Shows Cards 2, 3, 4. Track X = -(CardWidth + Gap).
      // Index 2 (Dot 3): Shows Cards 3, 4, 5. Track X = -2 * (CardWidth + Gap).

      // Container width / 3 gives single card slot width?
      // Actually simpler:
      // Let's assume we want 3 items visible.
      // Draggable needs to snap to these 3 positions.

      const containerWidth = containerRef.current.offsetWidth;
      // We want to show 3 cards exactly? Or approximate?
      // Design shows 3 cards taking up full width with gaps.
      // Let's say: Gap = 24px (1.5rem).
      // Card Width = (ContainerWidth - 2 * Gap) / 3.

      // Let's rely on standard drag and snap.

      // Calculate snap points
      // Each Step shifts by 1 card.
      // Total shifts allowed: 0, 1, 2.

      let cardWidth;
      let gap = 32; // gap-8 = 32px

      // Helper to update dimensions
      const updateDimensions = () => {
        const firstCard = trackRef.current.children[0];
        cardWidth = firstCard.offsetWidth;
        // Gap might be handled by flex gap, let's assume computed style or fix it.
        // Actually better to just use (x output) logic.
      };

      updateDimensions();

      Draggable.create(trackRef.current, {
        type: "x",
        edgeResistance: 0.9,
        dragResistance: 0.4,
        bounds: {
          minX: -((cardWidth + gap) * 2), // Exact limit
          maxX: 0,
        },
        inertia: true,
        snap: {
          x: (value) => {
            // Re-calculate step dynamically to ensure accuracy
            // incase of sub-pixel rendering differences
            const currentCardWidth = trackRef.current.children[0].offsetWidth;
            const currentGap = 32;
            const step = currentCardWidth + currentGap;
            return Math.round(value / step) * step;
          },
        },
        onDragEnd: function () {
          const currentCardWidth = trackRef.current.children[0].offsetWidth;
          const currentGap = 32;
          const step = currentCardWidth + currentGap;
          // Calculate closest index
          const rawIndex = Math.round(this.x / step) * -1;
          const idx = Math.max(0, Math.min(2, rawIndex));
          setActiveIndex(idx);
        },
        onThrowUpdate: function () {
          const currentCardWidth = trackRef.current.children[0].offsetWidth;
          const currentGap = 32;
          const step = currentCardWidth + currentGap;
          const rawIndex = Math.round(this.x / step) * -1;
          const idx = Math.max(0, Math.min(2, rawIndex));
          if (idx !== activeIndex) {
            setActiveIndex(idx);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {viewMode === "users" ? (
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-4 text-purple-600">
                {/* Two hearts interlocking icon approx */}
                <div className="flex">
                  <Heart className="w-8 h-8 fill-transparent stroke-black stroke-2" />
                  <Heart className="w-8 h-8 fill-purple-600 stroke-none -ml-4 mt-1" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase">
                JOIN A GROWING COMMUNITY
              </h2>
            </div>

            {/* Carousel Window */}
            <div
              ref={containerRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* Track - align-items start to allow different heights */}
              <div ref={trackRef} className="flex gap-8 w-full items-start">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className={`
                            flex-shrink-0 w-full md:w-[calc(33.333%-22px)] 
                            ${item.color} rounded-2xl p-8 md:p-10 flex flex-col justify-between
                            shadow-sm
                        `}
                    // Height determined by content naturally
                  >
                    <div>
                      <p className="text-lg font-medium text-gray-900 leading-relaxed mb-6">
                        {item.text} {item.emoji}
                      </p>
                    </div>

                    <div>
                      <div className="flex text-black mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-black text-black"
                          />
                        ))}
                      </div>
                      <h4 className="font-bold text-lg text-black">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-800">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-12">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    idx === activeIndex ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <HowItWorksSteps />
      )}
    </>
  );
};

export default GrowthCommunity;
