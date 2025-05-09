import Button from "@/components/@shared/UI/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const { back } = useRouter();

  return (
    <div className="mt-52 flex flex-col items-center gap-20 px-8 sm:mt-36 sm:gap-12">
      <div className="flex flex-col items-center gap-12 sm:gap-8">
        <div className="relative h-64 w-[50.625rem] md:h-[10.25rem] md:w-[32.5rem] sm:h-[6.125rem] sm:w-[19.5rem]">
          <Image fill src="/images/image-guys.png" alt="문제 발생" />
        </div>
        <div className="flex flex-col gap-1 text-center text-text-md font-medium text-text-default">
          <p>요청하신 페이지를 찾을 수 없습니다.</p>
        </div>
      </div>
      <div className="flex w-[11.625rem] flex-col gap-4">
        <Button
          variant="outlined"
          size="large"
          className="bg-transparent"
          onClick={() => back()}
        >
          이전 페이지로
        </Button>
      </div>
    </div>
  );
}
