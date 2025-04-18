import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import useModalStore from "@/lib/hooks/stores/modalStore";
import DeleteTaskListModal from "./DeleteTaskListModal";

interface Props {
  teamId: string;
  taskListId: string;
  name: string;
  index: number;
  length: number;
}

export default function TaskListMenu({
  teamId,
  taskListId,
  name,
  index,
  length,
}: Props) {
  const patchModalName = `${taskListId}taskListPatchModal`;
  const deleteModalName = `${taskListId}taskListDeleteModal`;

  const isAtBottom = index > length - 3;

  const isPatchModalOpen = useModalStore(
    (state) => state.modals[patchModalName],
  );
  const isDeleteModalOpen = useModalStore(
    (state) => state.modals[deleteModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const queryClient = useQueryClient();
  const refreshGroup = () => {
    queryClient.invalidateQueries({ queryKey: ["group", teamId] });
  };

  const menuClassName = `flex flex-col text-text-primary font-regular text-text-md w-30 bg-background-secondary border border-solid border-border-primary ${isAtBottom ? "right-0 bottom-6" : "right-0 top-6"}`;

  return (
    <>
      <Dropdown
        trigger={
          <div className="flex h-10 w-10 items-center justify-end pr-2">
            <div className="relative h-4 w-4">
              <Image fill src="/icons/icon-kebab.svg" alt="메뉴" />
            </div>
          </div>
        }
        menuClassName={menuClassName}
      >
        <DropdownItem
          onClick={() => openModal(patchModalName)}
          itemClassName="h-10 flex justify-center items-center hover:bg-background-tertiary rounded-t-xl"
        >
          수정하기
        </DropdownItem>
        <DropdownItem
          onClick={() => openModal(deleteModalName)}
          itemClassName="h-10 flex justify-center items-center hover:bg-background-tertiary rounded-b-xl"
        >
          삭제하기
        </DropdownItem>
      </Dropdown>
      <AddTaskListModal
        isOpen={isPatchModalOpen}
        onClose={() => closeModal(patchModalName)}
        teamId={teamId}
        submitCallback={refreshGroup}
        defaultPatchForm={{
          taskListId,
          name,
        }}
      />
      <DeleteTaskListModal
        isOpen={isDeleteModalOpen}
        onClose={() => closeModal(deleteModalName)}
        teamId={teamId}
        taskListId={taskListId}
      />
    </>
  );
}
