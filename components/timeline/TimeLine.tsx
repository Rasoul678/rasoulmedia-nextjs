"use client";

import React from "react";
import { TimeSection } from "./components";
import { TAGS } from "@components/infinite-loop-slider/constants";
import TechListIcons from "./components/TechListIcons";
import Education from "./components/Education";
import Repos from "./components/Repos";
import { RepoType } from "@types";

type IProps = {
  repos: RepoType[];
};

const TimeLine: React.FC<IProps> = ({ repos }) => {
  return (
    <div>
      <TimeSection loop title="Tools" tagList={TAGS}>
        {({ inView }) => <TechListIcons inView={inView} />}
      </TimeSection>
      <TimeSection
        loop
        title="Github Repositories"
        tagList={repos.map((r: any) => r.name)}
        color="ffe082"
      >
        {({ inView }) => <Repos repos={repos} inView={inView} />}
      </TimeSection>
      <TimeSection
        title="Academic Educations"
        tagList={["Master & Bachelor"]}
        color="f48fb1"
      >
        {({ inView }) => <Education inView={inView} />}
      </TimeSection>
      {/* <TimeSection tagList={TAGS} color="a5d6a7" /> */}
    </div>
  );
};

export default TimeLine;
