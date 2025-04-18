import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import React, { useMemo, useState, useEffect } from "react";
import useModalStore from "@/lib/hooks/stores/modalStore";
import Modal from "@/components/@shared/UI/Modal/Modal";
import Button from "@/components/@shared/UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import editTask from "@/core/api/tasks/editTask";
import { toast } from "react-toastify";
import { EditTaskForm, Task } from "@/core/dtos/tasks/tasks";
import handleTextArea from "@/lib/utils/handleTextArea";

interface EditTaskModalProps {
  taskToEdit: Task;
  selectedTaskListId: number;
}

export default function EditTaskModal({
  taskToEdit,
  selectedTaskListId,
}: EditTaskModalProps) {
  const initialTaskData = useMemo(
    () => ({
      name: taskToEdit.name || "",
      description: taskToEdit.description || "",
    }),
    [taskToEdit],
  );
  const [taskData, setTaskData] = useState<EditTaskForm>(initialTaskData);

  useEffect(() => {
    setTaskData(initialTaskData);
  }, [initialTaskData]);

  const queryClient = useQueryClient();

  const modalName = "editTaskModal";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const closeEditModal = () => {
    closeModal("editTaskModal");
    setTaskData(initialTaskData);
  };

  const editMutation = useMutation({
    mutationFn: (editTaskForm: EditTaskForm) =>
      editTask({ taskId: taskToEdit.id }, editTaskForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", selectedTaskListId],
      });
      closeEditModal();
    },
    onError: (error) => {
      console.error("Error editing task:", error);
    },
  });

  const isFormValid =
    taskData.name?.trim() !== "" && (taskData.name?.length ?? 0) <= 30;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const dataToSubmit = {
        name: taskData.name,
        description: taskData.description,
      };
      editMutation.mutate(dataToSubmit, {
        onSuccess: () => {
          toast.success("할 일을 수정했습니다!");
        },
        onError: () => {
          toast.error("에러가 발생했습니다. 잠시 후 다시 시도해주세요");
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => closeEditModal()} isCloseButton>
      <div className="h-auto w-96 px-6 py-8">
        <h2 className="text-center text-text-lg text-text-primary">
          할 일 수정하기
        </h2>
        <p className="mb-6 mt-4 text-center text-text-md text-text-default">
          할 일은 실제로 행동 가능한 작업 중심으로 <br />
          작성해주시면 좋습니다.
        </p>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleFormSubmit}
        >
          <InputLabel className="text-md text-text-primary" label="할 일 제목">
            <Input
              name="name"
              type="text"
              value={taskData.name}
              onChange={handleInputChange}
              className="w-84"
              placeholder="할 일 제목을 입력해주세요. 30자 이하"
              isValid={(taskData.name?.length ?? 0) <= 30}
              errorMessage="30자 이하로 입력해주세요"
            />
          </InputLabel>
          <InputLabel className="text-md text-text-primary" label="할 일 메모">
            <textarea
              name="description"
              onInput={handleTextArea}
              onChange={handleInputChange}
              value={taskData.description}
              className="h-auto w-full resize-none overflow-hidden rounded-xl border-border-primary bg-background-secondary p-4 placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none focus:ring-0"
              placeholder="메모를 입력해주세요."
            />
          </InputLabel>
          <Button
            variant="solid"
            size="large"
            onClick={handleFormSubmit}
            disabled={!isFormValid || editMutation.isPending}
          >
            수정하기
          </Button>
        </form>
      </div>
    </Modal>
  );
}
