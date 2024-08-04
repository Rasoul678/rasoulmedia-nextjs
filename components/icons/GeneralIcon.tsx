import Image from "next/image";
import React from "react";

interface IProps {
  alt?: string;
  title?: string;
  className?: string;
  height?: number;
  width?: number;
  src: typeof import("*.svg");
}

const GeneralIcon: React.FC<IProps> = (props) => {
  const {
    alt = "image",
    title = alt,
    width = 35,
    height = width,
    className = "",
    src,
  } = props;

  return (
    <Image
      src={src}
      className={className}
      title={title}
      alt={alt}
      width={width}
      height={height}
      tabIndex={0}
    />
  );
};

export default GeneralIcon;
