"use client";

import React from "react";
import { block, For } from "million/react";
import Tag from "./Tag";
import { TAGS } from "../constants";

type IProps = {
  tagPerRow: number;
};

const TagsRow: React.FC<IProps> = block(({ tagPerRow }) => {
  const tags = TAGS.slice(0, tagPerRow);

  return (
    <div className="tags-row">
      <For each={tags}>
        {(tag, i) => {
          return <Tag key={i} text={tag} />;
        }}
      </For>
    </div>
  );
});

export default TagsRow;
