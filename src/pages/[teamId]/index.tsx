import { useRouter } from "next/router";
import Head from "next/head";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import getTeamData from "@/core/api/group/getTeamData";
import { useAuth } from "@/core/context/AuthProvider";
import { TeamDataPrvider } from "@/core/context/TeamDataProvider";
import { COWORKERS_TITLE } from "@/lib/constants/sharedConstants";
import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import TeamInterface from "@/components/PageComponents/team/TeamInterface";

export default function Team() {
  const { user } = useAuth(true);

  const { query, isReady } = useRouter();
  const teamId = query.teamId as string;

  const {
    data: group,
    error: groupError,
    refetch: refetchGroup,
  } = useQuery({
    queryKey: ["group", teamId],
    queryFn: () => getTeamData(teamId),
    staleTime: 1000 * 60,
    throwOnError: false,
    retry: 1,
    enabled: isReady && !!user,
  });

  if (groupError) {
    const e = groupError as AxiosError;
    if (e.status === 404) {
      return (
        <InvalidRequest>
          <p>404 에러: 요청하신 팀 정보를 찾을 수 없습니다.</p>
        </InvalidRequest>
      );
    }

    return (
      <InvalidRequest
        retry={() => {
          refetchGroup();
        }}
      >
        <p>팀 데이터를 불러오던 중 오류가 발생했습니다.</p>
      </InvalidRequest>
    );
  }

  return (
    <>
      <Head>
        <title>{`${COWORKERS_TITLE}${group ? ` - ${group.name}` : ""}`}</title>
        <meta
          name="description"
          content={`코워커스${group ? ` ${group.name}` : null}`}
        />
      </Head>
      <TeamDataPrvider>
        <TeamInterface />
      </TeamDataPrvider>
    </>
  );
}
