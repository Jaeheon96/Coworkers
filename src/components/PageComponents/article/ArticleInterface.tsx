import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "@/core/context/AuthProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import InputLabel from "@/components/@shared/UI/InputLabel";
import LoadingButton from "@/components/@shared/UI/LoadingButton";
import postArticleComment from "@/core/api/boards/postArticleComment";
import ArticleMenuDropdown from "./ArticleMenuDropdown";
import ArticleComments from "./ArticleComments";
import DeleteArticleModal from "./DeleteArticleModal";

interface Props {
  article: ArticleResponse;
}

export default function ArticleInterface({ article }: Props) {
  const { user } = useAuth();
  const { refetchComments } = useArticleComments();

  const [commentsCount, setCommentsCount] = useState(article.commentCount);
  const [commentContent, setCommentContent] = useState("");
  const [commentError, setCommentError] = useState("");

  const { mutate: postComment, isPending: isCommentSubmitPending } =
    useMutation({
      mutationFn: async () => {
        const res = await postArticleComment(article.id, commentContent);
        return res;
      },
      onSuccess: () => {
        setCommentContent("");
        setCommentError("");
        refetchComments();
        setCommentsCount((prev) => prev + 1);
      },
      onError: (error: AxiosError<StandardError>) => {
        if (error.response?.status === 401) {
          setCommentError(
            "로그인 기간이 만료되었습니다. 다시 로그인 해주세요.",
          );
          return;
        }

        setCommentError(
          `댓글 등록중 오류가 발생했습니다${error.response ? ` - ${error.response.status}: ${error.response.data.message}` : "."}`,
        );
      },
    });

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setCommentError("댓글을 달기 위해선 로그인이 필요합니다.");
      return;
    }
    if (!commentContent) {
      setCommentError("댓글을 입력해주세요.");
      return;
    }
    postComment();
  };

  const commentClassName = `leading-xl h-[6.5rem] resize-none rounded-xl ${commentError ? "border-status-danger" : "border-border-primary"} px-6 py-4 text-text-lg font-regular placeholder:text-text-default [&&]:bg-background-secondary [&&]:hover:border-interaction-hover [&&]:focus:border-interaction-focus [&&]:focus:ring-0 [&&]:max-sm:px-4 [&&]:max-sm:py-2 [&&]:max-sm:text-text-md`;

  return (
    <>
      <main className="mx-auto mt-20 flex max-w-312 flex-col px-6 [&&]:max-sm:mt-16 [&&]:max-sm:px-4">
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
                <Image fill src="/icons/icon-heart.svg" alt="좋아요 갯수" />
              </div>
              <p className="text-text-md font-regular text-slate-400 [&&]:max-sm:text-text-xs">
                {article.likeCount}
              </p>
            </div>
          </div>
        </div>
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
              onBlur={() => {
                setCommentError("");
              }}
            />
          </InputLabel>
          <LoadingButton
            size="large"
            variant="solid"
            type="submit"
            name="댓글 등록"
            isPending={isCommentSubmitPending}
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
