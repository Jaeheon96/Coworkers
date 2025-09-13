import { ArticleResponse } from "@/core/dtos/boards/boards";
import { AxiosError, AxiosResponse } from "axios";
import StandardError from "@/core/types/standardError";
import axiosInstance from "../axiosInstance";

export default async function deleteArticleLike(articleId: number) {
  const res: AxiosResponse<ArticleResponse> = await axiosInstance
    .delete(`articles/${articleId}/like`)
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
