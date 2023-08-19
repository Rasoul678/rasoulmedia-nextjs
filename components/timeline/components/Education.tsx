import React from "react";
import Link from "next/link";
import { iconsList } from "@components/icons";

type IProps = {
  inView: boolean;
};

const Education: React.FC<IProps> = ({ inView }) => {
  return (
    <div className="w-[80%] mt-14 flex flex-col gap-4">
      <div
        className={`flex items-center px-5 h-10 gap-5 ${
          inView ? "in-view delay-[350ms]" : "out-view"
        }`}
      >
        {iconsList.ok({ width: 40, alt: "Ok" })}
        <span className="mt-2 flex gap-2">
          Master{" "}
          <span className="hidden sm:inline">
            of Science in Aerospace Engineering
          </span>{" "}
          at
          <Link
            href="https://sbu.ac.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="red_gradient"
          >
            SBU
          </Link>
        </span>
      </div>
      <div
        className={`flex items-center px-5 h-10 gap-5 ${
          inView ? "in-view delay-[550ms]" : "out-view"
        }`}
      >
        {iconsList.ok({ width: 40, alt: "Ok" })}
        <span className="mt-2 flex gap-2">
          Bachelor{" "}
          <span className="hidden sm:inline">
            of Science in Aerospace Engineering
          </span>{" "}
          at
          <Link
            href="https://mut.ac.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="red_gradient"
          >
            MUT
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Education;
