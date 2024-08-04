import React from "react";

interface IProps {
  delay: number;
  children: React.ReactNode;
  inView: boolean;
}

const TechIcon: React.FC<IProps> = ({ delay, children, inView }) => {
  return (
    <div
      className={inView ? "in-view" : "out-view"}
      style={{ transitionDelay: delay + 2 + "50ms" }}
    >
      {children}
    </div>
  );
};

export default TechIcon;
