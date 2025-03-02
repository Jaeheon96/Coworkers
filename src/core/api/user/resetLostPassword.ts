import { MessageResponse, ResetLostPasswordForm } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import { axiosUnauthorized } from "../axiosInstance";

export default async function resetLostPassword(form: ResetLostPasswordForm) {
  const res: AxiosResponse<MessageResponse> = await axiosUnauthorized
    .patch("user/reset-password", form)
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
