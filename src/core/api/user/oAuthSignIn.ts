import axios, { AxiosError, AxiosResponse } from "axios";
import {
  AccessTokenForm,
  OAuthLoginForm,
  OAuthProvider,
} from "@/core/dtos/user/auth";
import StandardError from "@/core/types/standardError";

export default async function oAuthSignIn(
  provider: OAuthProvider,
  form: OAuthLoginForm,
) {
  const res: AxiosResponse<AccessTokenForm> = await axios
    .post(`/api/oauth/${provider}`, form)
    .catch((e: AxiosError<StandardError>) => Promise.reject(e));

  return res.data;
}
