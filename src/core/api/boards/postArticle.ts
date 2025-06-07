import { ArticleAbstract, ArticlePost } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function postArticle(form: ArticlePost) {
  const res: AxiosResponse<ArticleAbstract> = await axiosInstance
    .post("articles", form)
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
