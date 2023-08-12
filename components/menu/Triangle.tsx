import React from "react";

interface IProps {}

const Triangle: React.FC<IProps> = (props) => {
  return (
    <svg
      className="absolute bottom-full rtl:right-5 ltr:left-5"
      width="30"
      height="20"
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="15, 0 30, 20 0, 20" className="fill-gray-900" />
    </svg>
  );
};

export default Triangle;
