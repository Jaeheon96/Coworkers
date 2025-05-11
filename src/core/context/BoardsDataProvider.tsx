import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import getArticles from "../api/boards/getArticles";
import { ArticlesResponse, GetArticlesQuery } from "../dtos/boards/boards";

interface BoardsContextValues {
  hotArticles: ArticlesResponse | undefined;
  isHotArticlesPending: boolean;
  articles: ArticlesResponse | undefined;
  isArticlesPending: boolean;
}

const initialContextValues: BoardsContextValues = {
  hotArticles: undefined,
  isHotArticlesPending: true,
  articles: undefined,
  isArticlesPending: true,
};

const PAGE_SIZE = 10;

const BoardsDataContext = createContext(initialContextValues);

export function BoardsDataProvider({ children }: { children: ReactNode }) {
  const { query, isReady: isRouterReady } = useRouter();
  const { page, orderBy, keyword }: GetArticlesQuery = query;

  const { data: hotArticles, isPending: isHotArticlesPending } = useQuery({
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

  const contextValues = useMemo(
    () => ({
      hotArticles,
      articles,
      isHotArticlesPending,
      isArticlesPending,
    }),
    [hotArticles, articles, isHotArticlesPending, isArticlesPending],
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
