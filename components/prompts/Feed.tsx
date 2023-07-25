"use client";

import React from "react";
import PromptCardList from "./PromptCardList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PromptWithUserType } from "@types";

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
  const [searchText, setSearchText] = React.useState("");
  const [searchTimeout, setSearchTimeout] =
    React.useState<ReturnType<typeof setTimeout>>();
  const [searchResults, setSearchResults] = React.useState<
    PromptWithUserType[]
  >([]);

  //! Fetch the posts on the client
  //   const {
  //     data: allPosts,
  //     isLoading,
  //     isFetching,
  //     error,
  //   } = useQuery({
  //     queryKey: ["hydrate-posts"],
  //     queryFn: () => {},
  //     keepPreviousData: true,
  //   });

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
    queryKey: ["prompts"],
    // getNextPageParam is used to get the cursor of the last element in the current page
    // which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
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

  return (
    <section className="feed">
      <form className="sticky top-14 z-50 w-full flex-center max-w-xl">
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
        />
      ) : null}
    </section>
  );
};
