import React, { useMemo } from "react";
import {
  VariableSizeGrid as Grid,
  GridChildComponentProps,
} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { chunks } from "@utils";

interface IProps<T> {
  data: T[];
  children: (props: GridChildComponentProps<any>) => any;
  columnCount: number;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export const VirtualizedGrid = <T,>(props: IProps<T>) => {
  const { data, children, columnCount, hasNextPage } = props;

  const gridData: any[] = useMemo(() => [...chunks(data, 3)], [data]);

  const itemCount = hasNextPage ? gridData.length + 1 : gridData.length;

  const itemData = useMemo(
    () => ({
      allData: gridData,
      columnCount,
    }),
    [gridData, columnCount]
  );

  return (
    <>
      <InfiniteLoader
        isItemLoaded={() => true}
        loadMoreItems={() => {}}
        itemCount={itemCount}
      >
        {({ ref }) => (
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                ref={ref}
                useIsScrolling
                height={height}
                columnCount={columnCount}
                rowCount={gridData.length}
                columnWidth={() => Math.ceil(width / columnCount) - 5}
                rowHeight={() => 225}
                width={width}
                itemData={itemData}
              >
                {(props) => children(props)}
              </Grid>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </>
  );
};
