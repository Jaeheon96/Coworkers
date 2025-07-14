import { useQuery } from "@tanstack/react-query";
import getArticles from "@/core/api/boards/getArticles";

export default function useBestArticles() {
  const bestArticlesQuery = useQuery({
    queryKey: ["Articles", 1, 3, "like"],
    queryFn: () => getArticles({ pageSize: 3, orderBy: "like" }),
    throwOnError: false,
    staleTime: 1000 * 60,
  });

  return bestArticlesQuery;
}
