import deleteArticleLike from "@/core/api/boards/deleteArticleLike";
import postArticleLike from "@/core/api/boards/postArticleLike";
import { useArticleQuery } from "@/core/context/ArticleQueryProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useArticleLikeMutation() {
  const { articleQueryData, refetchArticleQuery } = useArticleQuery();
  const article = articleQueryData!;

  const queryClient = useQueryClient();

  const articleLikeMutation = useMutation({
    mutationFn: () => {
      if (!article.isLiked) return postArticleLike(article.id);
      return deleteArticleLike(article.id);
    },
    onMutate: () => {
      queryClient.setQueryData<ArticleResponse>(
        ["Article", article.id],
        (old) =>
          old
            ? {
                ...old,
                isLiked: !old.isLiked,
                likeCount: old.isLiked ? old.likeCount - 1 : old.likeCount + 1,
              }
            : old,
      );
    },
    onSettled: refetchArticleQuery,
  });

  return articleLikeMutation;
}
