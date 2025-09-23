import Head from "next/head";
import { useTeamData } from "@/core/context/TeamDataProvider";
import { COWORKERS_TITLE } from "@/lib/constants/sharedConstants";

export default function TeamPageHead() {
  const { group } = useTeamData();

  return (
    <Head>
      <title>{`${COWORKERS_TITLE}${group ? ` - ${group.name}` : ""}`}</title>
      <meta
        name="description"
        content={`코워커스${group ? ` ${group.name}` : null}`}
      />
    </Head>
  );
}
