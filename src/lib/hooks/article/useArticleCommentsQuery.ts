import { useState } from "react";
import { useRouter } from "next/router";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import getArticleComments from "@/core/api/boards/getArticleComments";

interface InfiniteQueryContext extends QueryFunctionContext {
  pageParam?: number | null;
}

const LIMIT = 5;

export default function useArticleCommentsQuery(initialCommentsCount: number) {
  const { query } = useRouter();
  const articleId = query.id as string;

  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

  const increaseCommentsCount = () => {
    setCommentsCount((prev) => prev + 1);
  };

  const decreaseCommentsCount = () => {
    setCommentsCount((prev) => prev - 1);
  };

  const {
    data: commentsData,
    hasNextPage,
    fetchNextPage: fetchNextComments,
    isLoading: isCommentsLoading,
    isFetching: isFetchingComments,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useInfiniteQuery({
    queryKey: ["ArticleComments", articleId],
    queryFn: ({ pageParam }: InfiniteQueryContext) =>
      getArticleComments({
        articleId,
        limit: LIMIT,
        cursor: pageParam ?? undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60,
    gcTime: 0,
  });

  const comments = commentsData?.pages.map((e) => e.list).flat();

  return {
    commentsCount,
    increaseCommentsCount,
    decreaseCommentsCount,
    comments,
    hasNextPage,
    fetchNextComments,
    isCommentsLoading,
    isFetchingComments,
    isCommentsError,
    refetchComments,
  };
}
