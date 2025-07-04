import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import addTaskList from "@/core/api/taskList/addTaskList";
import patchTaskList from "@/core/api/taskList/patchTaskList";
import useModalStore from "@/lib/hooks/stores/modalStore";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal/Modal";

interface Props {
  teamId: string;
  modalName?: string;
  submitCallback?: () => void;
  defaultPatchForm?: {
    taskListId: string;
    name: string;
  };
}

export default function AddTaskListModal({
  teamId,
  modalName = "addTaskListModal",
  submitCallback = () => {},
  defaultPatchForm,
}: Props) {
  const [taskListName, setTaskListName] = useState(
    defaultPatchForm?.name ?? "",
  );

  const isOpen = useModalStore((state) => state.modals[modalName]);
  const onClose = useModalStore((state) => state.closeModal);

  const mutationFn = defaultPatchForm
    ? () =>
        patchTaskList(teamId, defaultPatchForm.taskListId, {
          name: taskListName,
        })
    : () => addTaskList(teamId, { name: taskListName });

  const taskListMutation = useMutation({
    mutationFn,
    onSuccess: () => {
      submitCallback();
      onClose(modalName);
    },
    onError: (error) => {
      alert("AddTaskListModal 컴포넌트에서 오류 발생: 콘솔 확인");
      console.error(error);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskListName(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    taskListMutation.mutate();
  };

  useEffect(() => {
    if (isOpen) setTaskListName(defaultPatchForm?.name ?? "");
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose(modalName);
      }}
      isCloseButton
    >
      <form className="flex w-88 flex-col gap-6 px-9" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-center text-text-lg font-medium text-text-primary">
            할 일 목록
          </h3>
          <Input
            placeholder="목록 명을 입력해주세요."
            value={taskListName}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <Button type="submit" variant="solid" size="large">
          {defaultPatchForm ? "수정하기" : "만들기"}
        </Button>
      </form>
    </Modal>
  );
}
