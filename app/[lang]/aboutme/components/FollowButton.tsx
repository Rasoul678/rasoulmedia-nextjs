import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { iconsList } from "@components/icons";
import { Spinner } from "@components/spinner/Spinner";
import { ProfileWithUserType } from "@types";
import { clientService } from "@utils/api-service";
import { useSession } from "next-auth/react";

type IProps = {
  profile: ProfileWithUserType;
};

const FollowButton: React.FC<IProps> = ({ profile }) => {
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
    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right flex justify-center lg:justify-end h-10">
      <div className="py-6 px-3 sm:mt-0">
        {session && (
          <>
            {isAuthUser ? (
              <button
                className="bg-teal-500 active:bg-teal-600 uppercase hover:shadow-md shadow p-1 rounded-full outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {iconsList.edit({ alt: "edit profile", width: 30 })}
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
                    {isLoading && <Spinner size={20} />}
                    Follow
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={unFollowUser}
                    disabled={isLoading}
                  >
                    {isLoading && <Spinner size={20} />}
                    UnFollow
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowButton;
