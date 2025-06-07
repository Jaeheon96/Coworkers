import { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { routerQueries } from "@/core/types/queries";
import Button from "./Button";

interface Props {
  login?: boolean;
  retry?: (e?: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export default function InvalidRequest({ login, retry, children }: Props) {
  const { replace, back, query } = useRouter();
  const dir = query[routerQueries.loginDirection];
  const loginUrl = `/login${typeof dir === "string" ? `?${routerQueries.loginDirection}=${dir}` : ""}`;

  return (
    <div className="mt-52 flex flex-col items-center gap-20 px-8 sm:mt-36 sm:gap-12">
      <div className="flex flex-col items-center gap-12 sm:gap-8">
        <div className="relative h-64 w-[50.625rem] md:h-[10.25rem] md:w-[32.5rem] sm:h-[6.125rem] sm:w-[19.5rem]">
          <Image fill src="/images/image-guys.png" alt="문제 발생" />
        </div>
        <div className="flex flex-col gap-1 text-center text-text-md font-medium text-text-default">
          {children}
        </div>
      </div>
      <div className="flex w-[11.625rem] flex-col gap-4">
        {login ? (
          <Button
            variant="solid"
            size="large"
            onClick={() => replace(loginUrl)}
          >
            로그인하기
          </Button>
        ) : null}
        {retry ? (
          <Button variant="solid" size="large" onClick={retry}>
            다시 시도
          </Button>
        ) : null}
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
