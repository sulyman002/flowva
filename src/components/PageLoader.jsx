import React from "react";

const PageLoader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white z-[9999] relative">
      <div className="flex items-center gap-2 animate-pulse">
        {/* Same logo as Header but adjusted size if needed, user said 'animate-pulse' */}
        <div className="w-12 h-12 flex items-center justify-center text-[#9013FE] font-bold text-xl">
          <span className="sr-only">Flowva</span>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#9013FE] w-12 h-12"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-heading text-3xl tracking-tight text-[#9013FE] font-bold">
          Flowva
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
