import { useTeamData } from "@/core/context/TeamDataProvider";
import { useAuth } from "@/core/context/AuthProvider";
import useModalStore from "@/lib/hooks/stores/modalStore";
import modalNames from "@/lib/constants/modalNames";
import Modal from "@/components/@shared/UI/Modal/Modal";
import TeamSubmitForm from "./TeamSubmitForm";

export default function PatchTeamModal() {
  const { getMe } = useAuth();
  const { teamId, group, refreshGroup } = useTeamData();

  const { patchTeamModalName } = modalNames;
  const isOpen = useModalStore((state) => state.modals[patchTeamModalName]);
  const closeModal = useModalStore((state) => state.closeModal);

  const patchTeamForm = {
    teamId,
    defaultName: group?.name ?? "",
    defaultImage: group?.image ?? "",
  };

  const patchTeamCallback = () => {
    refreshGroup();
    getMe();
    closeModal(patchTeamModalName);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal(patchTeamModalName)}>
      <div className="max-w-123 p-6 max-sm:p-0">
        <TeamSubmitForm submitCallback={patchTeamCallback} {...patchTeamForm} />
      </div>
    </Modal>
  );
}
