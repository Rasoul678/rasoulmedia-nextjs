import React from "react";

interface IProps {
  text: string;
  color?: string;
}

const Tag: React.FC<IProps> = ({ text, color }) => {
  return (
    <div className="tag" style={{ "--color": color } as React.CSSProperties}>
      <div>{text}</div>
    </div>
  );
};

export default Tag;
