import Image from "next/image";
import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import Button from "@/components/@shared/UI/Button";
import ArticleCommentsLoading from "./ArticleCommentsLoading";
import ArticleCommentCard from "./ArticleCommentCard";

export default function ArticleComments() {
  const {
    comments,
    hasNextPage,
    fetchNextComments,
    isCommentsLoading,
    isFetchingComments,
    isCommentsError,
    refetchComments,
  } = useArticleComments();

  if (isCommentsError)
    return (
      <section className="flex flex-col items-center justify-center gap-8 py-36 [&&]:max-sm:py-40">
        <p className="text-text-lg font-medium text-text-default [&&]:max-sm:text-text-md">
          댓글을 불러오던 중 오류가 발생했습니다.
        </p>
        <Button
          size="large"
          variant="outlined"
          className="w-32 bg-transparent"
          onClick={refetchComments}
        >
          다시 시도
        </Button>
      </section>
    );
  if (isCommentsLoading) return <ArticleCommentsLoading />;
  if (!comments?.length)
    return (
      <section className="flex items-center justify-center py-[9.875rem] [&&]:max-sm:py-[11.25rem]">
        <p className="text-text-lg font-medium text-text-default [&&]:max-sm:text-text-md">
          아직 작성된 댓글이 없습니다.
        </p>
      </section>
    );
  return (
    <section className="flex flex-col gap-4 pb-16 pt-10 [&&]:max-sm:pt-8">
      {comments?.map((comment) => (
        <ArticleCommentCard key={comment.id} comment={comment} />
      ))}
      {hasNextPage ? (
        <button
          className="mt-4 flex h-28 w-full items-center justify-center border-y border-border-primary text-text-lg font-regular text-text-tertiary"
          name="댓글 더 불러오기"
          onClick={fetchNextComments}
          disabled={isFetchingComments}
        >
          {isFetchingComments ? (
            <div className="relative h-6 w-6 animate-spin">
              <Image fill src="/icons/icon-ongoing.svg" alt="처리중..." />
            </div>
          ) : (
            "댓글 더보기"
          )}
        </button>
      ) : null}
    </section>
  );
}
