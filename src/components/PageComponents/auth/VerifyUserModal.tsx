import LoadingButton from "@/components/@shared/UI/LoadingButton";
import Modal from "@/components/@shared/UI/Modal/Modal";
import PasswordInput from "@/components/@shared/UI/PasswordInput";
import deleteUser from "@/core/api/user/deleteUser";
import signIn from "@/core/api/user/signIn";
import { useAuth } from "@/core/context/AuthProvider";
import checkPasswordFormat from "@/lib/utils/checkPasswordFormat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function VerifyUserModal({ isOpen, onClose }: Props) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, logout } = useAuth();
  const { push } = useRouter();

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

  const { mutate: deleteMe, isPending: isDeletionPending } = useMutation({
    mutationFn: deleteUser,
    throwOnError: false,
    onError: (e: AxiosError) => {
      console.error(e);
    },
    onSuccess: () => {
      onClose();
      push("/");
      logout();
    },
  });

  const { mutate: verifyPassword, isPending: isVerifyPending } = useMutation({
    mutationFn: signIn,
    throwOnError: false,
    onError: (e: AxiosError) => {
      console.error(e);
    },
    onSuccess: () => {
      deleteMe();
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    verifyPassword({
      email: user?.email ?? "",
      password,
    });
  };

  const isPending = isVerifyPending || isDeletionPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <form className="flex w-96 flex-col gap-10 px-9" onSubmit={handleSubmit}>
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
        <LoadingButton isPending={isPending} disabled={isPending}>
          확인
        </LoadingButton>
      </form>
    </Modal>
  );
}
