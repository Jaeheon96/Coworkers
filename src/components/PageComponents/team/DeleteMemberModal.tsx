import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import deleteMember from "@/core/api/group/deleteMember";
import { useAuth } from "@/core/context/AuthProvider";
import useModalStore from "@/lib/hooks/stores/modalStore";
import modalNames from "@/lib/constants/modalNames";
import WarningModal from "./WarningModal";

interface Props {
  teamId: string;
  memberId: string;
}

export default function DeleteMemberModal({ teamId, memberId }: Props) {
  const modalName = modalNames.deleteMemberModalName;

  const router = useRouter();
  const { getMe } = useAuth();

  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate } = useMutation({
    mutationFn: () => deleteMember(teamId, memberId),
    onMutate: () => {
      closeModal(modalName);
    },
    onSuccess: () => {
      router.push("/");
      getMe();
    },
    onError: (e) => {
      alert("탈퇴중 오류 발생: 오류 정보는 콘솔 확인");
      console.error(e);
    },
  });

  const handleButtonClick = () => {
    mutate();
  };

  return (
    <WarningModal
      modalName={modalName}
      onClick={handleButtonClick}
      message="이 그룹에서 탈퇴하시겠습니까?"
    />
  );
}
