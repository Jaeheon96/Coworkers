import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import Chat from "@/components/PageComponents/team/Chat";
import Members from "@/components/PageComponents/team/Members";
import SectionHeader from "@/components/PageComponents/team/SectionHeader";
import TaskLists from "@/components/PageComponents/team/TaskLists";
import TeamGear from "@/components/PageComponents/team/TeamGear";
import TeamLinkModal from "@/components/PageComponents/team/TeamLinkModal";
import getTasks from "@/core/api/group/getTasks";
import getTeamData from "@/core/api/group/getTeamData";
import { useAuth } from "@/core/context/AuthProvider";
import { Roles } from "@/core/types/member";
import useModalStore from "@/lib/hooks/stores/modalStore";
import refineTasks from "@/lib/utils/refineTasks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import thumbnailSrc from "../../../public/images/image-thumbnailTeam.png";

export default function Team() {
  const { user } = useAuth(true);

  const addTaskListModalName = "addTaskListModal";
  const teamLinkModalName = "teamLinkModal";

  const isAddTaskListModalOpen = useModalStore(
    (state) => state.modals[addTaskListModalName],
  );
  const isTeamLinkModalOpen = useModalStore(
    (state) => state.modals[teamLinkModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { query, isReady, replace } = useRouter();
  const teamId = query.teamId as string;
  const queryClient = useQueryClient();

  const { data: group, isPending } = useQuery({
    queryKey: ["group", teamId],
    queryFn: () => getTeamData(teamId),
    staleTime: 1000 * 60,
    throwOnError: false,
    retry: 1,
    enabled: isReady && !!user,
  });

  const refreshGroup = () => {
    queryClient.invalidateQueries({ queryKey: ["group", teamId] });
  };

  const { data: tasks } = useQuery({
    queryKey: ["tasks", teamId],
    queryFn: () => getTasks(teamId),
    staleTime: 1000 * 60,
    enabled: !!group,
  });

  const chatData = tasks ? refineTasks(tasks) : "";
  const isAdmin =
    user?.id === group?.members.find((e) => e.role === Roles.ADMIN)?.userId;

  useEffect(() => {
    if (!isPending && !group) replace("/wrongteam");
  }, [isPending, group]);

  if (!group) return null;

  return (
    <>
      <main className="mx-auto mt-[5.25rem] max-w-[75rem] [&&]:max-md:px-6 [&&]:max-sm:px-4">
        <div className="relative mb-6 flex h-16 w-full cursor-default justify-between rounded-xl border border-solid border-border-primary bg-background-secondary px-6 py-5 text-text-xl font-bold text-text-inverse">
          <p>{group?.name}</p>
          <TeamGear
            teamId={teamId}
            teamName={group?.name ?? ""}
            teamImage={group?.image ?? ""}
            memberId={user?.id ?? 0}
            isAdmin={isAdmin}
            refreshGroup={refreshGroup}
          />
          <Image
            src={thumbnailSrc}
            alt="팀"
            style={{
              position: "absolute",
              right: "5rem",
              top: 0,
              objectFit: "cover",
            }}
            quality={50}
            priority
          />
        </div>
        <section className="mb-12 flex flex-col gap-4">
          <SectionHeader
            title="할 일 목록"
            length={`${group?.taskLists.length ?? 0}개`}
            addText="+ 새로운 목록 추가하기"
            onAddClick={() => openModal(addTaskListModalName)}
          />
          {group?.taskLists.length ? (
            <TaskLists tasks={group.taskLists} teamId={teamId} />
          ) : (
            <div className="flex w-full items-center justify-center py-16 text-text-md font-medium text-text-default">
              아직 할 일 목록이 없습니다.
            </div>
          )}
        </section>
        <section className="mb-16 flex flex-col gap-4">
          <SectionHeader title="어시스턴트" />
          <Chat dataContext={chatData} />
        </section>
        <section className="mb-16 flex flex-col gap-4">
          <SectionHeader
            title="멤버"
            length={`${group?.members.length ?? 0}명`}
            addText="+ 새로운 멤버 초대하기"
            onAddClick={() => openModal(teamLinkModalName)}
          />
          <Members members={group?.members ?? []} />
        </section>
      </main>
      <AddTaskListModal
        isOpen={isAddTaskListModalOpen}
        onClose={() => closeModal(addTaskListModalName)}
        teamId={teamId}
        submitCallback={refreshGroup}
      />
      <TeamLinkModal
        isOpen={isTeamLinkModalOpen}
        onClose={() => closeModal(teamLinkModalName)}
        team={group}
      />
    </>
  );
}
