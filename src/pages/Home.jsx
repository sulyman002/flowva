import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
// import StatsBar from "../components/StatsBar";
import Productivity from "../components/Productivity";
import Features from "../components/Features";
import Benefits from "../components/Benefits";
import HowItWorks from "../components/HowItWorks";
import GrowthCommunity from "../components/GrowthCommunity";
import FAQ from "../components/FAQ";
import StayProductive from "../components/StayProductive";
import Footer from "../components/Footer";
import { getItem } from "../utils/localStorage";

const Home = () => {
  const [viewMode, setViewMode] = useState(() => getItem("tab") || "users");
  return (
    <>
      <Hero viewMode={viewMode} setViewMode={setViewMode} />
      {/* <StatsBar viewMode={viewMode} /> */}
      <Productivity viewMode={viewMode}/>
      <Features viewMode={viewMode} />
      <Benefits viewMode={viewMode} />
      <HowItWorks viewMode={viewMode} />
      <GrowthCommunity />
      <FAQ />
      <StayProductive />
    </>
  );
};

export default Home;
