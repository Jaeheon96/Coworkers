import Button from "@/components/@shared/UI/Button";
import Input from "@/components/@shared/UI/Input";
import Modal from "@/components/@shared/UI/Modal/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MailInviteModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <div className="flex w-[22rem] flex-col gap-6 px-9">
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-center text-text-lg font-medium text-text-primary">
            이메일로 초대 보내기
          </h3>
          <Input className="w-full" />
        </div>
        <Button type="button" variant="solid" size="large">
          보내기
        </Button>
      </div>
    </Modal>
  );
}
