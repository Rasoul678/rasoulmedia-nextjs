"use client";

import React from "react";
import PromptCardList from "./PromptCardList";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Spinner } from "@components/spinner/Spinner";

interface IProps {}

type PromptQueryParams = {
  take?: number;
  lastCursor?: string;
  searchText?: string;
};

const allPrompts = async (args: PromptQueryParams) => {
  const { take, lastCursor, searchText } = args;
  const response = await fetch(
    `/api/prompt?take=${take}&lastCursor=${lastCursor}&search=${searchText}`
  );
  const data = await response.json();
  return data;
};

export const Feed: React.FC<IProps> = (props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = React.useState("");
  const [searchTimeout, setSearchTimeout] =
    React.useState<ReturnType<typeof setTimeout>>();

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
    queryFn: ({ pageParam = "" }) =>
      allPrompts({ take: 10, lastCursor: pageParam, searchText }),
    queryKey: ["hydrate-prompts"],
    // getNextPageParam is used to get the cursor of the last element in the current page
    // which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
    keepPreviousData: true,
  });

  //! Mutation (delete prompt)
  const { mutate } = useMutation({
    mutationFn: async (promptId: string) => {
      return await fetch(`/api/prompt/${promptId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hydrate-prompts"] });
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    refetchPrompts();
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    refetchPrompts();
  };

  const refetchPrompts = () => {
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        refetch();
      }, 500)
    );
  };

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
    <section className="feed">
      <form className="sticky top-2 z-[1000] w-full flex-center max-w-xl">
        <input
          type="text"
          placeholder="Search for text, tag, email or a name"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data?.pages ? (
        <PromptCardList
          pages={data.pages}
          handleTagClick={handleTagClick}
          hasNextPage={Boolean(hasNextPage)}
          fetchNextPage={fetchNextPage}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : null}
      {hasNextPage && isFetchingNextPage && <Spinner size={50} />}
    </section>
  );
};
