// FlipCard.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FlipCard = ({ card }) => {
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;

    const flipIn = () =>
      gsap.to(el, {
        rotateY: 180,
        duration: 0.3,
        ease: "power3.out",
      });

    const flipOut = () =>
      gsap.to(el, {
        rotateY: 0,
        duration: 0.3,
        ease: "power3.out",
      });

    el.parentElement.addEventListener("mouseenter", flipIn);
    el.parentElement.addEventListener("mouseleave", flipOut);
    el.parentElement.addEventListener("focusin", flipIn);
    el.parentElement.addEventListener("focusout", flipOut);

    return () => {
      el.parentElement.removeEventListener("mouseenter", flipIn);
      el.parentElement.removeEventListener("mouseleave", flipOut);
      el.parentElement.removeEventListener("focusin", flipIn);
      el.parentElement.removeEventListener("focusout", flipOut);
    };
  }, []);

  return (
    <div
      className="mx-4 flip-card w-[168px] h-[148px] md:w-[421px] md:h-[369px] mt-16"
      tabIndex={0}
      role="button"
      aria-label={`${card.name} card`}
    >
      <div
        ref={innerRef}
        className="flip-card-inner w-full h-full rounded-[16px] md:rounded-[32px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden border border-gray-200 rounded-[16px] md:rounded-[32px] overflow-hidden">
          <img
            src={card.image}
            alt={`${card.name} logo`}
            draggable={false}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center
                     text-center p-4 border border-gray-200 rounded-[16px] md:rounded-[32px]"
          style={{
            backgroundColor: card.bg,
            color: card.text,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-2 text-sm md:text-lg font-bold
                       p-[10px_16px] rounded-[24px]"
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          >
            {card.name}
            <svg width="11" height="10" viewBox="0 0 11 10">
              <path
                d="M4.8 1L9.5 1M9.5 1L9.5 5.6M9.5 1L1.5 9"
                stroke={card.arrow}
                strokeWidth="1.5"
              />
            </svg>
          </a>

          <p className="text-xs md:text-sm font-manrope">{card.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
