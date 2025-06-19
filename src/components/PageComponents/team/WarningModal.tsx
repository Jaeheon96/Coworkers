import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import useModalStore from "@/lib/hooks/stores/modalStore";
import Image from "next/image";
import { MouseEvent } from "react";

interface Props {
  modalName?: string;
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
  message?: string;
}

export default function WarningModal({
  modalName = "warningModal",
  onClick,
  message = "삭제하시겠습니까?",
}: Props) {
  const isOpen = useModalStore((state) => state.modals[modalName]);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal(modalName);
      }}
    >
      <div className="flex w-80 flex-col items-center gap-6">
        <div className="relative h-8 w-8">
          <Image fill src="/icons/icon-alert.svg" alt="주의" />
        </div>
        <p className="font-medium">{message}</p>
        <div className="flex w-full gap-2">
          <Button
            variant="solid"
            size="large"
            className="bg-status-danger hover:bg-[#b91e1e] active:bg-[#aa1111]"
            onClick={onClick}
          >
            확인
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              closeModal(modalName);
            }}
          >
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
