import React from "react";
import { useInView } from "react-intersection-observer";
import { FetchNextPageOptions } from "@tanstack/react-query";
import PromptCard from "@components/prompts/PromptCard";
import { PromptWithUserType } from "@types";

interface ICardListProps {
  prompts: PromptWithUserType[];
  handleTagClick?: (tag: string) => void;
  hasNextPage?: boolean;
  fetchNextPage?: (options?: FetchNextPageOptions | undefined) => void;
  handleEdit?: (promptId: string) => void;
  handleDelete?: (promptId: string) => void;
}

export const PromptRegularList: React.FC<ICardListProps> = ({
  prompts,
  handleTagClick,
  hasNextPage,
  fetchNextPage,
  handleEdit,
  handleDelete,
}) => {
  const { ref, inView } = useInView();

  React.useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage?.();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  return (
    <div className="mt-5 prompt_layout">
      {prompts.map((prompt, index) => {
        //! if the last element in the page is in view, add a ref to it
        if (prompts.length === index + 1) {
          return (
            <div ref={ref} key={index}>
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                handleTagClick={handleTagClick}
                handleEdit={() => handleEdit?.(String(prompt.id))}
                handleDelete={() => handleDelete?.(String(prompt.id))}
              />
            </div>
          );
        } else {
          return (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              handleTagClick={handleTagClick}
              handleEdit={() => handleEdit?.(String(prompt.id))}
              handleDelete={() => handleDelete?.(String(prompt.id))}
            />
          );
        }
      })}
    </div>
  );
};
