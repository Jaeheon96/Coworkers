import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

interface ResponseBody {
  id: number;
}

export default async function deleteArticle(articleId: string) {
  const res: AxiosResponse<ResponseBody> = await axiosInstance
    .delete(`articles/${articleId}`)
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
