import React, { memo } from "react";
import { iconsList } from "@components/icons";
import TechIcon from "./TechIcon";

type IProps = {
  inView: boolean;
};

const TechListIcons: React.FC<IProps> = ({ inView }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-5 mt-[5rem] relative left-[0%] mb-[3rem] w-[65%]">
      <TechIcon delay={250} inView={inView}>
        {iconsList.stacks.html({ width: 80, alt: "HTML" })}
      </TechIcon>
      <TechIcon delay={350} inView={inView}>
        {iconsList.stacks.css({ width: 80, alt: "CSS" })}
      </TechIcon>
      <TechIcon delay={450} inView={inView}>
        {iconsList.stacks.javascript({ width: 80, alt: "Javascript" })}
      </TechIcon>
      <TechIcon delay={550} inView={inView}>
        {iconsList.stacks.ts({ width: 80, alt: "Typescript" })}
      </TechIcon>
      <TechIcon delay={650} inView={inView}>
        {iconsList.stacks.git({ width: 80, alt: "Git" })}
      </TechIcon>
      <TechIcon delay={750} inView={inView}>
        {iconsList.stacks.postman({ width: 80, alt: "Postman" })}
      </TechIcon>
      <TechIcon delay={850} inView={inView}>
        {iconsList.stacks.react({ width: 75, alt: "ReactJs" })}
      </TechIcon>
      <TechIcon delay={950} inView={inView}>
        {iconsList.stacks.nextjs({ width: 100, alt: "Next.js" })}
      </TechIcon>
      <TechIcon delay={1050} inView={inView}>
        {iconsList.stacks.yarn({ width: 90, alt: "Yarn" })}
      </TechIcon>
      <TechIcon delay={1150} inView={inView}>
        {iconsList.stacks.npm({ width: 90, alt: "NPM" })}
      </TechIcon>
      <TechIcon delay={1250} inView={inView}>
        {iconsList.stacks.docker({ width: 90, alt: "Docker" })}
      </TechIcon>
      <TechIcon delay={1350} inView={inView}>
        {iconsList.stacks.redux({ width: 80, alt: "Redux" })}
      </TechIcon>
      <TechIcon delay={1450} inView={inView}>
        {iconsList.stacks.webpack({ width: 80, alt: "Webpack" })}
      </TechIcon>
    </div>
  );
};

export default memo(TechListIcons);
