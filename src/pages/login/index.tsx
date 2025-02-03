import InputAlt from "@/components/@shared/UI/InputAlt";
import InputLabel from "@/components/@shared/UI/InputLabel";
import PasswordInput from "@/components/@shared/UI/PasswordInput";

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
      </form>
    </main>
  );
}
