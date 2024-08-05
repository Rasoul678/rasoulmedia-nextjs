import React from "react";

type IProps = {};

const DescriptionColumn: React.FC<IProps> = () => {
  return (
    <div className="w-full md:w-9/12 sm:mx-3 mt-4 sm:mt-0">
      <div className="bg-gray-900 p-3 shadow-sm rounded-md">
        <div className="text-gray-300 flex items-center space-x-2 font-semibold leading-8 my-2">
          <span>
            <svg
              className="h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="tracking-wide">About Me</span>
        </div>
        <div className="text-gray-300">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 text-sm">
            <div className="grid grid-cols-[1fr_2.8fr]">
              <div className="px-4 py-2 font-semibold text-left">
                First Name:
              </div>
              <div className="px-4 py-2 flex">Rasoul</div>
            </div>
            <div className="grid grid-cols-[1fr_2.8fr]">
              <div className="px-4 py-2 font-semibold text-left">
                Last Name:
              </div>
              <div className="px-4 py-2 flex">Hesami Rostami</div>
            </div>

            <div className="grid grid-cols-[1fr_2.8fr]">
              <div className="px-4 py-2 font-semibold text-left">Email:</div>
              <div className="px-4 py-2 flex">
                <a
                  className="text-sky-500"
                  href={`mailto:h.rostami.r@gmail.com`}
                >
                  h.rostami.r@gmail.com
                </a>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_2.8fr]">
              <div className="px-4 py-2 font-semibold text-left">Birthday:</div>
              <div className="px-4 py-2 flex">Feb 06, 1998</div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4"></div>

      <div className="bg-gray-900 p-3 shadow-sm rounded-md">
        <div className="grid md:grid-cols-2 sm:grid-cols-1">
          <div>
            <div className="text-gray-300 flex items-center space-x-2 font-semibold leading-8 mb-3">
              <span>
                <svg
                  className="h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Experience</span>
            </div>
            <ul className="list-inside space-y-2">
              <li>
                <div className="text-teal-600">Owner at Her Company Inc.</div>
                <div className="text-gray-500 text-xs">March 2020 - Now</div>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-gray-300 flex items-center space-x-2 font-semibold leading-8 mb-3">
              <span>
                <svg
                  className="h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path fill="#222" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    fill="#222"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Education</span>
            </div>
            <ul className="list-inside space-y-2">
              <li>
                <div className="text-teal-600">Masters Degree in Oxford</div>
                <div className="text-gray-500 text-xs">March 2020 - Now</div>
              </li>
              <li>
                <div className="text-teal-600">Bachelors Degreen in LPU</div>
                <div className="text-gray-500 text-xs">March 2020 - Now</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionColumn;
