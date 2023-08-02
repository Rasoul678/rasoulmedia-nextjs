import React from "react";
import Tag from "./Tag";

interface IProps {
  tagPerRow?: number;
  rows?: number;
  duration?: number;
}

const COLORS = [
  "rgb(74 222 128)",
  "rgb(180 83 9)",
  "rgb(220 38 38)",
  "rgb(14 165 233)",
  "rgb(2 132 199)",
  "rgb(245 158 11)",
  "rgb(37 99 235)",
];

const TAGS = [
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "Tailwind",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "Tailwind",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "Tailwind",
  "React",
  "Next.js",
];

const DURATION = 15_000;
const ROWS = 3;
const TAG_PER_RWO = 30;

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const InfiniteLoopSlider: React.FC<IProps> = ({
  tagPerRow = TAG_PER_RWO,
  rows = ROWS,
  duration = DURATION,
}) => {
  const tags = TAGS.slice(0, tagPerRow);

  return (
    <div className="tag-list">
      {[...new Array(rows)].map((_, i) => {
        const listDuration = random(duration - 5000, duration + 5000);

        return (
          <div
            key={i}
            className="loop-slider"
            style={
              {
                "--duration": `${listDuration}ms`,
                "--direction": i % 2 ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            <div className="inner">
              {tags.map((tag, i) => {
                return (
                  <Tag
                    text={tag}
                    key={i}
                    color={COLORS[random(0, COLORS.length)]}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="fade" />
    </div>
  );
};

export default InfiniteLoopSlider;
