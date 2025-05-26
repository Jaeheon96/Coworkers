import Image from "next/image";

export default function ArticleCommentsLoading() {
  return (
    <section className="flex items-center justify-center py-32">
      <div className="relative h-8 w-8 animate-spin">
        <Image fill src="/icons/icon-ongoing.svg" alt="처리중..." />
      </div>
    </section>
  );
}
