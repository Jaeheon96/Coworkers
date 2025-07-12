import Image from "next/image";
import AnimatedDropdown from "@/components/@shared/UI/AnimatedDropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import { useAuth } from "@/core/context/AuthProvider";
import useModalStore from "@/lib/hooks/stores/modalStore";
import modalNames from "@/lib/constants/modalNames";
import PatchTeamModal from "./PatchTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";
import DeleteMemberModal from "./DeleteMemberModal";

interface Props {
  teamId: string;
  teamName: string;
  teamImage: string;
  memberId: number;
  isAdmin: boolean;
  refreshGroup: () => void;
}

export default function TeamGear({
  teamId,
  teamName,
  teamImage,
  memberId,
  isAdmin,
  refreshGroup,
}: Props) {
  const { getMe } = useAuth();

  const { patchTeamModalName, deleteTeamModalName, deleteMemberModalName } =
    modalNames;

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const patchTeamForm = {
    teamId,
    defaultName: teamName,
    defaultImage: teamImage,
  };
  const patchTeamCallback = () => {
    refreshGroup();
    getMe();
    closeModal(patchTeamModalName);
  };

  return (
    <>
      <AnimatedDropdown
        trigger={
          <div className="relative h-6 w-6">
            <Image fill src="/icons/icon-gear.svg" alt="팀 설정" />
          </div>
        }
        menuClassName="flex flex-col text-text-primary font-regular text-text-md w-30 bg-background-secondary border border-solid border-border-primary right-0 top-8"
      >
        {isAdmin ? (
          <>
            <DropdownItem
              onClick={() => openModal(patchTeamModalName)}
              itemClassName="transition-colors duration-100 h-10 flex justify-center items-center hover:bg-background-tertiary first:rounded-t-xl"
            >
              수정하기
            </DropdownItem>
            <DropdownItem
              onClick={() => openModal(deleteTeamModalName)}
              itemClassName="transition-colors duration-100 h-10 flex justify-center items-center hover:bg-background-tertiary"
            >
              삭제하기
            </DropdownItem>
          </>
        ) : null}
        <DropdownItem
          onClick={() => openModal(deleteMemberModalName)}
          itemClassName="transition-colors duration-100 h-10 flex justify-center items-center hover:bg-background-tertiary first:rounded-t-xl last:rounded-b-xl"
        >
          탈퇴하기
        </DropdownItem>
      </AnimatedDropdown>
      <PatchTeamModal
        onClose={() => closeModal(patchTeamModalName)}
        submitCallback={patchTeamCallback}
        formValues={patchTeamForm}
      />
      <DeleteTeamModal teamId={teamId} />
      <DeleteMemberModal teamId={teamId} memberId={`${memberId}`} />
    </>
  );
}
