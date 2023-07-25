import React from "react";
import { InfiniteResponseDataType, PromptWithUserType } from "@types";
import PromptCard from "./PromptCard";
import { useInView } from "react-intersection-observer";
import type { FetchNextPageOptions } from "@tanstack/react-query";

interface ICardListProps {
  pages: InfiniteResponseDataType<PromptWithUserType[]>[];
  handleTagClick: (tag: string) => void;
  hasNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => void;
}

const PromptCardList: React.FC<ICardListProps> = ({
  pages,
  handleTagClick,
  hasNextPage,
  fetchNextPage,
}) => {
  //! to know when the last element is in view
  const { ref, inView } = useInView();

  React.useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  return (
    <div className="mt-5 prompt_layout">
      {pages.map((page) =>
        page.data.map((prompt, index) => {
          //! if the last element in the page is in view, add a ref to it
          if (page.data.length === index + 1) {
            return (
              <div ref={ref} key={index}>
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  handleTagClick={handleTagClick}
                />
              </div>
            );
          } else {
            return (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                handleTagClick={handleTagClick}
              />
            );
          }
        })
      )}
    </div>
  );
};

export default PromptCardList;
