"use client";

import React, { memo } from "react";
import { random } from "@utils/helpers";
import TagsRow from "./components/TagsRow";

type IProps = {
  tagPerRow?: number;
  rows?: number;
  duration?: number;
  className?: string;
};

const DURATION = 15_000;
const ROWS = 3;
const TAG_PER_RWO = 30;

const InfiniteLoopSlider: React.FC<IProps> = (props) => {
  const {
    tagPerRow = TAG_PER_RWO,
    rows = ROWS,
    duration = DURATION,
    className,
  } = props;
  const rowData = React.useMemo(() => [...new Array(rows)], [rows]);

  return (
    <div className={`tag-list ${className}`}>
      {rowData.map((_, i) => {
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
            <TagsRow tagPerRow={tagPerRow} />
          </div>
        );
      })}
      <div className="fade" />
    </div>
  );
};

export default memo(InfiniteLoopSlider);
