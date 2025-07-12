import Modal from "@/components/@shared/UI/Modal/Modal";
import useModalStore from "@/lib/hooks/stores/modalStore";
import modalNames from "@/lib/constants/modalNames";
import TeamSubmitForm from "./TeamSubmitForm";

interface Props {
  onClose: () => void;
  submitCallback: () => void;
  formValues: {
    teamId: string;
    defaultName: string;
    defaultImage?: string;
  };
}

export default function PatchTeamModal({
  onClose,
  submitCallback,
  formValues,
}: Props) {
  const { patchTeamModalName } = modalNames;
  const isOpen = useModalStore((state) => state.modals[patchTeamModalName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-123 p-6 max-sm:p-0">
        <TeamSubmitForm submitCallback={submitCallback} {...formValues} />
      </div>
    </Modal>
  );
}
