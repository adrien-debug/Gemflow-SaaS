import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Loading from "@shared/ui/Loading";
import "./styles.scss";
import { Nullable } from "@shared/types/nullable.type.ts";
import NoData from "@shared/ui/NoData";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Pageable } from "@shared/types/pageable.model.ts";
import { ApiError } from "@shared/types/api-error.type.ts";
import useActiveMutations from "@shared/hooks/useActiveMutations.ts";

const SCROLL_BUFFER_SIZE = "300px";
const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_BATCH_DELAY = 100;

interface Props<Item> {
  queryResult: UseInfiniteQueryResult<InfiniteData<Pageable<Item>, unknown>, ApiError>;
  renderItem: (item: Item) => ReactNode;
  empty?: ReactNode;
  mutationKeys?: string[];
  batchSize?: number;
  batchDelay?: number;
  status?: string;
}

const InfiniteList = <Item,>({
  queryResult,
  renderItem,
  empty = <NoData />,
  mutationKeys = [],
  batchSize = DEFAULT_BATCH_SIZE,
  batchDelay = DEFAULT_BATCH_DELAY,
  status,
}: Props<Item>) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isPending } = queryResult;

  const items = useMemo(() => data?.pages.flatMap((page) => page.content) ?? [], [data]);

  const activeMutationsCount = useActiveMutations(mutationKeys);

  const observerRef = useRef<Nullable<HTMLDivElement>>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [visibleCount, setVisibleCount] = useState(batchSize);

  useEffect(() => {
    setVisibleCount(batchSize);
  }, [status, batchSize]);

  useEffect(() => {
    const currentNode = observerRef.current;
    if (!currentNode || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (visibleCount < items.length) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              setVisibleCount((prev) => Math.min(prev + batchSize, items.length));
              timerRef.current = null;
            }, batchDelay);
          } else if (hasNextPage) void fetchNextPage();
        }
      },
      { rootMargin: SCROLL_BUFFER_SIZE },
    );

    observer.observe(currentNode);

    return () => observer.unobserve(currentNode);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, visibleCount, items.length, data]);

  const itemsToRender = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);

  if (isPending || (isFetching && !isFetchingNextPage && activeMutationsCount === 0)) return <Loading />;
  if (items.length === 0 && !isFetching) return empty;

  return (
    <>
      {itemsToRender.map(renderItem)}

      <div ref={observerRef} />

      {isFetchingNextPage && <Loading className="infinite-list-loading" style={{ margin: 0, paddingTop: 20 }} />}
    </>
  );
};

export default InfiniteList;
