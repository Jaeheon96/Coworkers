import { createContext, ReactNode, useContext, useMemo } from "react";
import useArticleCommentsQuery from "@/lib/hooks/article/useArticleCommentsQuery";
import { ArticleComment } from "../dtos/boards/boards";

interface ArticleCommentsContextValues {
  commentsCount: number | undefined;
  increaseCommentsCount: () => void;
  decreaseCommentsCount: () => void;
  comments: ArticleComment[] | undefined;
  hasNextPage: boolean;
  fetchNextComments: () => void;
  isCommentsLoading: boolean;
  isFetchingComments: boolean;
  isCommentsError: boolean;
  refetchComments: () => void;
}

const initialContextValues: ArticleCommentsContextValues = {
  commentsCount: undefined,
  increaseCommentsCount: () => {},
  decreaseCommentsCount: () => {},
  comments: undefined,
  hasNextPage: false,
  fetchNextComments: () => {},
  isCommentsLoading: true,
  isFetchingComments: true,
  isCommentsError: false,
  refetchComments: () => {},
};

const ArticleCommentsContext = createContext(initialContextValues);

export function ArticleCommentsProvider({
  initialCommentsCount,
  children,
}: {
  initialCommentsCount: number;
  children: ReactNode;
}) {
  const {
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
  } = useArticleCommentsQuery(initialCommentsCount);

  const contextValues = useMemo(
    () => ({
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
    }),
    [
      commentsCount,
      comments,
      hasNextPage,
      fetchNextComments,
      isCommentsLoading,
      isFetchingComments,
      isCommentsError,
      refetchComments,
    ],
  );

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
