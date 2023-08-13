"use client";

import React from "react";
import { COLORS } from "../constants";

interface IProps {
  text: keyof typeof COLORS;
}

const Tag: React.FC<IProps> = ({ text }) => {
  return (
    <div
      className="tag"
      style={{ "--color": COLORS[text] } as React.CSSProperties}
    >
      <div>{text}</div>
    </div>
  );
};

export default Tag;
