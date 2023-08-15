"use client";

import { iconsList } from "@components/icons";
import InfiniteLoopSlider from "@components/infinite-loop-slider/InfiniteLoopSlider";
import React from "react";
import { useInView } from "react-intersection-observer";

type IProps = {};

const TimeLine: React.FC<IProps> = (props) => {
  const { ref, inView } = useInView();

  return (
    <div>
      <p className="text-center text-2xl p-2">My Tech Stack</p>
      <section
        ref={ref}
        className="grid place-items-center content-center relative min-h-[10rem]"
      >
        <div className="absolute flex justify-center items-center gap-4 top-0 rounded-md w-[80%] z-10 bg-gray-800/40">
          <div className="overflow-hidden">
            <InfiniteLoopSlider rows={1} className="opacity-70" />
          </div>
        </div>
        <div className="absolute left-[10%] w-[0.3rem] rounded-sm h-[100%] bg-gray-800/70"></div>
        <div className="flex flex-wrap gap-5 mt-[5rem] relative left-[7%] mb-[3rem] w-[80%]">
          <div
            className={`${
              inView ? "in-view delay-[50ms]" : "out-view"
            } flex-grow`}
          >
            {iconsList.html({ width: 100 })}
          </div>
          <div
            className={`${
              inView ? "in-view delay-[150ms]" : "out-view"
            } flex-grow`}
          >
            {iconsList.css({ width: 100 })}
          </div>
          <div
            className={`${
              inView ? "in-view delay-[250ms]" : "out-view"
            } flex-grow`}
          >
            {iconsList.javascript({ width: 100 })}
          </div>
          <div
            className={`${
              inView ? "in-view delay-[350ms]" : "out-view"
            } flex-grow mt-1`}
          >
            {iconsList.ts({ width: 100 })}
          </div>
          <div
            className={`${
              inView ? "in-view delay-[450ms]" : "out-view"
            } flex-grow mt-2`}
          >
            {iconsList.react({ width: 95 })}
          </div>
          <div
            className={`${
              inView ? "in-view delay-[550ms]" : "out-view"
            } flex-grow mt-5`}
          >
            {iconsList.nextjs({ width: 120 })}
          </div>
          <div
            className={`${
              inView ? "in-view delay-[650ms]" : "out-view"
            } flex-grow`}
          >
            {iconsList.git({ width: 100 })}
          </div>
          <div
            className={`${
              inView ? "in-view delay-[750ms]" : "out-view"
            } flex-grow`}
          >
            {iconsList.postman({ width: 100 })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimeLine;
