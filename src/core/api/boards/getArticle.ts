import { ArticleResponse } from "@/core/dtos/boards/boards";
import { AxiosError, AxiosResponse } from "axios";
import { axiosUnauthorized } from "../axiosInstance";

export default async function getArticle(articleId: string) {
  const res: AxiosResponse<ArticleResponse> = await axiosUnauthorized
    .get(`articles/${articleId}`)
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
