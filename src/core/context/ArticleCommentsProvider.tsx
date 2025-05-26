import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useMemo } from "react";
import getArticleComments from "../api/boards/getArticleComments";
import { ArticleComment } from "../dtos/boards/boards";

interface ArticleCommentsContextValues {
  comments: ArticleComment[] | undefined;
  hasNextPage: boolean;
  fetchNextComments: () => void;
  isCommentsLoading: boolean;
  isFetchingComments: boolean;
  isCommentsError: boolean;
  refetchComments: () => void;
}

interface InfiniteQueryContext extends QueryFunctionContext {
  pageParam?: number | null;
}

const initialContextValues: ArticleCommentsContextValues = {
  comments: undefined,
  hasNextPage: false,
  fetchNextComments: () => {},
  isCommentsLoading: true,
  isFetchingComments: true,
  isCommentsError: false,
  refetchComments: () => {},
};

const LIMIT = 5;

const ArticleCommentsContext = createContext(initialContextValues);

export function ArticleCommentsProvider({ children }: { children: ReactNode }) {
  const { query } = useRouter();
  const articleId = query.id as string;

  const {
    data: commentsData,
    hasNextPage,
    fetchNextPage,
    isLoading: isCommentsLoading,
    isFetching: isFetchingComments,
    isError: isCommentsError,
    refetch,
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

  const contextValues = useMemo(() => {
    const fetchNextComments = () => {
      fetchNextPage();
    };
    const refetchComments = () => {
      refetch();
    };
    return {
      comments,
      hasNextPage,
      fetchNextComments,
      isCommentsLoading,
      isFetchingComments,
      isCommentsError,
      refetchComments,
    };
  }, [
    comments,
    hasNextPage,
    fetchNextPage,
    isCommentsLoading,
    isFetchingComments,
    isCommentsError,
    refetch,
  ]);

  return (
    <ArticleCommentsContext.Provider value={contextValues}>
      {children}
    </ArticleCommentsContext.Provider>
  );
}

export function useArticleComments() {
  const context = useContext(ArticleCommentsContext);
  if (!context)
    throw new Error("Out of Provider scope: ArticleCommentsProvider");

  return context;
}
