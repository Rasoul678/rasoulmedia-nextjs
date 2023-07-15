"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import defaultAvatar from "@assets/svg/avatar-default.svg";

interface IProps {}

const ProfilePage: React.FC<IProps> = (props) => {
  const [showMore, setShowMore] = React.useState(false);
  const [profile, setProfile] = React.useState<any>();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      console.log(data);
      setProfile(data);
    };
    fetchProfile();
  }, []);
  return (
    <div>
      <main className="profile-page p-8 mt-[4rem]">
        <section>
          <div className="px-6 bg-gray-900 rounded-xl">
            <div className="flex flex-wrap justify-center items-start">
              <div className="w-full lg:w-3/12 px-4 h-16 lg:order-2 flex justify-center">
                <div>
                  <Image
                    width={150}
                    height={150}
                    alt="profile-image"
                    src={profile?.profile.user.image}
                    className="shadow-xl bg-gray-900 rounded-full align-middle border-none relative -top-[5.5rem] max-w-150-px"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right">
                <div className="py-6 px-3 mt-32 sm:mt-0">
                  <button
                    className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Follow
                  </button>
                  <button
                    className="text-green-500 font-bold text-sm px-4 py-[0.35rem] rounded outline-none border-[1px] border-green-400 focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Following
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {profile?.profile.user.followedBy.length}
                    </span>
                    <span className="text-sm text-blueGray-400">Followers</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {profile?.profile.user.following.length}
                    </span>
                    <span className="text-sm text-blueGray-400">Following</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      89
                    </span>
                    <span className="text-sm text-blueGray-400">Posts</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                Jenna Stones
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                Los Angeles, California
              </div>
              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                Web Developer - Front-end
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                University of Computer Science
              </div>
            </div>
            <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
              <div>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 lg:w-9/12">
                    <button
                      className="font-normal text-pink-500"
                      onClick={() => setShowMore((v) => !v)}
                    >
                      Show {showMore ? "less" : "more"}
                    </button>
                  </div>
                  {showMore && (
                    <div className="container mx-auto my-5 p-5 bg-black rounded-xl">
                      <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                          <div className="bg-gray-900 rounded-md p-3">
                            <div className="image overflow-hidden">
                              <Image
                                className="h-auto w-full mx-auto rounded"
                                src={profile?.profile.user.image}
                                alt=""
                                width={100}
                                height={100}
                              />
                            </div>
                            <h1 className="text-white font-bold text-xl leading-8 my-1">
                              {profile.profile.user.name}
                            </h1>
                            <h3 className="text-gray-400 font-lg text-semibold leading-6">
                              Owner at Her Company Inc.
                            </h3>
                            <p className="text-sm text-gray-400 hover:text-gray-500 leading-6">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Reprehenderit, eligendi dolorum sequi illum
                              qui unde aspernatur non deserunt
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
                                <span className="ml-auto">Nov 07, 2016</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="w-full md:w-9/12 mx-2 h-64">
                          <div className="bg-gray-900 p-3 shadow-sm rounded-md">
                            <div className="flex items-center space-x-2 font-semibold leading-8">
                              <span className="text-gray-300">
                                <svg
                                  className="h-7"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </span>
                              <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-300">
                              <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    First Name
                                  </div>
                                  <div className="px-4 py-2">
                                    {profile.profile.firstName}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Last Name
                                  </div>
                                  <div className="px-4 py-2">
                                    {profile.profile.lastName}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Gender
                                  </div>
                                  <div className="px-4 py-2">Female</div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Contact No.
                                  </div>
                                  <div className="px-4 py-2">+11 998001001</div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Current Address
                                  </div>
                                  <div className="px-4 py-2">
                                    Beech Creek, PA, Pennsylvania
                                  </div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Permanant Address
                                  </div>
                                  <div className="px-4 py-2">
                                    Arlington Heights, IL, Illinois
                                  </div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Email.
                                  </div>
                                  <div className="px-4 py-2">
                                    <a
                                      className="text-blue-800"
                                      href={`mailto:${profile.profile.email}`}
                                    >
                                      {profile.profile.email}
                                    </a>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Birthday
                                  </div>
                                  <div className="px-4 py-2">Feb 06, 1998</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="my-4"></div>

                          <div className="bg-gray-900 p-3 shadow-sm rounded-md">
                            <div className="grid grid-cols-2">
                              <div>
                                <div className="flex items-center space-x-2 font-semibold leading-8 mb-3">
                                  <span className="text-green-500">
                                    <svg
                                      className="h-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      />
                                    </svg>
                                  </span>
                                  <span className="tracking-wide">
                                    Experience
                                  </span>
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
                                  <li>
                                    <div className="text-teal-600">
                                      Owner at Her Company Inc.
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                      March 2020 - Now
                                    </div>
                                  </li>
                                  <li>
                                    <div className="text-teal-600">
                                      Owner at Her Company Inc.
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                      March 2020 - Now
                                    </div>
                                  </li>
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
                                <div className="flex items-center space-x-2 font-semibold leading-8 mb-3">
                                  <span className="text-green-500">
                                    <svg
                                      className="h-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        fill="#fff"
                                        d="M12 14l9-5-9-5-9 5 9 5z"
                                      />
                                      <path
                                        fill="#fff"
                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                      />
                                    </svg>
                                  </span>
                                  <span className="tracking-wide">
                                    Education
                                  </span>
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
