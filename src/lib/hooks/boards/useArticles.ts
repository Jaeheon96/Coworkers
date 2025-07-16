import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { GetArticlesQuery } from "@/core/dtos/boards/boards";
import getArticles from "@/core/api/boards/getArticles";
import getPages from "@/lib/utils/getPages";

interface Params {
  pageSize: number;
  pagesLength: number;
}

export default function useArticles({ pageSize, pagesLength }: Params) {
  const { query, isReady: isRouterReady } = useRouter();
  const { page, orderBy, keyword }: GetArticlesQuery = query;

  const articlesQuery = useQuery({
    queryKey: ["Articles", page ?? 1, pageSize, orderBy ?? "recent", keyword],
    queryFn: () => getArticles({ page, orderBy, keyword }),
    throwOnError: false,
    staleTime: 1000 * 5,
    enabled: isRouterReady,
  });

  const lastPage = Math.ceil((articlesQuery.data?.totalCount ?? 0) / pageSize);

  const pages = getPages(page ?? 1, pagesLength, lastPage);

  return { ...articlesQuery, lastPage, pages };
}
