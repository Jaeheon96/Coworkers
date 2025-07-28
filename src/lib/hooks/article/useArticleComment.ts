import { ChangeEvent, FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import postArticleComment from "@/core/api/boards/postArticleComment";
import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import { useAuth } from "@/core/context/AuthProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";

export default function useArticleComment(article: ArticleResponse) {
  const { user } = useAuth();
  const { increaseCommentsCount, refetchComments } = useArticleComments();

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
        increaseCommentsCount();
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

  const clearCommentError = () => {
    setCommentError("");
  };

  return {
    commentContent,
    handleCommentChange,
    handleCommentSubmit,
    isCommentSubmitPending,
    commentError,
    clearCommentError,
  };
}
