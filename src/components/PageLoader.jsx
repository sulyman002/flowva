import React from "react";
import flowvaIcon from "../assets/flowva_logo.png";

const PageLoader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white z-[9999] relative">
      <div className="flex items-center gap-2 animate-pulse">
        {/* Same logo as Header but adjusted size if needed, user said 'animate-pulse' */}
        <div className="w-36 h-36 flex items-center justify-center text-[#9013FE] font-bold text-xl">
          <img
            src={flowvaIcon}
            alt="Flowva Icon"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
