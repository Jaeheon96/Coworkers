import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteTaskList from "@/core/api/taskList/deleteTaskList";
import useModalStore from "@/lib/hooks/stores/modalStore";
import WarningModal from "./WarningModal";

interface Props {
  teamId: string;
  taskListId: string;
  modalName?: string;
}

export default function DeleteTaskListModal({
  teamId,
  taskListId,
  modalName = `${taskListId}TaskListDeleteModal`,
}: Props) {
  const queryClient = useQueryClient();

  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate } = useMutation({
    mutationFn: () => deleteTaskList(teamId, taskListId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", teamId] });
      closeModal(modalName);
    },
    onError: (error) => {
      alert("삭제중 에러 발생: 에러 정보는 콘솔 확인");
      console.error(error);
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return <WarningModal modalName={modalName} onClick={handleDelete} />;
}
