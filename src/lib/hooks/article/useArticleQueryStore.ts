import { ArticleResponse } from "@/core/dtos/boards/boards";
import { useQuery } from "@tanstack/react-query";

export default function useArticleQueryStore(article: ArticleResponse | null) {
  useQuery({
    queryKey: ["Article", article?.id],
    queryFn: () => article,
    staleTime: 0,
    gcTime: 5000,
  });
}
