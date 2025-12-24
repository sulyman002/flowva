import React, { useState } from "react";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Features from "../components/Features";
import Benefits from "../components/Benefits";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  const [viewMode, setViewMode] = useState("users"); // 'users' or 'brands'

  return (
    <>
      <Hero viewMode={viewMode} setViewMode={setViewMode} />
      <StatsBar viewMode={viewMode} />
      <Features viewMode={viewMode} />
      <Benefits viewMode={viewMode} />
      <HowItWorks viewMode={viewMode} />
    </>
  );
};

export default Home;
