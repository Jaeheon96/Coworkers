import SearchBox from "./SearchBox";
import BestArticles from "./BestArticles";

export default function BoardsInterface() {
  return (
    <main className="max-w-312 mx-auto mt-10 px-6 [&&]:max-sm:mt-8 [&&]:max-sm:px-4">
      <h1 className="mb-10 cursor-default text-text-2xl font-bold [&&]:max-md:mb-8 [&&]:max-sm:mb-6 [&&]:max-sm:text-text-2lg">
        자유게시판
      </h1>
      <SearchBox />
      <section className="flex flex-col gap-14 border-b border-border-primary pb-10 [&&]:max-md:gap-10 [&&]:max-md:pb-10 [&&]:max-sm:gap-6 [&&]:max-sm:pb-8">
        <h2 className="cursor-default text-text-xl font-bold [&&]:max-sm:text-text-lg [&&]:max-sm:font-medium">
          베스트 게시글
        </h2>
        <BestArticles />
      </section>
    </main>
  );
}
