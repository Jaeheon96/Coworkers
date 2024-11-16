import { AccessTokenForm, LoginForm } from "@/core/dtos/user/auth";
import axios, { AxiosError, AxiosResponse } from "axios";

export default async function signIn(loginForm: LoginForm) {
  const res: AxiosResponse<AccessTokenForm> = await axios
    .post("/api/auth", loginForm)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
