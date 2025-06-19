import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import deleteTeam from "@/core/api/group/deleteTeam";
import { useAuth } from "@/core/context/AuthProvider";
import useModalStore from "@/lib/hooks/stores/modalStore";
import WarningModal from "./WarningModal";

interface Props {
  teamId: string;
}

export default function DeleteTeamModal({ teamId }: Props) {
  const modalName = "deleteTeamModal";

  const { push } = useRouter();
  const { getMe } = useAuth();

  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate } = useMutation({
    mutationFn: () => deleteTeam(teamId),
    onSuccess: () => {
      getMe();
      closeModal(modalName);
      push("/");
    },
    onError: (error) => {
      alert("삭제중 에러 발생: 에러 정보는 콘솔 확인");
      console.error(error);
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <WarningModal
      modalName={modalName}
      onClick={handleDelete}
      message="정말 이 팀을 삭제하시겠습니까?"
    />
  );
}
