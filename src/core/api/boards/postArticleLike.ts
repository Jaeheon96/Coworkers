import { AxiosError, AxiosResponse } from "axios";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import axiosInstance from "../axiosInstance";

export default async function postArticleLike(articleId: number) {
  const res: AxiosResponse<ArticleResponse> = await axiosInstance
    .post(`articles/${articleId}/like`)
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
