import { TaskListsResponse } from "@/core/dtos/tasks/taskList";
import axiosInstance from "../axiosInstance";

export default async function getTaskLists(teamId: string) {
  const res = await axiosInstance.get<TaskListsResponse>(`/groups/${teamId}`);
  return res.data;
}
