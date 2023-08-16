import React, { CSSProperties } from "react";
import { useInView } from "react-intersection-observer";
import InfiniteLoopSlider from "@components/infinite-loop-slider/InfiniteLoopSlider";
import { useElementScroll } from "@hooks/useElementScroll";
import TechListIcons from "./TechListIcons";
import TimeScroler from "./TimeScroller";

type IProps = {
    color?: string; 
};

export const TechStack: React.FC<IProps> = ({color}) => {
  const { ref, inView } = useInView();

  return (
    <>
      <p className="text-center text-2xl p-2">My Tech Stack</p>
      <section
        ref={ref}
        className="grid place-items-center content-center relative min-h-[10rem]"
      >
        <div className="absolute flex justify-center items-center gap-4 top-0 rounded-sm w-[80%] z-10 bg-gray-800/40">
          <div className="overflow-hidden">
            <InfiniteLoopSlider rows={1} className="opacity-70" />
          </div>
        </div>
        <TimeScroler color={color} />
        <TechListIcons inView={inView} />
      </section>
    </>
  );
};
