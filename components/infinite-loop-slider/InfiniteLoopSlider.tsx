"use client";

import React from "react";
import { block, For } from "million/react-server";
import { random } from "@utils/helpers";
import TagsRow from "./components/TagsRow";

type IProps = {
  tagPerRow?: number;
  rows?: number;
  duration?: number;
};

const DURATION = 15_000;
const ROWS = 3;
const TAG_PER_RWO = 30;

const InfiniteLoopSlider: React.FC<IProps> = block((props) => {
  const { tagPerRow = TAG_PER_RWO, rows = ROWS, duration = DURATION } = props;
  const rowData = React.useMemo(() => [...new Array(rows)], [rows]);

  return (
    <div className="tag-list">
      <For each={rowData}>
        {(_, i) => {
          const listDuration = random(duration - 5000, duration + 5000);

          return (
            <div
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
        }}
      </For>
      <div className="fade" />
    </div>
  );
});

export default InfiniteLoopSlider;
