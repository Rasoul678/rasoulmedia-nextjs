import Image from "next/image";
import React from "react";

interface IProps {
  alt?: string;
  title?: string;
  className?: string;
  height?: number;
  width?: number;
  src: string;
}

const GeneralIcon: React.FC<IProps> = (props) => {
  const {
    alt = "image",
    title = alt,
    height = 35,
    width = 35,
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
    />
  );
};

export default GeneralIcon;
