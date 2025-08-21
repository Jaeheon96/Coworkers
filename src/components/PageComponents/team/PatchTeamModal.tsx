import Modal from "@/components/@shared/UI/Modal/Modal";
import useModalStore from "@/lib/hooks/stores/modalStore";
import modalNames from "@/lib/constants/modalNames";
import TeamSubmitForm from "./TeamSubmitForm";

interface Props {
  submitCallback: () => void;
  formValues: {
    teamId: string;
    defaultName: string;
    defaultImage?: string;
  };
}

export default function PatchTeamModal({ submitCallback, formValues }: Props) {
  const { patchTeamModalName } = modalNames;
  const isOpen = useModalStore((state) => state.modals[patchTeamModalName]);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal(patchTeamModalName)}>
      <div className="max-w-123 p-6 max-sm:p-0">
        <TeamSubmitForm submitCallback={submitCallback} {...formValues} />
      </div>
    </Modal>
  );
}
