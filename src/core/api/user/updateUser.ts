import { UpdateUserForm, MessageResponse } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function updateUser(updateUserForm: UpdateUserForm) {
  const res: AxiosResponse<MessageResponse> = await axiosInstance
    .patch("user", updateUserForm)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
