import { MessageResponse } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import { axiosUnauthorized } from "../axiosInstance";

export default async function requestPasswordResetEmail(email: string) {
  const redirectURL = process.env.NEXT_PUBLIC_URL;
  const res: AxiosResponse<MessageResponse> = await axiosUnauthorized
    .post("user/send-reset-password-email", { email, redirectURL })
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
