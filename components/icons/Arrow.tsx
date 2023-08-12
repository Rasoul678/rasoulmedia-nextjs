import React from "react";
import { Direction, arrows } from "./arrows";

interface IProps {
  dir?: Direction;
  onClick?: () => void;
}

export const ArrowIcon = ({ dir = "left" }: IProps) => {
  return <>{arrows[dir]}</>;
};
