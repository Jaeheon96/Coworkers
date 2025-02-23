import Button from "@/components/@shared/UI/Button";
import InputAlt from "@/components/@shared/UI/InputAlt";
import InputLabel from "@/components/@shared/UI/InputLabel";
import PasswordInput from "@/components/@shared/UI/PasswordInput";
import signUp from "@/core/api/user/signUp";
import { useAuth } from "@/core/context/AuthProvider";
import { SignupForm } from "@/core/dtos/user/auth";
import { ErrorData } from "@/core/types/standardError";
import useAuthFormErrors from "@/lib/hooks/useAuthFormErrors";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Signup() {
  const { login: requestLogin } = useAuth();
  const { replace } = useRouter();

  const [signupForm, setSignupForm] = useState<SignupForm>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const {
    errors,
    handleValidation,
    handleConfirmationFocus,
    handleConfirmationBlur,
    handleSignupResponseError,
  } = useAuthFormErrors(signupForm);

  const setFormValue = (key: string, value: string) => {
    setSignupForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.name, e.target.value);
    handleValidation(e);
  };

  const { mutate: login } = useMutation({
    mutationFn: requestLogin,
    onSettled: () => {
      replace("/");
    },
    throwOnError: false,
  });

  const { mutate: signup } = useMutation({
    mutationFn: signUp,
    throwOnError: false,
    onSuccess: () => {
      login({
        email: signupForm.email,
        password: signupForm.password,
      });
    },
    onError: (e: AxiosError) => {
      console.error(e);
      handleSignupResponseError(e.response?.data as ErrorData);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup(signupForm);
  };

  const isError =
    !!errors.email ||
    !!errors.nickname ||
    !!errors.password ||
    !!errors.passwordConfirmation;

  return (
    <main className="mx-auto mb-10 mt-[8.75rem] flex max-w-[28.75rem] flex-col items-center px-4 [&&]:max-md:mt-[6.25rem] [&&]:max-sm:mt-6">
      <h1 className="mb-20 text-text-4xl font-medium [&&]:max-md:text-2xl [&&]:max-sm:mb-6">
        회원가입
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
            value={signupForm.email}
            placeholder="이메일을 입력해주세요."
            isError={!!errors.email}
          />
        </InputLabel>
        <InputLabel
          label="닉네임"
          className="mb-12"
          errorMessage={errors.nickname}
        >
          <InputAlt
            name="nickname"
            onChange={handleInputChange}
            onBlur={handleValidation}
            value={signupForm.nickname}
            placeholder="닉네임을 입력해주세요."
            isError={!!errors.nickname}
          />
        </InputLabel>
        <InputLabel
          label="비밀번호"
          className="mb-12"
          errorMessage={errors.password}
        >
          <InputAlt
            name="password"
            onChange={handleInputChange}
            onBlur={handleValidation}
            value={signupForm.password}
            placeholder="비밀번호를 입력해주세요."
            isError={!!errors.password}
          />
        </InputLabel>
        <InputLabel
          label="비밀번호 확인"
          className="mb-16"
          errorMessage={errors.passwordConfirmation}
        >
          <PasswordInput
            name="passwordConfirmation"
            onChange={handleInputChange}
            onFocus={handleConfirmationFocus}
            onBlur={handleConfirmationBlur}
            value={signupForm.passwordConfirmation}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            isError={!!errors.passwordConfirmation}
          />
        </InputLabel>
        <Button
          variant="solid"
          size="large"
          type="submit"
          className="mb-12 [&&]:max-sm:mb-6"
          disabled={isError}
        >
          회원가입
        </Button>
        <div className="mb-4 flex items-center gap-6">
          <div className="h-0 w-full border-t border-solid border-border-primary" />
          <span className="text-text-lg font-regular text-white [&&]:max-sm:font-medium">
            OR
          </span>
          <div className="h-0 w-full border-t border-solid border-border-primary" />
        </div>
        <div className="flex justify-between">
          <span className="text-text-lg font-medium text-white">
            간편 회원가입하기
          </span>
          <div className="flex gap-4">
            <div className="relative h-[2.625rem] w-[2.625rem] cursor-pointer">
              <Image fill src="/images/image-kakaotalk.png" alt="카카오톡" />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
