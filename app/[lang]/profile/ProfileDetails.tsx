"use client";

import React from "react";
import Image from "next/image";
import { ProfileWithUserType } from "@types";
import defaultAvatar from "@assets/svg/avatar-default.svg";

interface IProps {
  profile: ProfileWithUserType;
}

const ProfileDetails: React.FC<IProps> = ({ profile }) => {
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
              className="font-normal text-pink-500 outline-none"
              onClick={() => setShowMore((v) => !v)}
            >
              Show {showMore ? "less" : "more"}
            </button>
          </div>
          {showMore && (
            <div className="container mx-auto my-5 p-5 bg-gray-800 rounded-xl">
              <div className="sm:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">
                  <div className="bg-gray-900 rounded-md p-3">
                    <div className="overflow-hidden">
                      <Image
                        className="h-auto w-full mx-auto rounded-md"
                        src={profile?.user.image || defaultAvatar}
                        alt=""
                        width={500}
                        height={500}
                      />
                    </div>
                    <h1 className="text-white font-bold text-xl leading-8 my-1 mt-4">
                      {profile?.user.name}
                    </h1>
                    <h3 className="text-gray-400 font-lg text-semibold leading-6">
                      Owner at Her Company Inc.
                    </h3>
                    <p className="text-sm text-gray-400 hover:text-gray-500 leading-6">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit, eligendi dolorum sequi illum qui unde
                      aspernatur non deserunt
                    </p>
                    <ul className="text-gray-400 hover:text-gray-200 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex items-center py-3">
                        <span>Status</span>
                        <span className="ml-auto">
                          <span className="bg-green-700 py-1 px-2 rounded text-white text-sm">
                            Verified
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">
                          {profile?.user.createdAt}
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Last login</span>
                        <span className="ml-auto">
                          {profile?.user.lastJoin}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
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
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold text-left">
                            First Name:
                          </div>
                          <div className="px-4 py-2">{profile?.firstName}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold text-left">
                            Last Name:
                          </div>
                          <div className="px-4 py-2">{profile?.lastName}</div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold text-left">
                            Email:
                          </div>
                          <div className="px-4 py-2">
                            <a
                              className="text-blue-800"
                              href={`mailto:${profile?.email}`}
                            >
                              {profile?.email}
                            </a>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold text-left">
                            Birthday:
                          </div>
                          <div className="px-4 py-2">Feb 06, 1998</div>
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
                            <div className="text-teal-600">
                              Owner at Her Company Inc.
                            </div>
                            <div className="text-gray-500 text-xs">
                              March 2020 - Now
                            </div>
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
                            <div className="text-teal-600">
                              Masters Degree in Oxford
                            </div>
                            <div className="text-gray-500 text-xs">
                              March 2020 - Now
                            </div>
                          </li>
                          <li>
                            <div className="text-teal-600">
                              Bachelors Degreen in LPU
                            </div>
                            <div className="text-gray-500 text-xs">
                              March 2020 - Now
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
