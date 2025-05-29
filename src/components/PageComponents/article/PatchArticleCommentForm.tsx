import Button from "@/components/@shared/UI/Button";
import LoadingButton from "@/components/@shared/UI/LoadingButton";
import patchArticleComment from "@/core/api/boards/patchArticleComment";
import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import StandardError from "@/core/types/standardError";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";

interface Props {
  commentId: number;
  defaultContent: string;
  handlePatchFormClose: () => void;
}

export default function PatchArticleCommentForm({
  commentId,
  defaultContent,
  handlePatchFormClose,
}: Props) {
  const [content, setContent] = useState(defaultContent);
  const [commentPatchError, setCommentPatchError] = useState("");

  const { refetchComments } = useArticleComments();

  const { mutate: patch, isPending: isPatchPending } = useMutation({
    mutationFn: () => patchArticleComment(commentId, content),
    onSuccess: () => {
      refetchComments();
      handlePatchFormClose();
    },
    onError: (error) => {
      const e = error as AxiosError<StandardError>;
      console.error(error);
      setCommentPatchError(
        `댓글 등록중 오류가 발생했습니다. 에러 코드: ${e.response?.status}`,
      );
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content) {
      setCommentPatchError("내용을 입력해주세요.");
      return;
    }
    if (content === defaultContent) {
      handlePatchFormClose();
      return;
    }
    patch();
  };

  const commentClassName = `leading-xl h-[6.5rem] w-full resize-none rounded-xl ${commentPatchError ? "border-status-danger" : "border-border-primary"} px-6 py-4 text-text-lg font-regular placeholder:text-text-default [&&]:bg-background-primary [&&]:hover:border-interaction-hover [&&]:focus:border-interaction-focus [&&]:focus:ring-0 [&&]:max-sm:px-4 [&&]:max-sm:py-2 [&&]:max-sm:text-text-md`;

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      <textarea
        className={commentClassName}
        placeholder="댓글을 입력해주세요."
        name="comment patch content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        onBlur={() => {
          setCommentPatchError("");
        }}
      />
      <div className="flex w-full justify-between gap-1">
        <p className="text-text-md font-medium text-status-danger">
          {commentPatchError}
        </p>
        <div className="flex gap-1">
          <LoadingButton
            size="large"
            variant="solid"
            type="submit"
            isPending={isPatchPending}
            className="h-8 w-18.5 text-text-md font-semibold text-white"
          >
            등록
          </LoadingButton>
          <Button
            size="large"
            variant="outlined"
            type="button"
            className="h-8 w-18.5 bg-transparent text-text-md font-semibold text-white"
            onClick={handlePatchFormClose}
          >
            취소
          </Button>
        </div>
      </div>
    </form>
  );
}
