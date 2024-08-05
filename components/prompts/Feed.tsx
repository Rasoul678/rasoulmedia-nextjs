"use client";

import { Spinner } from "@components/spinner/Spinner";
import { observer, useObservable } from "@legendapp/state/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { clientService } from "@utils/api-service";
import Link from "next/link";
import React from "react";
import PromptCardList from "./PromptCardList";
import { iconsList } from "@components/icons/icons";

interface IProps {}

export const Feed: React.FC<IProps> = observer((props) => {
  const state = useObservable<{
    searchText: string;
    searchTimeout: ReturnType<typeof setTimeout> | null;
  }>({
    searchText: "",
    searchTimeout: null,
  });

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
      await clientService.getAllPrompts({
        take: 10,
        lastCursor: pageParam,
        searchText: state.searchText.get(),
      }),
    queryKey: ["hydrate-all-prompts"],
    // getNextPageParam is used to get the cursor of the last element in the current page
    // which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
    keepPreviousData: true,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    refetchPrompts(searchText);
  };

  const handleTagClick = (tagName: string) => {
    refetchPrompts(tagName);
  };

  const refetchPrompts = (searchText: string) => {
    clearTimeout(state.searchTimeout.get());
    state.searchText.set(searchText);

    state.searchTimeout.set(
      setTimeout(() => {
        refetch();
      }, 700)
    );
  };

  return (
    <section className="feed">
      <form className="sticky top-2 z-[1000] w-full flex-between gap-3 px-4 sm:px-20">
        <input
          type="text"
          placeholder="Search for text, tag, email or a name"
          value={state.searchText.get()}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        <Link
          href="/prompts/new"
          className="block text-center green_gradient uppercase"
        >
          {iconsList.plus({ alt: "add new prompt", width: 50 })}
        </Link>
      </form>
      {error ? (
        <p>Oh no, there was an error when loading prompts</p>
      ) : isLoading ? (
        <p className="text-lg orange_gradient mt-10">Loading prompts...</p>
      ) : data?.pages ? (
        <PromptCardList
          pages={data.pages}
          handleTagClick={handleTagClick}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : null}
      {hasNextPage && isFetchingNextPage && <Spinner size={50} />}
    </section>
  );
});
