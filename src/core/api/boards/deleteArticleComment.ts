import { AxiosError, AxiosResponse } from "axios";
import StandardError from "@/core/types/standardError";
import axiosInstance from "../axiosInstance";

interface ResponseBody {
  id: number;
}

export default async function deleteArticleComment(commentId: number) {
  const res: AxiosResponse<ResponseBody> = await axiosInstance
    .delete(`comments/${commentId}`)
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
