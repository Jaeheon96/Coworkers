import { ArticlesResponse, GetArticlesQuery } from "@/core/dtos/boards/boards";
import { AxiosError, AxiosResponse } from "axios";
import { axiosUnauthorized } from "../axiosInstance";

export default async function getArticles(query?: GetArticlesQuery) {
  const { page, pageSize, orderBy, keyword } = query ?? {};
  const res: AxiosResponse<ArticlesResponse> = await axiosUnauthorized
    .get(
      `articles?${page ? `page=${page}` : ""}${pageSize ? `&pageSize=${pageSize}` : ""}${orderBy ? `&orderBy=${orderBy}` : ""}${keyword ? `&keyword=${keyword}` : ""}`,
    )
    .catch((e: AxiosError) => Promise.reject(e.response ?? e));

  return res.data;
}
