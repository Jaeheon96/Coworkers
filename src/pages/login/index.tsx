import Button from "@/components/@shared/UI/Button";
import InputAlt from "@/components/@shared/UI/InputAlt";
import InputLabel from "@/components/@shared/UI/InputLabel";
import PasswordInput from "@/components/@shared/UI/PasswordInput";
import Link from "next/link";

export default function Login() {
  return (
    <main className="mx-auto mt-[8.75rem] flex max-w-[28.75rem] flex-col items-center px-4 [&&]:max-md:mt-[6.25rem] [&&]:max-sm:mt-6">
      <h1 className="mb-20 text-text-4xl font-medium [&&]:max-md:text-2xl [&&]:max-sm:mb-6">
        로그인
      </h1>
      <form className="flex w-full flex-col">
        <InputLabel label="이메일" className="mb-12">
          <InputAlt placeholder="이메일을 입력해주세요." />
        </InputLabel>
        <InputLabel label="비밀번호" className="mb-9">
          <PasswordInput placeholder="비밀번호를 입력해주세요." />
        </InputLabel>
        <div className="mb-10 text-right">
          <span className="cursor-pointer text-base font-medium text-brand-primary underline underline-offset-2 [&&]:max-sm:text-[0.875rem]">
            비밀번호를 잊으셨나요?
          </span>
        </div>
        <Button variant="solid" size="large" type="submit" className="mb-6">
          로그인
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
        <div className="flex items-center gap-6">
          <div className="h-0 w-full border-t border-solid border-border-primary" />
          <span className="text-text-lg font-regular text-white [&&]:max-sm:font-medium">
            OR
          </span>
          <div className="h-0 w-full border-t border-solid border-border-primary" />
        </div>
      </form>
    </main>
  );
}
