import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/core/context/AuthProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import getArticle from "@/core/api/boards/getArticle";

export default function useArticleQueryStore(article: ArticleResponse | null) {
  const { query } = useRouter();
  const id = query.id as string;
  const { user } = useAuth();

  const articleQuery = useQuery({
    queryKey: ["Article", article?.id],
    queryFn: async () => {
      if (!user) return article;
      const res = await getArticle(id);

      return res;
    },
    staleTime: 0,
    gcTime: 5000,
  });

  return articleQuery;
}
