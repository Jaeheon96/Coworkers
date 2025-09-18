import Image from "next/image";
import { useAuth } from "@/core/context/AuthProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import { useArticleQuery } from "@/core/context/ArticleQueryProvider";
import ArticleMenuDropdown from "./ArticleMenuDropdown";

interface Props {
  article: ArticleResponse;
}

export default function ArticleHeader({ article }: Props) {
  const { user } = useAuth();
  const { articleQueryData } = useArticleQuery();
  const { commentsCount } = useArticleComments();

  const isLiked = articleQueryData ? articleQueryData.isLiked : null;

  return (
    <>
      <div className="mb-4 flex justify-between gap-2 border-b border-border-primary pb-4">
        <h1 className="text-text-2lg font-medium leading-6 text-text-secondary [&&]:max-sm:text-text-lg [&&]:max-sm:leading-6">
          {article.title}
        </h1>
        {user?.id === article.writer.id ? <ArticleMenuDropdown /> : null}
      </div>
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4 [&&]:max-sm:gap-2">
          <div className="flex items-center gap-3 [&&]:max-sm:gap-1.5">
            <div className="relative h-8 w-8">
              <Image fill src="/icons/icon-default_profile.svg" alt="유저" />
            </div>
            <p className="border-r border-slate-700 pr-4 text-text-md font-medium [&&]:max-sm:pr-2 [&&]:max-sm:text-text-xs">
              {article.writer.nickname}
            </p>
          </div>
          <p className="text-text-md font-medium text-slate-400 [&&]:max-sm:text-text-xs">
            {`${article.createdAt.slice(0, 4)}. ${article.createdAt.slice(5, 7)}. ${article.createdAt.slice(8, 10)}`}
          </p>
        </div>
        <div className="flex items-center gap-4 [&&]:max-sm:gap-2">
          <div className="flex items-center gap-1">
            <div className="relative h-4 w-4">
              <Image fill src="/icons/icon-comment.svg" alt="댓글 갯수" />
            </div>
            <p className="text-text-md font-regular text-slate-400 [&&]:max-sm:text-text-xs">
              {commentsCount ?? article.commentCount}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative h-4 w-4">
              <Image
                fill
                src={
                  isLiked
                    ? "/icons/icon-heartFilled.svg"
                    : "/icons/icon-heart.svg"
                }
                alt="좋아요 갯수"
              />
            </div>
            <p className="text-text-md font-regular text-slate-400 [&&]:max-sm:text-text-xs">
              {article.likeCount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
