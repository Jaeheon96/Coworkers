import Head from "next/head";
import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import Chat from "@/components/PageComponents/team/Chat";
import Members from "@/components/PageComponents/team/Members";
import SectionHeader from "@/components/PageComponents/team/SectionHeader";
import TeamGear from "@/components/PageComponents/team/TeamGear";
import TeamLinkModal from "@/components/PageComponents/team/TeamLinkModal";
import getTasks from "@/core/api/group/getTasks";
import getTeamData from "@/core/api/group/getTeamData";
import { useAuth } from "@/core/context/AuthProvider";
import { Roles } from "@/core/types/member";
import { COWORKERS_TITLE } from "@/lib/constants/sharedConstants";
import useModalStore from "@/lib/hooks/stores/modalStore";
import refineTasks from "@/lib/utils/refineTasks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import TaskListSkeleton from "@/components/PageComponents/team/TaskListSkeleton";
import { AxiosError } from "axios";
import thumbnailSrc from "../../../public/images/image-thumbnailTeam.png";

export default function Team() {
  const { user } = useAuth(true);

  const addTaskListModalName = "addTaskListModal";
  const teamLinkModalName = "teamLinkModal";

  const isTeamLinkModalOpen = useModalStore(
    (state) => state.modals[teamLinkModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { query, isReady } = useRouter();
  const teamId = query.teamId as string;
  const queryClient = useQueryClient();

  const {
    data: group,
    error: groupError,
    refetch: refetchGroup,
  } = useQuery({
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

  const { data: tasks, isPending: isTasksPending } = useQuery({
    queryKey: ["tasks", teamId],
    queryFn: () => getTasks(teamId),
    staleTime: 1000 * 60,
    enabled: !!group,
  });

  const chatData = tasks ? refineTasks(tasks) : "";
  const isAdmin =
    user?.id === group?.members.find((e) => e.role === Roles.ADMIN)?.userId;

  const DynamicTaskLists = dynamic(
    () => import("@/components/PageComponents/team/TaskLists"),
    {
      loading: TaskListSkeleton,
      ssr: false,
    },
  );

  if (groupError) {
    const e = groupError as AxiosError;
    if (e.status === 404) {
      return (
        <InvalidRequest>
          <p>404 에러: 요청하신 팀 정보를 찾을 수 없습니다.</p>
        </InvalidRequest>
      );
    }

    return (
      <InvalidRequest
        retry={() => {
          refetchGroup();
        }}
      >
        <p>팀 데이터를 불러오던 중 오류가 발생했습니다.</p>
      </InvalidRequest>
    );
  }

  return (
    <>
      <Head>
        <title>{`${COWORKERS_TITLE}${group ? ` - ${group.name}` : ""}`}</title>
        <meta
          name="description"
          content={`코워커스${group ? ` ${group.name}` : null}`}
        />
      </Head>
      <main className="mx-auto mt-21 max-w-300 [&&]:max-md:px-6 [&&]:max-sm:px-4">
        <div className="relative mb-6 flex h-16 w-full cursor-default justify-between rounded-xl border border-solid border-border-primary bg-background-secondary px-6 py-5 text-text-xl font-bold text-text-inverse">
          <p className="max-w-[85%] truncate">{group?.name}</p>
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
            length={
              isTasksPending ? undefined : `${group?.taskLists.length ?? 0}개`
            }
            addText="+ 새로운 목록 추가하기"
            onAddClick={() => openModal(addTaskListModalName)}
          />
          <DynamicTaskLists
            tasks={group?.taskLists ?? []}
            teamId={teamId}
            isPending={isTasksPending}
          />
        </section>
        <section className="mb-16 flex flex-col gap-4">
          <SectionHeader title="어시스턴트" />
          <Chat dataContext={chatData} isTasksPending={isTasksPending} />
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
      <AddTaskListModal teamId={teamId} submitCallback={refreshGroup} />
      <TeamLinkModal
        isOpen={isTeamLinkModalOpen}
        onClose={() => closeModal(teamLinkModalName)}
        team={group}
      />
    </>
  );
}
