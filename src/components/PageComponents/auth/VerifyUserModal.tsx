import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import PasswordInput from "@/components/@shared/UI/PasswordInput";
import checkPasswordFormat from "@/lib/utils/checkPasswordFormat";
import { ChangeEvent, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function VerifyUserModal({ isOpen, onClose }: Props) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setErrorMessage("비밀번호는 최소 8자 이상입니다.");
      return;
    }
    if (!checkPasswordFormat(e.target.value)) {
      setErrorMessage("비밀번호는 영문, 숫자, 특수문자의 조합이어야 합니다.");
      return;
    }
    setErrorMessage("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <form className="flex w-96 flex-col gap-10 px-9">
        <div className="relative flex w-full flex-col gap-4">
          <h3 className="text-center text-text-lg font-medium text-text-primary">
            본인확인
          </h3>
          <PasswordInput
            onChange={handleInputChange}
            value={password}
            isError={!!errorMessage}
            placeholder="비밀번호를 입력해주세요."
          />
          <span className="absolute bottom-[-1.5625rem] text-text-md font-medium text-status-danger [&&]:max-sm:bottom-[-1.8125rem]">
            {errorMessage}
          </span>
        </div>
        <Button type="submit" variant="solid" size="large">
          확인
        </Button>
      </form>
    </Modal>
  );
}
