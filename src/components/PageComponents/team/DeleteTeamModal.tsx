import deleteTeam from "@/core/api/group/deleteTeam";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@/core/context/AuthProvider";
import WarningModal from "./WarningModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

export default function DeleteTeamModal({ isOpen, onClose, teamId }: Props) {
  const { push } = useRouter();
  const { getMe } = useAuth();

  const { mutate } = useMutation({
    mutationFn: () => deleteTeam(teamId),
    onSuccess: () => {
      getMe();
      onClose();
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
      isOpen={isOpen}
      onClose={onClose}
      onClick={handleDelete}
      message="정말 이 팀을 삭제하시겠습니까?"
    />
  );
}
