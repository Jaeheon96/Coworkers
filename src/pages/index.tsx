import Head from "next/head";
import {
  COWORKERS_BASE_DESCRIPTION,
  COWORKERS_TITLE,
} from "@/lib/constants/sharedConstants";
import Image from "next/image";
import { useAuth } from "@/core/context/AuthProvider";
import Link from "next/link";
import { routerQueries } from "@/core/types/queries";

export default function Home() {
  const { isPending, user } = useAuth();

  return (
    <>
      <Head>
        <title>{COWORKERS_TITLE}</title>
        <meta name="description" content={COWORKERS_BASE_DESCRIPTION} />
        <meta
          name="keyword"
          content="팀, 투두리스트, 일정관리, 코워커스, team, to-do list, schedule, Coworkers"
        />

        <meta property="og:title" content={COWORKERS_TITLE} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`${COWORKERS_BASE_DESCRIPTION}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={COWORKERS_TITLE} />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`}
        />
        <meta name="twitter:description" content={COWORKERS_BASE_DESCRIPTION} />
      </Head>
      <main>
        <section className="relative mb-15 flex flex-col items-center gap-[42.25rem] px-4 [&&]:max-md:mb-0 [&&]:max-md:gap-[35rem] [&&]:max-sm:gap-[26.25rem]">
          <div className="absolute -z-10 h-full w-full">
            <Image
              fill
              style={{
                objectFit: "cover",
              }}
              priority
              quality={100}
              src="/images/image-train.png"
              alt="대문 이미지"
            />
          </div>
          <div className="mt-21 flex cursor-default flex-col items-center gap-5 [&&]:max-md:mt-25 [&&]:max-md:gap-2 [&&]:max-sm:mt-14 [&&]:max-sm:gap-1">
            <h1 className="flex items-center gap-6 text-5xl font-semibold [&&]:max-md:gap-4 [&&]:max-md:text-text-4xl [&&]:max-sm:gap-1 [&&]:max-sm:text-text-2xl">
              함께 만들어가는 투두 리스트
              <div className="relative h-14 w-14 [&&]:max-md:h-12 [&&]:max-md:w-12 [&&]:max-sm:h-7 [&&]:max-sm:w-7">
                <Image
                  fill
                  priority
                  src="/icons/icon-repair.svg"
                  alt="함께 만들어가요"
                />
              </div>
            </h1>
            <h1 className="bg-gradient-main bg-clip-text text-text-title font-semibold text-transparent [&&]:max-md:text-5xl [&&]:max-sm:text-text-3xl">
              Coworkers
            </h1>
          </div>
          <Link
            href={`${!isPending && !user ? `/login?${routerQueries.loginDirection}=/addteam` : "/addteam"}`}
            className="mb-30 flex w-full justify-center [&&]:max-sm:mb-12"
          >
            <button
              type="button"
              name="시작하기"
              className="flex h-12 w-[23.3125rem] items-center justify-center rounded-[2rem] bg-brand-gradient text-text-lg font-semibold transition lg:enabled:hover:scale-110 [&&]:max-sm:w-full"
            >
              지금 시작하기
            </button>
          </Link>
        </section>
        <section className="mx-auto flex w-full max-w-[65.25rem] flex-col items-center gap-20 px-6 [&&]:max-md:gap-6 [&&]:max-sm:px-4">
          <div className="h-105 w-full rounded-4xl bg-gradient-main p-px shadow-[0_0_12px_2px_rgba(255,255,255,0.25)] backdrop-blur-md [&&]:max-md:h-88.5 [&&]:max-sm:h-117">
            <div className="h-full w-full rounded-4xl bg-background-primary pl-43.5 [&&]:max-md:flex [&&]:max-md:justify-center [&&]:max-md:pl-0">
              <div className="[&&]:max-sm:flex-col-start flex h-full w-fit flex-row-reverse items-center justify-end gap-48.5 [&&]:max-md:justify-end [&&]:max-md:gap-25 [&&]:max-sm:flex-col [&&]:max-sm:items-start [&&]:max-sm:gap-10">
                <div className="flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-solid border-border-primary bg-background-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]">
                    <div className="relative h-6 w-6">
                      <Image
                        priority
                        src="/icons/icon-folder.svg"
                        fill
                        alt="그룹으로 관리해요"
                      />
                    </div>
                  </div>
                  <p className="cursor-default text-text-2xl font-medium [&&]:max-md:text-text-2lg">
                    그룹으로
                    <br />할 일을 관리해요
                  </p>
                </div>
                <div className="relative h-84.5 w-72.75 self-end [&&]:max-md:h-68.5 [&&]:max-md:w-58.75 [&&]:max-sm:self-center [&&]:max-sm:justify-self-end">
                  <Image
                    priority
                    quality={100}
                    src="/images/image-landingTeam.png"
                    fill
                    alt="모바일로도 가능해요"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-105 w-full justify-end rounded-4xl border border-solid border-border-primary bg-background-secondary pr-43.5 backdrop-blur-md [&&]:max-md:h-88.5 [&&]:max-md:justify-center [&&]:max-md:pr-0 [&&]:max-sm:h-117">
            <div className="flex h-full w-fit items-center justify-end gap-48.5 [&&]:max-md:justify-end [&&]:max-md:gap-25 [&&]:max-sm:flex-col [&&]:max-sm:flex-col-reverse [&&]:max-sm:items-start [&&]:max-sm:gap-10">
              <div className="flex flex-col items-end gap-4 [&&]:max-sm:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-solid border-border-primary bg-background-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/icons/icon-mail.svg"
                      fill
                      alt="간단하게 초대해요"
                    />
                  </div>
                </div>
                <p className="cursor-default text-right text-text-2xl font-medium [&&]:max-md:text-text-2lg [&&]:max-sm:text-left">
                  간단하게 멤버들을
                  <br />
                  초대해요
                </p>
              </div>
              <div className="relative h-84.5 w-72.75 self-start [&&]:max-md:h-68.5 [&&]:max-md:w-58.75 [&&]:max-sm:self-center [&&]:max-sm:justify-self-end">
                <Image
                  src="/images/image-landingInvite.png"
                  quality={100}
                  fill
                  alt="모바일로도 가능해요"
                />
              </div>
            </div>
          </div>
          <div className="flex h-105 w-full rounded-4xl bg-slate-950 pl-43.5 backdrop-blur-md [&&]:max-md:h-88.5 [&&]:max-md:justify-center [&&]:max-md:pl-0 [&&]:max-sm:h-117">
            <div className="flex h-full w-fit flex-row-reverse items-center justify-end gap-48.5 [&&]:max-md:justify-end [&&]:max-md:gap-25 [&&]:max-sm:flex-col [&&]:max-sm:flex-col-reverse [&&]:max-sm:items-start [&&]:max-sm:gap-10">
              <div className="flex flex-col gap-4 [&&]:max-sm:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-solid border-border-primary bg-background-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/icons/icon-done.svg"
                      fill
                      alt="간편하게 체크해요"
                    />
                  </div>
                </div>
                <p className="cursor-default text-text-2xl font-medium [&&]:max-md:text-text-2lg">
                  할 일도 간편하게
                  <br />
                  체크해요
                </p>
              </div>
              <div className="relative h-84.5 w-72.75 self-start [&&]:max-md:h-68.5 [&&]:max-md:w-58.75 [&&]:max-sm:self-center [&&]:max-sm:justify-self-end">
                <Image
                  src="/images/image-landingComments.png"
                  quality={100}
                  fill
                  alt="모바일로도 가능해요"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="relative flex h-[67.5rem] w-full justify-center pt-[14.375rem] [&&]:max-md:h-[58.75rem] [&&]:max-md:pt-44 [&&]:max-sm:h-[40rem] [&&]:max-sm:pt-[7.75rem]">
          <div className="absolute bottom-0 -z-10 h-full w-full">
            <Image
              fill
              quality={100}
              style={{ objectFit: "cover" }}
              src="/images/image-landingBottom.png"
              alt="시작해보세요"
            />
          </div>
          <div className="flex cursor-default flex-col gap-6 [&&]:max-sm:gap-4">
            <p className="text-center text-text-4xl font-semibold [&&]:max-sm:text-text-2xl">
              지금 바로 시작해보세요
            </p>
            <p className="text-center text-text-2xl font-medium [&&]:max-sm:text-text-lg">
              팀원 모두와 같은 방향,
              <span className="[&&]:max-sm:hidden"> </span>
              <br className="hidden [&&]:max-sm:block" />
              같은 속도로 나아가는 가장 쉬운 방법
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
