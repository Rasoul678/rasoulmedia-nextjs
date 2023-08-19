"use client";

import React from "react";
import { TimeSection } from "./components";
import { TAGS } from "@components/infinite-loop-slider/constants";
import TechListIcons from "./components/TechListIcons";
import Education from "./components/Education";

type IProps = {};

const TimeLine: React.FC<IProps> = (props) => {
  return (
    <div>
      <TimeSection loop title="My Tech Stack" tagList={TAGS}>
        {({ inView }) => <TechListIcons inView={inView} />}
      </TimeSection>
      <TimeSection
        title="Education Background"
        tagList={["Master & Bachelor"]}
        color="ffe082"
      >
        {({ inView }) => <Education inView={inView} />}
      </TimeSection>
      {/* <TimeSection tagList={TAGS} color="f48fb1" />
      <TimeSection tagList={TAGS} color="a5d6a7" /> */}
    </div>
  );
};

export default TimeLine;
