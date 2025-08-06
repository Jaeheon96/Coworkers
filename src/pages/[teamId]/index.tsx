import { useAuth } from "@/core/context/AuthProvider";
import { TeamDataPrvider } from "@/core/context/TeamDataProvider";
import TeamInterface from "@/components/PageComponents/team/TeamInterface";
import TeamPageHead from "@/components/PageComponents/team/TeamPageHead";

export default function Team() {
  useAuth(true);

  return (
    <TeamDataPrvider>
      <TeamPageHead />
      <TeamInterface />
    </TeamDataPrvider>
  );
}
