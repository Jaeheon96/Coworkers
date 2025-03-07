import Button from "@/components/@shared/UI/Button";
import InputLabel from "@/components/@shared/UI/InputLabel";
import PasswordInput from "@/components/@shared/UI/PasswordInput";
import { FormEvent } from "react";

export default function ResetPassword() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="mx-auto mt-[8.75rem] flex max-w-[28.75rem] flex-col items-center px-4 [&&]:max-md:mt-[6.25rem] [&&]:max-sm:mt-6">
      <h1 className="mb-20 text-text-4xl font-medium [&&]:max-md:text-2xl [&&]:max-sm:mb-6">
        비밀번호 재설정
      </h1>
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <InputLabel label="새 비밀번호" className="mb-12" errorMessage="">
          <PasswordInput
            name="password"
            placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
          />
        </InputLabel>
        <InputLabel label="비밀번호 확인" className="mb-10" errorMessage="">
          <PasswordInput
            name="passwordConfirmation"
            placeholder="새 비밀번호를 다시 한번 입력해주세요."
          />
        </InputLabel>
        <Button variant="solid" size="large" type="submit" className="mb-6">
          재설정
        </Button>
      </form>
    </main>
  );
}
