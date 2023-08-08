import Image from "next/image";
import React from "react";
import loader from "@assets/svg/loader.svg";

interface IProps {
  size?: number
}

export const Spinner: React.FC<IProps> = ({size}) => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex flex-col align-middle justify-center items-center"
    >
      <Image src={loader} alt="Loader" width={size || 40} />
    </div>
  );
};
