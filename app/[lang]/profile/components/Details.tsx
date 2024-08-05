import React from "react";
import DescriptionColumn from "./details/DescriptionColumn";
import ExcerptColumn from "./details/ExcerptColumn";

interface IProps {}

const ProfileDetails: React.FC<IProps> = () => {
  const [showMore, setShowMore] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (showMore) {
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showMore]);

  return (
    <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
      <div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-9/12">
            <button
              ref={ref}
              className="w-full font-normal text-sky-500 outline-none text-lg"
              onClick={() => setShowMore((v) => !v)}
            >
              show {showMore ? "less" : "more"}
            </button>
          </div>
          {showMore && (
            <div className="container mx-auto my-5 p-3 bg-gray-800 rounded-xl">
              <div className="sm:flex no-wrap md:-mx-2 ">
                <ExcerptColumn />
                <DescriptionColumn />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
