import { PromptRegularList } from "@components/PromptRegularList/PromptRegularList";
import React from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { Spinner } from "@components/spinner/Spinner";
import { ProfileWithUserType } from "@types";
import { clientService } from "@utils/api-service";
import DescriptionColumn from "./details/DescriptionColumn";
import ExcerptColumn from "./details/ExcerptColumn";
import Link from "next/link";
import { iconsList } from "@components/icons";
import { useSession } from "next-auth/react";

interface IProps {
  profile: ProfileWithUserType;
  userId?: string;
}

const ProfileDetails: React.FC<IProps> = ({ profile, userId }) => {
  const [showMore, setShowMore] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const isAuthUser = session?.user.id === profile?.user.id;

  React.useEffect(() => {
    if (showMore) {
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showMore]);

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = "" }) =>
      await clientService.getUserPrompts({
        take: 10,
        lastCursor: pageParam,
        userId,
      }),
    queryKey: ["user-prompts"],
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  const prompts = data?.pages.flatMap((page) => page.data);

  React.useEffect(() => {
    refetch();
  }, [userId, refetch]);

  //! Mutation (delete prompt)
  const { mutate } = useMutation({
    mutationFn: async (promptId: string) => {
      return await fetch(`/api/prompt/${promptId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      refetch({ queryKey: ["user-prompts", "hydrate-my-profile"] });
    },
  });

  const handleEdit = (promptId: string) => {
    router.push(`/prompts/update?id=${promptId}`);
  };

  const handleDelete = async (promptId: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      mutate(promptId);
    }
  };

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
                <ExcerptColumn profile={profile} />
                <DescriptionColumn profile={profile} />
              </div>
              <div className="my-4"></div>
              <div className="bg-gray-900 p-3 shadow-sm rounded-md">
                {error ? (
                  <p className="red_gradient font-bold">
                    Oh no, there was an error when loading prompts
                  </p>
                ) : isLoading ? (
                  <p className="text-lg orange_gradient mt-10">
                    Loading prompts...
                  </p>
                ) : prompts && prompts.length ? (
                  <PromptRegularList
                    prompts={prompts}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ) : (
                  <div>
                    <p className="text-lg orange_gradient">No prompt yet!</p>
                    {isAuthUser && (
                      <Link
                        href="/prompts/new"
                        className="green_gradient text-sm uppercase flex justify-center items-center gap-2"
                      >
                        {iconsList.add({ alt: "add new prompt", width: 30 })}
                        <span className="pt-1">add new prompt</span>
                      </Link>
                    )}
                  </div>
                )}
                {hasNextPage && isFetchingNextPage && <Spinner size={50} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
