"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import defaultAvatar from "@assets/svg/avatar-default.svg";
import { ProfileWithUserType } from "@types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientService } from "@utils/api-service";
import { Spinner } from "@components/spinner/Spinner";

interface IProps {
  profile: ProfileWithUserType;
}

const ProfileMain: React.FC<IProps> = ({ profile }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const isAuthUser = session?.user.id === profile?.user.id;
  const isFollowing = profile.user.followedBy?.some(
    (u) => u.id === session?.user.id
  );

  //! Mutation (follow or unFollow)
  const { mutate: followOrUnfollow, isLoading } = useMutation({
    mutationFn: async (args: {
      userId: string;
      followerId: string;
      type: "follow" | "unfollow";
    }) =>
      await clientService.followOrUnfollowUser(
        args.userId,
        args.followerId,
        args.type
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hydrate-user-profile"],
      });
    },
  });

  const followUser = async () => {
    followOrUnfollow({
      userId: String(profile?.user.id),
      followerId: String(session?.user.id),
      type: "follow",
    });
  };

  const unFollowUser = async () => {
    followOrUnfollow({
      userId: String(profile?.user.id),
      followerId: String(session?.user.id),
      type: "unfollow",
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-start">
        <div className="w-full lg:w-3/12 px-4 h-16 lg:order-2 flex justify-center">
          <div>
            <Image
              width={150}
              height={150}
              alt="profile-image"
              src={profile?.user.image || defaultAvatar}
              className="shadow-xl bg-gray-900 rounded-full align-middle border-none relative -top-[5.5rem] max-w-150-px"
            />
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right flex justify-center lg:justify-end h-10">
          <div className="py-6 px-3 sm:mt-0">
            {session && (
              <>
                {isAuthUser ? (
                  <button
                    className="bg-teal-500 active:bg-teal-600 uppercase text-black font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Edit profile
                  </button>
                ) : (
                  <>
                    {!isFollowing ? (
                      <button
                        className="flex items-center gap-2 bg-teal-500 active:bg-teal-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={followUser}
                        disabled={isLoading}
                      >
                        {isLoading && <Spinner />}
                        Follow
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={unFollowUser}
                        disabled={isLoading}
                      >
                        {isLoading && <Spinner />}
                        UnFollow
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-1">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {profile?.user.followedBy?.length || 0}
              </span>
              <span className="text-sm text-blueGray-400">Followers</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {profile?.user.following?.length || 0}
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
      <div className="text-center md:mt-6">
        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
          {profile?.user.name}
        </h3>
        <p className="text-sm text-gray-400 hover:text-gray-500 leading-6 sm:mx-2 md:mx-32">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt
        </p>
        <div className="flex flex-col md:flex-row md:mt-6 justify-around">
          <div>
            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
            Occupation: {profile?.occupation || "Unknown"}
          </div>
          <div>
            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
            Education: {profile?.education || "Unknown"}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
