import { Task } from "@/core/dtos/tasks/tasks";
import { useState } from "react";
import { useRouter } from "next/router";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import TaskCardList from "@/components/PageComponents/tasks/TaskCardList";
import useModalStore from "@/lib/hooks/stores/modalStore";
import EditTaskModal from "@/components/PageComponents/tasks/EditTaskModal";
import SectionHeader from "@/components/PageComponents/tasks/SectionHeader";
import DeleteTaskModal from "@/components/PageComponents/tasks/DeleteTaskModal";
import { useAuth } from "@/core/context/AuthProvider";
import dynamic from "next/dynamic";

export default function Tasks() {
  const router = useRouter();
  const teamId = router.query.teamId as string;
  const { tasklist } = router.query;
  const numericTaskListId = parseInt(tasklist as string, 10);
  const { user } = useAuth(true);

  const [selectedTaskListId, setSelectedTaskListId] =
    useState<number>(numericTaskListId);
  const [selectedTaskItem, setSelectedTaskItem] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleTaskListClick = (taskListId: number) => {
    setSelectedTaskListId(taskListId);
  };

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const openTaskFormModal = () => {
    openModal("addTaskModal");
  };

  const handleTaskItemChange = (taskItem: Task) => {
    setSelectedTaskItem(taskItem);
  };

  const closeTaskDetail = () => {
    closeModal("taskDetail");
    router.push(`/${teamId}/tasks?tasklist=${selectedTaskListId}`);
  };

  const openEditTaskModal = (taskData: Task) => {
    handleTaskItemChange(taskData);
    openModal("editTaskModal");
    closeTaskDetail();
  };

  const openDeleteTaskModal = (taskData: Task) => {
    handleTaskItemChange(taskData);
    openModal("deleteTaskModal");
    closeTaskDetail();
  };

  const DynamicAddTaskModal = dynamic(
    () => import("@/components/PageComponents/tasks/AddTaskModal"),
  );

  const DynamicTaskLists = dynamic(
    () => import("@/components/PageComponents/tasks/TaskLists"),
  );

  const DynamicAnimatePresence = dynamic(() =>
    import("framer-motion").then((mod) => mod.AnimatePresence),
  );

  const DynamicTaskDetail = dynamic(
    () => import("@/components/PageComponents/tasks/TaskDetail"),
  );

  if (!user) return null;

  return (
    <div className="max-w-300 mx-auto h-auto px-6 pb-24 pt-10">
      <section>
        <SectionHeader
          teamId={teamId}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </section>
      <section>
        <DynamicTaskLists
          teamId={teamId}
          selectedTaskListId={selectedTaskListId}
          onTaskListClick={handleTaskListClick}
        />
        <TaskCardList
          teamId={teamId}
          selectedTaskListId={selectedTaskListId}
          selectedDate={selectedDate}
          onTaskItemChange={handleTaskItemChange}
        />
      </section>
      <FloatingButton
        className="fixed bottom-8 right-8"
        variant="solid"
        size="large"
        onClick={openTaskFormModal}
      >
        + 할 일 추가
      </FloatingButton>
      <DynamicAddTaskModal
        teamId={teamId}
        selectedTaskListId={selectedTaskListId}
      />
      {selectedTaskItem && (
        <EditTaskModal
          taskToEdit={selectedTaskItem}
          selectedTaskListId={selectedTaskListId}
        />
      )}
      {selectedTaskItem && <DeleteTaskModal taskItem={selectedTaskItem} />}
      <DynamicAnimatePresence>
        {selectedTaskItem && (
          <DynamicTaskDetail
            selectedDate={selectedDate}
            taskItem={selectedTaskItem}
            setSelectedTaskItem={setSelectedTaskItem}
            closeTaskDetail={closeTaskDetail}
            openEditTaskModal={() => openEditTaskModal(selectedTaskItem)}
            openDeleteTaskModal={() => openDeleteTaskModal(selectedTaskItem)}
          />
        )}
      </DynamicAnimatePresence>
    </div>
  );
}
