import { AxiosError } from "axios";
import { useAuth } from "@/core/context/AuthProvider";
import { TeamDataPrvider, useTeamData } from "@/core/context/TeamDataProvider";
import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import TeamInterface from "@/components/PageComponents/team/TeamInterface";
import TeamPageHead from "@/components/PageComponents/team/TeamPageHead";

export default function Team() {
  useAuth(true);

  const { groupError, refreshGroup } = useTeamData();

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
          refreshGroup();
        }}
      >
        <p>팀 데이터를 불러오던 중 오류가 발생했습니다.</p>
      </InvalidRequest>
    );
  }

  return (
    <TeamDataPrvider>
      <TeamPageHead />
      <TeamInterface />
    </TeamDataPrvider>
  );
}
