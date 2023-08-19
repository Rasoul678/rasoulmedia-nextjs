"use client";

import React from "react";
import { TechStack } from "./components";

type IProps = {};

const TimeLine: React.FC<IProps> = (props) => {
  return (
    <div>
      <TechStack />
      <TechStack color="ffe082" />
      <TechStack color="f48fb1" />
      <TechStack color="a5d6a7" />
    </div>
  );
};

export default TimeLine;
