"use client";

import React from "react";
import { TechStack } from "./components";

type IProps = {};

const TimeLine: React.FC<IProps> = (props) => {
  return (
    <div>
      <TechStack />
      <TechStack color="f48fb1" />
    </div>
  );
};

export default TimeLine;
