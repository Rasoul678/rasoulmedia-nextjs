"use client";

import React, { useContext } from "react";
import { IntlContext } from "@components/intl-provider";
import InfiniteLoopSlider from "@components/infinite-loop-slider/InfiniteLoopSlider";

const Home = () => {
  const intl = useContext(IntlContext);

  return (
    <main className="min-h-screen p-5">
      <div className="text-4xl">Rasoul Media with Next.js</div>
      <div>{intl?.dict?.me}</div>
      <InfiniteLoopSlider />
    </main>
  );
};

export default Home;
