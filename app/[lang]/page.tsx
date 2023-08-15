import React from "react";
import InfiniteLoopSlider from "@components/infinite-loop-slider/InfiniteLoopSlider";
import Hero from "@components/home_hero/Hero";
import TimeLine from "@components/timeline/TimeLine";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <TimeLine />
    </main>
  );
};

export default Home;
