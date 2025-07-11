import Button from "@/components/@shared/UI/Button";
import InputAlt from "@/components/@shared/UI/InputAlt";
import InputLabel from "@/components/@shared/UI/InputLabel";
import PasswordInput from "@/components/@shared/UI/PasswordInput";
import ResetPasswordModal from "@/components/PageComponents/auth/ResetPasswordModal";
import { useAuth } from "@/core/context/AuthProvider";
import { LoginForm } from "@/core/dtos/user/auth";
import { routerQueries } from "@/core/types/queries";
import { ErrorData } from "@/core/types/standardError";
import useModalStore from "@/lib/hooks/stores/modalStore";
import useAuthFormErrors from "@/lib/hooks/useAuthFormErrors";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const { push, query } = useRouter();

  const resetPasswordModalName = "resetPasswordModal";
  const isResetPasswordModalOpen = useModalStore(
    (state) => state.modals[resetPasswordModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { login: requestLogin } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const { errors, handleValidation, handleLoginResponseError } =
    useAuthFormErrors();

  const setFormValue = (key: string, value: string) => {
    setLoginForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.name, e.target.value);
    handleValidation(e);
  };

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: requestLogin,
    throwOnError: false,
    onSuccess: () => {
      const dir = query[routerQueries.loginDirection];
      const to = typeof dir === "string" ? dir : "/";
      push(to);
    },
    onError: (e: AxiosError) => {
      handleLoginResponseError(e.response?.data as ErrorData);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLoginPending) return;
    login(loginForm);
  };

  const isDisabled =
    !!errors.email ||
    !!errors.password ||
    !loginForm.email ||
    !loginForm.password;

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <main className="mx-auto mt-35 flex max-w-115 flex-col items-center px-4 [&&]:max-md:mt-25 [&&]:max-sm:mt-6">
        <h1 className="mb-20 text-text-4xl font-medium [&&]:max-md:text-2xl [&&]:max-sm:mb-6">
          로그인
        </h1>
        <form className="flex w-full flex-col" onSubmit={handleSubmit}>
          <InputLabel
            label="이메일"
            className="mb-12"
            errorMessage={errors.email}
          >
            <InputAlt
              name="email"
              onChange={handleInputChange}
              onBlur={handleValidation}
              value={loginForm.email}
              placeholder="이메일을 입력해주세요."
              isError={!!errors.email}
            />
          </InputLabel>
          <InputLabel
            label="비밀번호"
            className="mb-9"
            errorMessage={errors.password}
          >
            <PasswordInput
              name="password"
              onChange={handleInputChange}
              onBlur={handleValidation}
              value={loginForm.password}
              placeholder="비밀번호를 입력해주세요."
              isError={!!errors.password}
            />
          </InputLabel>
          <div className="mb-10 text-right">
            <span
              className="cursor-pointer text-base font-medium text-brand-primary underline underline-offset-2 [&&]:max-sm:text-sm [&&]:max-sm:leading-6"
              onClick={() => {
                openModal(resetPasswordModalName);
              }}
            >
              비밀번호를 잊으셨나요?
            </span>
          </div>
          <Button
            variant="solid"
            size="large"
            type="submit"
            className="mb-6"
            disabled={isDisabled}
          >
            {isLoginPending ? (
              <div className="flex w-full justify-center">
                <div className="relative h-6 w-6 animate-spin">
                  <Image fill src="icons/icon-ongoing.svg" alt="처리중..." />
                </div>
              </div>
            ) : (
              "로그인"
            )}
          </Button>
          <div className="mb-12 flex items-center justify-center gap-3 [&&]:max-sm:mb-6">
            <span className="text-text-lg font-medium [&&]:max-sm:text-text-md">
              아직 계정이 없으신가요?
            </span>
            <Link
              className="cursor-pointer text-text-lg font-medium text-brand-primary underline underline-offset-2 [&&]:max-sm:text-text-md"
              href="/signup"
            >
              가입하기
            </Link>
          </div>
          {/* <div className="mb-4 flex items-center gap-6">
            <div className="h-0 w-full border-t border-solid border-border-primary" />
            <span className="text-text-lg font-regular text-white [&&]:max-sm:font-medium">
              OR
            </span>
            <div className="h-0 w-full border-t border-solid border-border-primary" />
          </div>
          <div className="flex justify-between">
            <span className="text-text-lg font-medium text-white">
              간편 로그인하기
            </span>
            <div className="flex gap-4">
              <div className="relative h-10.5 w-10.5 cursor-pointer">
                <Image
                  fill
                  src="/images/image-kakaotalk.png"
                  alt="카카오톡"
                  priority
                />
              </div>
            </div>
          </div> */}
        </form>
      </main>
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => {
          closeModal(resetPasswordModalName);
        }}
      />
    </>
  );
}
