import Head from "next/head";
import { COWORKERS_TITLE } from "@/lib/constants/sharedConstants";
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
      </Head>
      <main>
        <section className="flex flex-col items-center gap-[42.25rem] px-4 [&&]:max-md:gap-[35rem] [&&]:max-sm:gap-[26.25rem]">
          <div className="absolute -z-10 h-full w-full [&&]:max-sm:-top-36">
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
            <h1 className="text-text-title bg-gradient-main bg-clip-text font-semibold text-transparent [&&]:max-md:text-5xl [&&]:max-sm:text-text-3xl">
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
      </main>
    </>
  );
}
