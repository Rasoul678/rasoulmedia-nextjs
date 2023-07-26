"use client";

import React from "react";
import PromptCardList from "./PromptCardList";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PromptWithUserType } from "@types";
import { useRouter } from "next/navigation";

interface IProps {}

type PromptQueryParams = {
  take?: number;
  lastCursor?: string;
};

const allPrompts = async ({ take, lastCursor }: PromptQueryParams) => {
  const response = await fetch(
    `/api/prompt?take=${take}&lastCursor=${lastCursor}`
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
  const [searchResults, setSearchResults] = React.useState<
    PromptWithUserType[]
  >([]);

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = "" }) =>
      allPrompts({ take: 10, lastCursor: pageParam }),
    queryKey: ["hydrate-prompts"],
    // getNextPageParam is used to get the cursor of the last element in the current page
    // which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
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

  const filterPosts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");

    return (
      data?.pages?.filter(
        (page: any) =>
          regex.test(page.text) ||
          regex.test(page.tag) ||
          regex.test(page.user.name)
      ) || []
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    clearTimeout(searchTimeout);
    setSearchText(searchText);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPosts(searchText);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResults = filterPosts(tagName);
    setSearchResults(searchResults);
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
          placeholder="Search for a tag or a username"
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
          pages={searchText ? searchResults : data.pages}
          handleTagClick={handleTagClick}
          hasNextPage={Boolean(hasNextPage)}
          fetchNextPage={fetchNextPage}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : null}
    </section>
  );
};
