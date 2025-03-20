import Button from "@/components/@shared/UI/Button";
import InputLabel from "@/components/@shared/UI/InputLabel";
import PasswordInput from "@/components/@shared/UI/PasswordInput";
import resetLostPassword from "@/core/api/user/resetLostPassword";
import resetPassword from "@/core/api/user/resetPassword";
import useAuthFormErrors from "@/lib/hooks/useAuthFormErrors";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ResetPassword() {
  const { push, query } = useRouter();

  const [resetForm, setResetForm] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const {
    errors,
    handleValidation,
    handleConfirmationBlur,
    handleConfirmationFocus,
  } = useAuthFormErrors(resetForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    handleValidation(e);
  };

  const { mutate: recoverPassword, isPending: isRecoverPending } = useMutation({
    mutationFn: resetLostPassword,
    throwOnError: false,
    onError: (e) => {
      console.error(e);
    },
    onSuccess: () => {
      push("/login");
    },
  });

  const { mutate: resetPasswordMutate, isPending: isResetPending } =
    useMutation({
      mutationFn: resetPassword,
      throwOnError: false,
      onError: (e) => {
        console.error(e);
      },
      onSuccess: () => {
        push("/");
      },
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.token)
      recoverPassword({ ...resetForm, token: query.token as string });
    else resetPasswordMutate(resetForm);
  };

  const isButtonDisabled =
    !resetForm.password ||
    !resetForm.passwordConfirmation ||
    !!errors.password ||
    !!errors.passwordConfirmation;

  return (
    <main className="mx-auto mt-[8.75rem] flex max-w-[28.75rem] flex-col items-center px-4 [&&]:max-md:mt-[6.25rem] [&&]:max-sm:mt-6">
      <h1 className="mb-20 text-text-4xl font-medium [&&]:max-md:text-2xl [&&]:max-sm:mb-6">
        비밀번호 재설정
      </h1>
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <InputLabel
          label="새 비밀번호"
          className="mb-12"
          errorMessage={errors.password}
        >
          <PasswordInput
            name="password"
            value={resetForm.password}
            isError={!!errors.password}
            onChange={handleInputChange}
            onBlur={handleValidation}
            placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
          />
        </InputLabel>
        <InputLabel
          label="비밀번호 확인"
          className="mb-16"
          errorMessage={errors.passwordConfirmation}
        >
          <PasswordInput
            name="passwordConfirmation"
            value={resetForm.passwordConfirmation}
            isError={!!errors.passwordConfirmation}
            onChange={handleInputChange}
            onBlur={handleConfirmationBlur}
            onFocus={handleConfirmationFocus}
            placeholder="새 비밀번호를 다시 한번 입력해주세요."
          />
        </InputLabel>
        <Button
          variant="solid"
          size="large"
          type="submit"
          className="mb-6"
          disabled={isButtonDisabled}
        >
          {isRecoverPending || isResetPending ? (
            <div className="flex w-full justify-center">
              <div className="relative h-6 w-6 animate-spin">
                <Image fill src="icons/icon-ongoing.svg" alt="처리중..." />
              </div>
            </div>
          ) : (
            "재설정"
          )}
        </Button>
      </form>
    </main>
  );
}
