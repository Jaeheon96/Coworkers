import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import getInvitationCode from "@/core/api/group/getInvitationCode";
import useTimeoutToggle from "@/lib/hooks/useTimeoutToggle";
import { GroupResponse } from "@/core/dtos/group/group";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import MailInviteModal from "./MailInviteModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  team: GroupResponse;
}

export default function TeamLinkModal({ isOpen, onClose, team }: Props) {
  const [isMailInvitationOpen, setIsMailInvitationOpen] = useState(false);

  const teamId = `${team.id}`;

  const mutationFn = async () => {
    const link = await getInvitationCode(teamId);
    navigator.clipboard.writeText(link);
  };

  const { isOn: isCopied, timeoutToggle: copyNoticeTimeout } = useTimeoutToggle(
    false,
    800,
  );

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: copyNoticeTimeout,
    onError: (error) => {
      alert("초대 링크 불러오던중 에러 발생: 에러 정보는 콘솔에서 확인");
      console.error(error);
    },
  });

  const buttonContent = () => {
    if (isCopied)
      return (
        <div className="flex w-full justify-center">
          <div className="relative h-6 w-6">
            <Image fill src="icons/check.svg" alt="복사되었습니다." />
          </div>
        </div>
      );
    if (isPending) return "링크 불러오는중...";
    return "초대 코드 복사하기";
  };

  const handleButtonClick = () => {
    if (isPending || isCopied) return;
    mutate();
  };

  useEffect(() => {
    if (isOpen) setIsMailInvitationOpen(false);
  }, [isOpen]);

  if (isMailInvitationOpen)
    return <MailInviteModal isOpen={isOpen} onClose={onClose} team={team} />;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <div className="flex w-[22rem] flex-col gap-10 px-9">
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-center text-text-lg font-medium text-text-primary">
            멤버 초대
          </h3>
          <p className="text-center text-text-md font-medium text-text-secondary">
            팀에 새로운 멤버를 초대합니다.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="solid"
            size="large"
            onClick={handleButtonClick}
          >
            {buttonContent()}
          </Button>
          <Button
            type="button"
            variant="solid"
            size="large"
            onClick={() => {
              setIsMailInvitationOpen(true);
            }}
          >
            이메일로 초대 보내기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
