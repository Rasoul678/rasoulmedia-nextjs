import React from "react";
import dynamic from "next/dynamic";
import Spinner from "@components/spinner";

const MoreAboutMe = dynamic(
  () => import("./details/MoreAboutMe").then((mod) => mod.default),
  {
    loading: () => <Spinner />,
  }
);

interface IProps {}

const ProfileDetails: React.FC<IProps> = () => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
      <div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-9/12">
            <button
              className="w-full font-normal text-sky-500 outline-none text-lg"
              onClick={() => setShowMore((v) => !v)}
            >
              show {showMore ? "less" : "more"}
            </button>
          </div>
          {showMore && <MoreAboutMe />}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
