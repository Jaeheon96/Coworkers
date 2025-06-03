import { AxiosError, AxiosResponse } from "axios";
import { GroupResponse } from "@/core/dtos/group/group";
import axiosInstance from "../axiosInstance";

export default async function getTeamData(id: string | number) {
  const res: AxiosResponse<GroupResponse> = await axiosInstance
    .get(`groups/${id}`)
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
