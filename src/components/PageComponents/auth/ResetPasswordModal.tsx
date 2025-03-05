import Button from "@/components/@shared/UI/Button";
import InputAlt from "@/components/@shared/UI/InputAlt";
import Modal from "@/components/@shared/UI/Modal/Modal";
import requestPasswordResetEmail from "@/core/api/user/requestPasswordResetEmail";
import checkEmailFormat from "@/lib/utils/checkEmailFormat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!checkEmailFormat(e.target.value)) {
      setErrorMessage("이메일 형식으로 입력해주세요.");
      return;
    }
    setErrorMessage("");
  };

  const { mutate: sendEmail, isPending: isSendPending } = useMutation({
    mutationFn: requestPasswordResetEmail,
    throwOnError: false,
    onError: (e: AxiosError) => {
      console.error(e);
    },
    onSuccess: () => {
      setIsMailSent(true);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendEmail(email);
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setErrorMessage("");
      setIsMailSent(false);
    }
  }, [isOpen]);

  if (isMailSent)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex w-[22rem] flex-col gap-10 px-9">
          <p className="text-center font-medium">메일을 발송했습니다.</p>
          <Button variant="solid" size="large" onClick={onClose}>
            확인
          </Button>
        </div>
      </Modal>
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <form
        className="flex w-[22rem] flex-col gap-10 px-9"
        onSubmit={handleSubmit}
      >
        <div className="relative flex w-full flex-col gap-4">
          <h3 className="text-center text-text-lg font-medium text-text-primary">
            비밀번호 재설정
          </h3>
          <InputAlt
            onChange={handleInputChange}
            value={email}
            isError={!!errorMessage}
            placeholder="이메일을 입력해주세요."
          />
          <span className="absolute bottom-[-1.5625rem] text-text-md font-medium text-status-danger [&&]:max-sm:bottom-[-1.8125rem]">
            {errorMessage}
          </span>
        </div>
        <Button
          type="submit"
          variant="solid"
          size="large"
          disabled={!email || !!errorMessage || isSendPending}
        >
          {isSendPending ? (
            <div className="flex w-full justify-center">
              <div className="relative h-6 w-6 animate-spin">
                <Image fill src="icons/icon-ongoing.svg" alt="처리중..." />
              </div>
            </div>
          ) : (
            "보내기"
          )}
        </Button>
      </form>
    </Modal>
  );
}
