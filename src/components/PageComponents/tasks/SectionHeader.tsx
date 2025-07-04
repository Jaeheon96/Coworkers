import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import useModalStore from "@/lib/hooks/stores/modalStore";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

export interface SectionHeaderProps {
  teamId: string;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function SectionHeader({
  teamId,
  selectedDate,
  setSelectedDate,
}: SectionHeaderProps) {
  const queryClient = useQueryClient();
  const refreshGroup = () => {
    queryClient.invalidateQueries({ queryKey: ["group", teamId] });
  };

  const addTaskListModalName = "taskPageAddTaskListModal";
  const openModal = useModalStore((state) => state.openModal);

  const DynamicTaskDate = dynamic(() => import("./TaskDate"));

  return (
    <>
      <h1 className="text-text-xl font-bold text-text-primary">할 일</h1>
      <div className="my-6 flex items-center justify-between">
        <DynamicTaskDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <p
          className="cursor-pointer text-text-md font-regular text-brand-primary"
          onClick={() => {
            openModal(addTaskListModalName);
          }}
        >
          +새로운 목록 추가하기
        </p>
      </div>
      <AddTaskListModal
        teamId={teamId}
        modalName={addTaskListModalName}
        submitCallback={refreshGroup}
      />
    </>
  );
}
