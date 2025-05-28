import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAuth } from "@/core/context/AuthProvider";
import SearchBoxLoading from "./SearchBoxLoading";
import BestArticlesLoading from "./BestArticlesLoading";
import ArticlesSortDropdownLoading from "./ArticlesSortDropdownLoading";
import ArticlesLoading from "./ArticlesLoading";

export default function BoardsInterface() {
  const { user } = useAuth();

  const SearchBox = dynamic(() => import("./SearchBox"), {
    ssr: false,
    loading: SearchBoxLoading,
  });

  const BestArticles = dynamic(() => import("./BestArticles"), {
    ssr: false,
    loading: BestArticlesLoading,
  });

  const ArticlesSortDropdown = dynamic(() => import("./ArticlesSortDropdown"), {
    ssr: false,
    loading: ArticlesSortDropdownLoading,
  });

  const Articles = dynamic(() => import("./Articles"), {
    ssr: false,
    loading: ArticlesLoading,
  });

  return (
    <main className="mx-auto mt-10 max-w-312 px-6 [&&]:max-sm:mt-8 [&&]:max-sm:px-4">
      <h1 className="mb-10 cursor-default text-text-2xl font-bold [&&]:max-md:mb-8 [&&]:max-sm:mb-6 [&&]:max-sm:text-text-2lg">
        자유게시판
      </h1>
      <SearchBox />
      <section className="mb-10 flex flex-col gap-14 border-b border-border-primary pb-10 [&&]:max-md:gap-10 [&&]:max-md:pb-10 [&&]:max-sm:mb-8 [&&]:max-sm:gap-6 [&&]:max-sm:pb-8">
        <h2 className="cursor-default text-text-xl font-bold [&&]:max-sm:text-text-lg [&&]:max-sm:font-medium">
          베스트 게시글
        </h2>
        <BestArticles />
      </section>
      <section className="flex flex-col gap-8 pb-14 [&&]:max-sm:gap-6 [&&]:max-sm:pb-30">
        <div className="flex items-center justify-between">
          <h2 className="cursor-default text-text-xl font-bold [&&]:max-sm:text-text-lg [&&]:max-sm:font-medium">
            게시글
          </h2>
          <ArticlesSortDropdown />
        </div>
        <Articles />
        {user && (
          <Link
            className="fixed bottom-11 right-12 flex h-12 items-center justify-center gap-1 rounded-4xl bg-brand-primary px-5 text-text-lg text-white transition duration-100 hover:scale-110 [&&]:max-md:right-6 [&&]:max-sm:right-4"
            href="/addboard"
          >
            <div className="relative h-4 w-4">
              <Image src="/icons/icon-plus.svg" fill alt="게시글 쓰기" />
            </div>
            글쓰기
          </Link>
        )}
      </section>
    </main>
  );
}
