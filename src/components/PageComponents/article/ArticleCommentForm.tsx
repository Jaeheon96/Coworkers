import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import useArticleComment from "@/lib/hooks/article/useArticleComment";
import InputLabel from "@/components/@shared/UI/InputLabel";
import LoadingButton from "@/components/@shared/UI/LoadingButton";

interface Props {
  article: ArticleResponse;
}

export default function ArticleCommentForm({ article }: Props) {
  const {
    commentContent,
    handleCommentChange,
    handleCommentSubmit,
    isCommentSubmitPending,
    commentError,
    clearCommentError,
  } = useArticleComment(article);

  const { isCommentsLoading } = useArticleComments();

  const commentInputClassName = `leading-xl h-[6.5rem] resize-none rounded-xl ${commentError ? "border-status-danger" : "border-border-primary"} px-6 py-4 text-text-lg font-regular placeholder:text-text-default [&&]:bg-background-secondary [&&]:hover:border-interaction-hover [&&]:focus:border-interaction-focus [&&]:focus:ring-0 [&&]:max-sm:px-4 [&&]:max-sm:py-2 [&&]:max-sm:text-text-md`;

  return (
    <form
      className="flex flex-col items-end gap-4 border-b border-border-primary pb-10 [&&]:max-sm:pb-8"
      onSubmit={handleCommentSubmit}
    >
      <InputLabel
        label="댓글달기"
        className="gap-6 text-text-xl font-bold font-medium [&&]:max-sm:text-text-lg"
        errorMessage={commentError}
      >
        <textarea
          className={commentInputClassName}
          placeholder="댓글을 입력해주세요."
          name="comment content"
          value={commentContent}
          onChange={handleCommentChange}
          onBlur={clearCommentError}
        />
      </InputLabel>
      <LoadingButton
        size="large"
        variant="solid"
        type="submit"
        name="댓글 등록"
        isPending={isCommentsLoading || isCommentSubmitPending}
        className="h-12 w-46 text-text-lg font-semibold text-white [&&]:max-sm:h-8 [&&]:max-sm:w-18.5 [&&]:max-sm:text-text-md"
      >
        등록
      </LoadingButton>
    </form>
  );
}
