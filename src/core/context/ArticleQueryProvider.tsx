import { createContext, ReactNode, useContext, useMemo } from "react";
import useArticleQueryStore from "@/lib/hooks/article/useArticleQueryStore";
import { ArticleResponse } from "../dtos/boards/boards";

interface ArticleQueryContextValues {
  articleQueryData?: ArticleResponse | null;
  refetchArticleQuery: () => void;
  isArticleQueryPending: boolean;
}

interface ArticleQueryProviderProps {
  article: ArticleResponse | null;
  children: ReactNode;
}

const ArticleQueryContext = createContext<ArticleQueryContextValues>({
  articleQueryData: null,
  refetchArticleQuery: () => {},
  isArticleQueryPending: true,
});

export function ArticleQueryProvider({
  article,
  children,
}: ArticleQueryProviderProps) {
  const {
    data: articleQueryData,
    refetch: refetchArticleQuery,
    isPending: isArticleQueryPending,
  } = useArticleQueryStore(article);

  const contextValues = useMemo<ArticleQueryContextValues>(
    () => ({
      articleQueryData,
      refetchArticleQuery,
      isArticleQueryPending,
    }),
    [articleQueryData, isArticleQueryPending],
  );

  return (
    <ArticleQueryContext.Provider value={contextValues}>
      {children}
    </ArticleQueryContext.Provider>
  );
}

export function useArticleQuery() {
  const context = useContext(ArticleQueryContext);
  if (!context) throw new Error("Out of Provider scope: ArticleQueryProvider");

  return context;
}
