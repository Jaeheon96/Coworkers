import { GroupTask } from "@/core/dtos/group/group";
import Link from "next/link";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchTaskListOrder from "@/core/api/taskList/patchTaskListOrder";
import TaskListMenu from "./TaskListMenu";

interface Props {
  tasks: GroupTask[];
  teamId: string;
  isPending?: boolean;
}

interface PatchOrderMutationForm {
  taskListId: string;
  newIndex: number;
}

export default function TaskLists({ tasks, teamId, isPending = false }: Props) {
  const indexColors = [
    "bg-point-purple",
    "bg-point-blue",
    "bg-point-cyan",
    "bg-point-pink",
    "bg-point-rose",
    "bg-point-orange",
    "bg-point-yellow",
  ];

  const [visibleTasks, setVisibleTasks] = useState(tasks);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ taskListId, newIndex }: PatchOrderMutationForm) => {
      await patchTaskListOrder(teamId, taskListId, { displayIndex: newIndex });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["group", teamId] });
    },
    onError: (e) => {
      console.error(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["group", teamId] });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.index === source.index) return;

    const newTasks = Array.from(visibleTasks);
    const movedTask = visibleTasks.find((task) => `${task.id}` === draggableId);
    if (!movedTask) return;

    newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, movedTask);

    setVisibleTasks(newTasks);

    mutate({ taskListId: draggableId, newIndex: destination.index });
  };

  useEffect(() => {
    setVisibleTasks(tasks);
  }, [tasks]);

  if (isPending)
    return (
      <div className="flex flex-col">
        <div className="mb-4 h-10 animate-pulse rounded-xl bg-background-secondary" />
        <div className="mb-4 h-10 animate-pulse rounded-xl bg-background-secondary" />
        <div className="mb-4 h-10 animate-pulse rounded-xl bg-background-secondary" />
        <div className="mb-4 h-10 animate-pulse rounded-xl bg-background-secondary" />
        <div className="mb-4 h-10 animate-pulse rounded-xl bg-background-secondary" />
        <div className="mb-4 h-10 animate-pulse rounded-xl bg-background-secondary" />
        <div className="mb-4 h-10 animate-pulse rounded-xl bg-background-secondary" />
      </div>
    );

  if (tasks.length === 0)
    return (
      <div className="flex w-full items-center justify-center py-16 text-text-md font-medium text-text-default">
        아직 할 일 목록이 없습니다.
      </div>
    );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="card">
        {(droppableProvided) => (
          <div
            className="styled-scrollbar flex max-h-[24.5rem] flex-col overflow-y-auto max-sm:[&::-webkit-scrollbar]:w-1"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {visibleTasks.map((task, index) => {
              const indexClassName = `h-full w-3 absolute left-0 rounded-l-xl ${indexColors[task.id % 7]}`;

              return (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided) => (
                    <div
                      className="relative mb-4 flex h-10 shrink-0 cursor-grab items-center justify-between rounded-xl bg-background-secondary pl-3 text-text-md font-medium text-text-primary"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <div className={indexClassName} />
                      <Link
                        href={`${teamId}/tasks?tasklist=${task.id}`}
                        className="flex h-full items-center px-3 hover:underline"
                        prefetch={false}
                      >
                        {task.name}
                      </Link>
                      <TaskListMenu
                        teamId={teamId}
                        taskListId={`${task.id}`}
                        name={task.name}
                        index={index}
                        length={visibleTasks.length}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
