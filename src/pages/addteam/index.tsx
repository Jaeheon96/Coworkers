import TeamSubmitForm from "@/components/PageComponents/team/TeamSubmitForm";
import { useAuth } from "@/core/context/AuthProvider";
import Head from "next/head";

export default function Addteam() {
  const { user, getMe } = useAuth(true);

  if (!user) return null;

  return (
    <div className="mx-auto mt-52 max-w-[30.75rem] px-4">
      <Head>
        <title>팀 만들기</title>
      </Head>
      <TeamSubmitForm submitCallback={getMe} />
    </div>
  );
}
