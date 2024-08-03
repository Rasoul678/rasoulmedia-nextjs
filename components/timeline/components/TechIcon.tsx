import React from "react";

interface IProps {
  delay: number;
  children: React.ReactNode;
  inView: boolean;
}

const TechIcon: React.FC<IProps> = ({ delay, children, inView }) => {
  return (
    <div className={inView ? `in-view delay-[${delay}ms]` : "out-view"}>
      {children}
    </div>
  );
};

export default TechIcon;
