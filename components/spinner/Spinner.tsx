import Image from "next/image";
import React from "react";
import loader from "@assets/svg/loader.svg";

interface IProps {}

export const Spinner: React.FC<IProps> = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex flex-col align-middle justify-center"
    >
      <Image src={loader} alt="Loader" width={40} height={40} />
    </div>
  );
};
