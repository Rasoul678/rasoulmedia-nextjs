import React, { useContext } from "react";
import InfiniteLoopSlider from "@components/infinite-loop-slider/InfiniteLoopSlider";
import Hero from "@components/home_hero/Hero";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="px-6">
        <InfiniteLoopSlider />
      </div>
    </main>
  );
};

export default Home;
