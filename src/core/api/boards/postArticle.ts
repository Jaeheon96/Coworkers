import { ArticlePostResponse, ArticlePost } from "@/core/dtos/boards/boards";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function postArticle(form: ArticlePost) {
  const res: AxiosResponse<ArticlePostResponse, AxiosError> =
    await axiosInstance
      .post("articles", form)
      .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
