import {
  ArticleCommentsResponse,
  GetArticleCommentsQuery,
} from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import { AxiosError, AxiosResponse } from "axios";
import { axiosUnauthorized } from "../axiosInstance";

export default async function getArticleComments(
  getArticleCommentsQuery: GetArticleCommentsQuery,
) {
  const { articleId, limit, cursor } = getArticleCommentsQuery;
  const res: AxiosResponse<ArticleCommentsResponse> = await axiosUnauthorized
    .get(
      `articles/${articleId}/comments?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
    )
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
