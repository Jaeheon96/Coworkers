import dynamic from "next/dynamic";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import useArticleComment from "@/lib/hooks/article/useArticleComment";
import InputLabel from "@/components/@shared/UI/InputLabel";
import LoadingButton from "@/components/@shared/UI/LoadingButton";
import DeleteArticleModal from "./DeleteArticleModal";
import ArticleCommentsLoading from "./ArticleCommentsLoading";
import ArticleHeader from "./ArticleHeader";

interface Props {
  article: ArticleResponse;
}

export default function ArticleInterface({ article }: Props) {
  const { isCommentsLoading } = useArticleComments();

  const {
    commentContent,
    handleCommentChange,
    handleCommentSubmit,
    isCommentSubmitPending,
    commentError,
    clearCommentError,
  } = useArticleComment(article);

  const ArticleComments = dynamic(() => import("./ArticleComments"), {
    ssr: false,
    loading: ArticleCommentsLoading,
  });

  const commentClassName = `leading-xl h-[6.5rem] resize-none rounded-xl ${commentError ? "border-status-danger" : "border-border-primary"} px-6 py-4 text-text-lg font-regular placeholder:text-text-default [&&]:bg-background-secondary [&&]:hover:border-interaction-hover [&&]:focus:border-interaction-focus [&&]:focus:ring-0 [&&]:max-sm:px-4 [&&]:max-sm:py-2 [&&]:max-sm:text-text-md`;

  return (
    <>
      <main className="mx-auto mt-20 flex max-w-312 flex-col px-6 [&&]:max-sm:mt-16 [&&]:max-sm:px-4">
        <ArticleHeader article={article} />
        <article className="mb-20 py-2.5 text-text-lg font-regular leading-7 text-text-secondary [&&]:max-sm:text-text-md [&&]:max-sm:leading-6">
          {article.content}
        </article>
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
              className={commentClassName}
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
        <ArticleComments />
      </main>
      <DeleteArticleModal />
    </>
  );
}
