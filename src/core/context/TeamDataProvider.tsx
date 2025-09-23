import { createContext, ReactNode, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import getTeamData from "../api/group/getTeamData";
import { GroupResponse, TaskListTasks } from "../dtos/group/group";
import getTasks from "../api/group/getTasks";

interface TeamContextValues {
  teamId: string;
  group: GroupResponse | undefined;
  groupError: Error | null;
  refreshGroup: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<GroupResponse, Error>>;
  tasks: TaskListTasks[] | undefined;
  isTasksPending: boolean;
}

const TeamDataContext = createContext<TeamContextValues | null>(null);

export function TeamDataPrvider({ children }: { children: ReactNode }) {
  const { query, isReady } = useRouter();
  const teamId = query.teamId as string;
  const { user } = useAuth(true);

  const {
    data: group,
    error: groupError,
    refetch: refreshGroup,
  } = useQuery({
    queryKey: ["group", teamId],
    queryFn: () => getTeamData(teamId),
    staleTime: 1000 * 60,
    throwOnError: false,
    retry: 1,
    enabled: isReady && !!user,
  });

  const { data: tasks, isPending: isTasksPending } = useQuery({
    queryKey: ["tasks", teamId],
    queryFn: () => getTasks(teamId),
    staleTime: 1000 * 60,
    enabled: !!group,
  });

  const contextValues = useMemo(
    () => ({
      teamId,
      group,
      groupError,
      refreshGroup,
      tasks,
      isTasksPending,
    }),
    [teamId, group, groupError, refreshGroup, tasks, isTasksPending],
  );

  return (
    <TeamDataContext.Provider value={contextValues}>
      {children}
    </TeamDataContext.Provider>
  );
}

export function useTeamData() {
  const context = useContext(TeamDataContext);
  if (!context) throw new Error("Out of provider scope: TeamDataProvider");

  return context;
}
