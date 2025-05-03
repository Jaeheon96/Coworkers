import { MessageResponse } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import { axiosUnauthorized } from "../axiosInstance";

export default async function requestPasswordResetEmail(email: string) {
  const redirectUrl = `https://${process.env.NEXT_PUBLIC_URL}`;
  const res: AxiosResponse<MessageResponse> = await axiosUnauthorized
    .post("user/send-reset-password-email", { email, redirectUrl })
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
