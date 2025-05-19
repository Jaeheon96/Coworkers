import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import getPages from "@/lib/utils/getPages";
import getArticles from "../api/boards/getArticles";
import { ArticlesResponse, GetArticlesQuery } from "../dtos/boards/boards";

interface BoardsContextValues {
  bestArticles: ArticlesResponse | undefined;
  isBestArticlesPending: boolean;
  articles: ArticlesResponse | undefined;
  isArticlesPending: boolean;
  pages: number[];
  lastPage: number;
  pagesLength: number;
}

const initialContextValues: BoardsContextValues = {
  bestArticles: undefined,
  isBestArticlesPending: true,
  articles: undefined,
  isArticlesPending: true,
  pages: [],
  lastPage: 0,
  pagesLength: 5,
};

const PAGE_SIZE = 10;
const PAGES_LENGTH = 5;

const BoardsDataContext = createContext(initialContextValues);

export function BoardsDataProvider({ children }: { children: ReactNode }) {
  const { query, isReady: isRouterReady } = useRouter();
  const { page, orderBy, keyword }: GetArticlesQuery = query;

  const { data: bestArticles, isPending: isBestArticlesPending } = useQuery({
    queryKey: ["Articles", 1, 3, "like"],
    queryFn: () => getArticles({ pageSize: 3, orderBy: "like" }),
    throwOnError: false,
    staleTime: 1000 * 60,
  });

  const { data: articles, isPending: isArticlesPending } = useQuery({
    queryKey: ["Articles", page ?? 1, PAGE_SIZE, orderBy ?? "recent", keyword],
    queryFn: () => getArticles({ page, orderBy, keyword }),
    throwOnError: false,
    staleTime: 1000 * 5,
    enabled: isRouterReady,
  });

  const lastPage = Math.ceil((articles?.totalCount ?? 0) / PAGE_SIZE);

  const pages = getPages(page ?? 1, PAGES_LENGTH, lastPage);

  const contextValues = useMemo(
    () => ({
      bestArticles,
      articles,
      isBestArticlesPending,
      isArticlesPending,
      pages,
      lastPage,
      pagesLength: PAGES_LENGTH,
    }),
    [
      bestArticles,
      articles,
      isBestArticlesPending,
      isArticlesPending,
      pages,
      lastPage,
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
