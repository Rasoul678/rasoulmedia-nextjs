"use client";

import React from "react";
import Tag from "./Tag";
import { TAGS } from "../constants";

type IProps = {
  tagPerRow: number;
};

const TagsRow: React.FC<IProps> = ({ tagPerRow }) => {
  const tags = TAGS.slice(0, tagPerRow);

  return (
    <div className="tags-row">
      {tags.map((tag, i) => {
        return <Tag key={i} text={tag} />;
      })}
    </div>
  );
};

export default TagsRow;
