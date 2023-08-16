import React, { memo } from "react";
import { iconsList } from "@components/icons";

type IProps = {
  inView: boolean;
};

const TechListIcons: React.FC<IProps> = ({ inView }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-[5rem] relative left-[0%] mb-[3rem] w-[65%]">
      <div className={inView ? "in-view delay-[50ms]" : "out-view"}>
        {iconsList.stacks.html({ width: 100, alt: "HTML" })}
      </div>
      <div className={inView ? "in-view delay-[150ms]" : "out-view"}>
        {iconsList.stacks.css({ width: 100, alt: "CSS" })}
      </div>
      <div className={inView ? "in-view delay-[250ms]" : "out-view"}>
        {iconsList.stacks.javascript({ width: 100, alt: "Javascript" })}
      </div>
      <div className={`${inView ? "in-view delay-[350ms]" : "out-view"} mt-1`}>
        {iconsList.stacks.ts({ width: 100, alt: "Typescript" })}
      </div>
      <div className={inView ? "in-view delay-[450ms]" : "out-view"}>
        {iconsList.stacks.git({ width: 100, alt: "Git" })}
      </div>
      <div className={inView ? "in-view delay-[550ms]" : "out-view"}>
        {iconsList.stacks.postman({ width: 100, alt: "Postman" })}
      </div>
      <div className={`${inView ? "in-view delay-[650ms]" : "out-view"} mt-2`}>
        {iconsList.stacks.react({ width: 95, alt: "ReactJs" })}
      </div>
      <div className={`${inView ? "in-view delay-[750ms]" : "out-view"} mt-5`}>
        {iconsList.stacks.nextjs({ width: 120, alt: "Next.js" })}
      </div>
      <div className={`${inView ? "in-view delay-[850ms]" : "out-view"}`}>
        {iconsList.stacks.yarn({ width: 110, alt: "Yarn" })}
      </div>
      <div className={`${inView ? "in-view delay-[950ms]" : "out-view"}`}>
        {iconsList.stacks.npm({ width: 110, alt: "NPM" })}
      </div>
      <div className={`${inView ? "in-view delay-[1050ms]" : "out-view"}`}>
        {iconsList.stacks.docker({ width: 110, alt: "Docker" })}
      </div>
      <div className={`${inView ? "in-view delay-[1150ms]" : "out-view"}`}>
        {iconsList.stacks.redux({ width: 100, alt: "Redux" })}
      </div>
      <div className={`${inView ? "in-view delay-[1250ms]" : "out-view"}`}>
        {iconsList.stacks.webpack({ width: 100, alt: "Webpack" })}
      </div>
    </div>
  );
};

export default memo(TechListIcons);
