import { LoginResponse, SignupForm } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function signUp(form: SignupForm) {
  const res: AxiosResponse<LoginResponse> = await axiosInstance
    .post("auth/signUp", form)
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
