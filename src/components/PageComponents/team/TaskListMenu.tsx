import Image from "next/image";
import AnimatedDropdown from "@/components/@shared/UI/AnimatedDropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import useModalStore from "@/lib/hooks/stores/modalStore";

interface Props {
  taskListId: string;
  index: number;
  length: number;
}

export default function TaskListMenu({ taskListId, index, length }: Props) {
  const patchModalName = `${taskListId}TaskListPatchModal`;
  const deleteModalName = `${taskListId}TaskListDeleteModal`;

  const isAtBottom = index > length - 3 && length > 5;

  const openModal = useModalStore((state) => state.openModal);

  const menuClassName = `flex flex-col text-text-primary font-regular text-text-md w-30 bg-background-secondary border border-solid border-border-primary ${isAtBottom ? "right-0 bottom-6" : "right-0 top-6"}`;

  return (
    <AnimatedDropdown
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
        itemClassName="transition-colors duration-100 h-10 flex justify-center items-center hover:bg-background-tertiary rounded-t-xl"
      >
        수정하기
      </DropdownItem>
      <DropdownItem
        onClick={() => openModal(deleteModalName)}
        itemClassName="transition-colors duration-100 h-10 flex justify-center items-center hover:bg-background-tertiary rounded-b-xl"
      >
        삭제하기
      </DropdownItem>
    </AnimatedDropdown>
  );
}
