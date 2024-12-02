import { AccessTokenForm } from "@/core/dtos/user/auth";
import axios, { AxiosError, AxiosResponse } from "axios";

export default async function refreshToken() {
  const res: AxiosResponse<AccessTokenForm> = await axios
    .get("/api/auth")
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
