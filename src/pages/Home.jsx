import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
  return (
    <>
      <Hero />
      <StatsBar />
      <Features />
      <Benefits />
      <HowItWorks />
    </>
  );
};

export default Home;
