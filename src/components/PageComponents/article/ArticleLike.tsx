import Image from "next/image";
import { useArticleQuery } from "@/core/context/ArticleQueryProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import { useAuth } from "@/core/context/AuthProvider";
import useArticleLikeMutation from "@/lib/hooks/article/useArticleLikeMutation";

interface Props {
  article: ArticleResponse;
}

export default function ArticleLike({ article }: Props) {
  const { user } = useAuth();
  const { articleQueryData, isArticleQueryPending } = useArticleQuery();
  const { mutate: sendLike } = useArticleLikeMutation();

  const { isLiked, likeCount } = articleQueryData ?? article;

  const likeClassName = `flex items-center gap-1${user ? " cursor-pointer" : null}`;

  return (
    <div
      className={likeClassName}
      onClick={() => {
        if (articleQueryData) sendLike();
      }}
    >
      {isArticleQueryPending ? (
        <div className="relative h-4 w-4 animate-spin">
          <Image fill src="/icons/icon-ongoing.svg" alt="좋아요 불러오는중" />
        </div>
      ) : (
        <div className="relative h-4 w-4">
          <Image
            fill
            src={
              isLiked ? "/icons/icon-heartFilled.svg" : "/icons/icon-heart.svg"
            }
            alt="좋아요 갯수"
          />
        </div>
      )}
      <p className="text-text-md font-regular text-slate-400 [&&]:max-sm:text-text-xs">
        {likeCount}
      </p>
    </div>
  );
}
