import { AxiosError, AxiosResponse } from "axios";
import { ArticlePatch, ArticleResponse } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import axiosInstance from "../axiosInstance";

export default async function patchArticle(
  articleId: string,
  articlePatchForm: ArticlePatch,
) {
  const res: AxiosResponse<ArticleResponse> = await axiosInstance
    .patch(`articles/${articleId}`, articlePatchForm)
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
