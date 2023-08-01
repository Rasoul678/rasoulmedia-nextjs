import React from "react";
import { observe, observable } from "@legendapp/state";
import { InfiniteResponseDataType, PromptWithUserType } from "@types";
import PromptCard from "./PromptCard";
import type { FetchNextPageOptions } from "@tanstack/react-query";
import VirtualizedGrid from "@components/virtualized-grid";
import { useElementSize } from "@hooks/useElementSize";

interface ICardListProps {
  pages: InfiniteResponseDataType<PromptWithUserType[]>[];
  handleTagClick: (tag: string) => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => void;
  handleEdit?: (promptId: string) => void;
  handleDelete?: (promptId: string) => void;
}

const PromptCardList: React.FC<ICardListProps> = (props: ICardListProps) => {
  const {
    pages,
    handleTagClick,
    hasNextPage,
    fetchNextPage,
    handleEdit,
    handleDelete,
    isFetchingNextPage,
  } = props;

  const [windowState] = useElementSize();

  if (windowState.status === "unsupported") {
    return <div>It is probably server side rendering...</div>;
  }

  if (windowState.status === "undetected") {
    return <div>Detecting...</div>;
  }

  const columnCount = (): number => {
    if (windowState.width < 600) {
      return 1;
    }
    if (windowState.width > 600 && windowState.width < 1100) {
      return 2;
    }

    return 3;
  };

  //! To know when the last element is in view
  const inView = observable(false);

  observe(() => {
    if (inView.get() && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const gridData = pages.flatMap((page) => page.data);

  return (
    <div className="prompts-wrapper">
      <VirtualizedGrid
        data={gridData}
        columnCount={columnCount()}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        {({ columnIndex, data, rowIndex, style }) => {
          const prompt = data.allData?.[rowIndex]?.[columnIndex];
          const last = data.allData.length === rowIndex + 1;
          inView.set(last);

          if (prompt) {
            return (
              <div style={style}>
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  handleTagClick={handleTagClick}
                  handleEdit={() => handleEdit?.(String(prompt.id))}
                  handleDelete={() => handleDelete?.(String(prompt.id))}
                />
              </div>
            );
          }
        }}
      </VirtualizedGrid>
    </div>
  );
};
export default PromptCardList;
