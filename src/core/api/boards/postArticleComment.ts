import { ArticleComment } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function postArticleComment(
  articleId: number,
  content: string,
) {
  const res: AxiosResponse<ArticleComment> = await axiosInstance
    .post(`articles/${articleId}/comments`, { content })
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
