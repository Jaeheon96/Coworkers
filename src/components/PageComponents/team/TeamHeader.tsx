import Image from "next/image";
import { useTeamData } from "@/core/context/TeamDataProvider";
import TeamGear from "./TeamGear";
import thumbnailSrc from "../../../../public/images/image-thumbnailTeam.png";

export default function TeamHeader() {
  const { group } = useTeamData();

  return (
    <div className="relative mb-6 flex h-16 w-full cursor-default justify-between rounded-xl border border-solid border-border-primary bg-background-secondary px-6 py-5 text-text-xl font-bold text-text-inverse">
      <p className="max-w-[85%] truncate">{group?.name}</p>
      <TeamGear />
      <Image
        src={thumbnailSrc}
        alt="팀"
        style={{
          position: "absolute",
          right: "5rem",
          top: 0,
          objectFit: "cover",
        }}
        quality={50}
        priority
      />
    </div>
  );
}
