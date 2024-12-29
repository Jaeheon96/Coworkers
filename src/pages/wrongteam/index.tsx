import Button from "@/components/@shared/UI/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Wrongteam() {
  const { back } = useRouter();

  return (
    <div className="mt-52 flex flex-col items-center gap-20 px-8 sm:mt-36 sm:gap-12">
      <div className="flex flex-col items-center gap-12 sm:gap-8">
        <div className="relative h-64 w-[50.625rem] md:h-[10.25rem] md:w-[32.5rem] sm:h-[6.125rem] sm:w-[19.5rem]">
          <Image fill src="/images/image-guys.png" alt="로그인 필요" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-center text-text-md font-medium text-text-default">
            해당 팀을 찾을 수 없습니다.
          </p>
          <p className="text-center text-text-md font-medium text-text-default">
            존재하지 않는 팀이거나 팀이 삭제됐을 수 있습니다.
          </p>
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
