import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import useModalStore from "@/lib/hooks/stores/modalStore";
import useTimeoutToggle from "@/lib/hooks/useTimeoutToggle";
import Image from "next/image";

interface Props {
  modalName?: string;
  image: string;
  name: string;
  email: string;
}

export default function MemberProfileModal({
  modalName = "memberProfileModal",
  image,
  name,
  email,
}: Props) {
  const { isOn: isButtonClicked, timeoutToggle } = useTimeoutToggle();

  const isOpen = useModalStore((state) => state.modals[modalName]);

  const closeModal = useModalStore((state) => state.closeModal);

  const handleEmailCopy = () => {
    if (isButtonClicked) return;
    navigator.clipboard.writeText(email);
    timeoutToggle();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal(modalName);
      }}
      isCloseButton
    >
      <div className="mx-4 flex w-[17.5rem] flex-col items-center gap-6">
        <div className="relative h-13 w-13">
          {image ? (
            <Image
              fill
              src={image}
              className="rounded-full outline outline-border-primary"
              alt="프로필"
            />
          ) : (
            <Image fill src="/icons/icon-default_profile.svg" alt="프로필" />
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-text-md font-medium text-text-primary">
            {name}
          </span>
          <span className="text-text-xs font-regular text-text-secondary">
            {email}
          </span>
        </div>
        <Button
          variant="solid"
          size="large"
          className="text-text-lg"
          onClick={handleEmailCopy}
        >
          {isButtonClicked ? (
            <div className="flex w-full justify-center">
              <div className="relative h-6 w-6">
                <Image fill src="icons/check.svg" alt="복사되었습니다." />
              </div>
            </div>
          ) : (
            "이메일 복사하기"
          )}
        </Button>
      </div>
    </Modal>
  );
}
