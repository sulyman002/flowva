import React from "react";
import flowvaIcon from "../assets/flowva_logo.png";

const PageLoader = ({ message }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white z-[9999] relative">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        {/* Same logo as Header but adjusted size if needed, user said 'animate-pulse' */}
        <div className="w-36 h-36 flex items-center justify-center text-[#9013FE] font-bold text-xl">
          <img
            src={flowvaIcon}
            alt="Flowva Icon"
            className="w-full h-full object-contain"
          />
        </div>
        {message && (
          <p className="text-gray-500 text-sm font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageLoader;
