import { AxiosError, AxiosResponse } from "axios";
import { ArticleComment } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import axiosInstance from "../axiosInstance";

export default async function patchArticleComment(
  commentId: number,
  content: string,
) {
  const res: AxiosResponse<ArticleComment> = await axiosInstance
    .patch(`comments/${commentId}`, { content })
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
