import dynamic from "next/dynamic";
import { AxiosError } from "axios";
import { useTeamData } from "@/core/context/TeamDataProvider";
import useModalStore from "@/lib/hooks/stores/modalStore";
import modalNames from "@/lib/constants/modalNames";
import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import SectionHeader from "./SectionHeader";
import TaskListSkeleton from "./TaskListSkeleton";
import Chat from "./Chat";
import Members from "./Members";
import TeamLinkModal from "./TeamLinkModal";
import TeamHeader from "./TeamHeader";

export default function TeamInterface() {
  const { teamId, group, groupError, refreshGroup, isTasksPending } =
    useTeamData();

  const openModal = useModalStore((state) => state.openModal);
  const { addTaskListModalName, teamLinkModalName } = modalNames;

  const TaskLists = dynamic(
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
          refreshGroup();
        }}
      >
        <p>팀 데이터를 불러오던 중 오류가 발생했습니다.</p>
      </InvalidRequest>
    );
  }

  return (
    <>
      <main className="mx-auto mt-21 max-w-300 [&&]:max-md:px-6 [&&]:max-sm:px-4">
        <TeamHeader />
        <section className="mb-12 flex flex-col gap-4">
          <SectionHeader
            title="할 일 목록"
            length={
              isTasksPending ? undefined : `${group?.taskLists.length ?? 0}개`
            }
            addText="+ 새로운 목록 추가하기"
            onAddClick={() => openModal(addTaskListModalName)}
          />
          <TaskLists />
        </section>
        <section className="mb-16 flex flex-col gap-4">
          <SectionHeader title="어시스턴트" />
          <Chat />
        </section>
        <section className="mb-16 flex flex-col gap-4">
          <SectionHeader
            title="멤버"
            length={`${group?.members.length ?? 0}명`}
            addText="+ 새로운 멤버 초대하기"
            onAddClick={() => openModal(teamLinkModalName)}
          />
          <Members />
        </section>
      </main>
      <AddTaskListModal teamId={teamId} submitCallback={refreshGroup} />
      <TeamLinkModal />
    </>
  );
}
