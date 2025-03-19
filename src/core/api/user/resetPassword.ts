import { MessageResponse, ResetPasswordForm } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function resetPassword(form: ResetPasswordForm) {
  const res: AxiosResponse<MessageResponse> = await axiosInstance
    .patch("user/password", form)
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
