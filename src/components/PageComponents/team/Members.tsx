import { Member } from "@/core/types/member";
import Image from "next/image";
import MemberMenu from "./MemberMenu";

interface Props {
  members: Member[];
}

export default function Members({ members }: Props) {
  return (
    <div className="[&&]:grid [&&]:grid-cols-3 [&&]:gap-6 [&&]:md:grid-cols-2 [&&]:sm:grid-cols-1 [&&]:sm:gap-4">
      {members.map((member) => (
        <div
          className="h-18.5 cursor-default rounded-2xl bg-background-secondary px-6 py-5"
          key={member.userId}
        >
          <div className="flex h-full w-full items-center justify-between">
            <div className="flex h-full items-center gap-3">
              <div className="relative h-8 w-8">
                <Image
                  fill
                  src={
                    member.userImage
                      ? member.userImage
                      : "/icons/icon-default_profile.svg"
                  }
                  className="rounded-full border border-solid border-border-primary"
                  alt="멤버 이미지"
                />
              </div>
              <div className="flex h-full flex-col justify-between">
                <p className="text-text-md font-medium text-text-primary">
                  {member.userName}
                </p>
                <p className="text-text-xs font-regular text-text-secondary">
                  {member.userEmail}
                </p>
              </div>
            </div>
            <MemberMenu
              image={member.userImage}
              name={member.userName}
              email={member.userEmail}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
