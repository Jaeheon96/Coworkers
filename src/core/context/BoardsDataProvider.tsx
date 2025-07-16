import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import useBestArticles from "@/lib/hooks/boards/useBestArticles";
import useArticles from "@/lib/hooks/boards/useArticles";
import { ArticlesResponse } from "../dtos/boards/boards";

interface BoardsContextValues {
  bestArticles: ArticlesResponse | undefined;
  isBestArticlesPending: boolean;
  articles: ArticlesResponse | undefined;
  isArticlesPending: boolean;
  pages: number[];
  lastPage: number;
  pagesLength: number;
  isBestArticlesError: boolean;
  isArticlesError: boolean;
  refetchBestArticles: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ArticlesResponse, Error>>;
  refetchArticles: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ArticlesResponse, Error>>;
}

const initialContextValues: BoardsContextValues = {
  bestArticles: undefined,
  isBestArticlesPending: true,
  articles: undefined,
  isArticlesPending: true,
  pages: [],
  lastPage: 0,
  pagesLength: 5,
  isBestArticlesError: false,
  isArticlesError: false,
  refetchBestArticles: () => Promise.reject(),
  refetchArticles: () => Promise.reject(),
};

const PAGE_SIZE = 10;
const PAGES_LENGTH = 5;

const BoardsDataContext = createContext(initialContextValues);

export function BoardsDataProvider({ children }: { children: ReactNode }) {
  const {
    data: bestArticles,
    isPending: isBestArticlesPending,
    isError: isBestArticlesError,
    refetch: refetchBestArticles,
  } = useBestArticles();

  const {
    data: articles,
    isPending: isArticlesPending,
    isError: isArticlesError,
    refetch: refetchArticles,
    lastPage,
    pages,
  } = useArticles({ pageSize: PAGE_SIZE, pagesLength: PAGES_LENGTH });

  const contextValues = useMemo(
    () => ({
      bestArticles,
      articles,
      isBestArticlesPending,
      isArticlesPending,
      pages,
      lastPage,
      pagesLength: PAGES_LENGTH,
      isBestArticlesError,
      isArticlesError,
      refetchBestArticles,
      refetchArticles,
    }),
    [
      bestArticles,
      articles,
      isBestArticlesPending,
      isArticlesPending,
      pages,
      lastPage,
      isBestArticlesError,
      isArticlesError,
      refetchBestArticles,
      refetchArticles,
    ],
  );

  return (
    <BoardsDataContext.Provider value={contextValues}>
      {children}
    </BoardsDataContext.Provider>
  );
}

export function useBoardsData() {
  const context = useContext(BoardsDataContext);
  if (!context) throw new Error("Out of provider scope: BoardsDataProvider");

  return context;
}
