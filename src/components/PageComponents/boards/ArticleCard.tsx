import Link from "next/link";
import Image from "next/image";
import { ArticleAbstract } from "@/core/dtos/boards/boards";

interface Props {
  article: ArticleAbstract | undefined;
}

export default function ArticleCard({ article }: Props) {
  const date = `${article?.createdAt.slice(0, 4)}. ${article?.createdAt.slice(5, 7)}. ${article?.createdAt.slice(8, 10)}`;

  if (!article) return null;
  return (
    <li className="relative h-44 w-full rounded-xl border border-background-tertiary bg-background-secondary [&&]:max-sm:h-40.5">
      <Link
        className="flex h-full w-full flex-col justify-between gap-6 rounded-xl px-8 py-6 transition-colors duration-100 hover:bg-background-tertiary [&&]:max-sm:gap-4 [&&]:max-sm:px-4 [&&]:max-sm:pb-4 [&&]:max-sm:pt-6"
        href={`/boards/${article.id}`}
      >
        <div className="flex w-full flex-col gap-3">
          <div className="relative flex w-full justify-between gap-4 [&&]:max-sm:gap-6 [&&]:max-sm:pr-20">
            <p className="line-clamp-2 max-h-14 text-text-2lg font-medium leading-7 text-text-secondary [&&]:max-sm:text-sm [&&]:max-sm:leading-6">
              {article.title}
            </p>
            {article.image ? (
              <div className="relative h-18 w-18 shrink-0 rounded-lg border border-border-primary [&&]:max-sm:absolute [&&]:max-sm:right-0 [&&]:max-sm:top-0 [&&]:max-sm:h-16 [&&]:max-sm:w-16">
                <Image
                  fill
                  src={article.image}
                  style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                  alt="게시글 이미지"
                  priority
                />
              </div>
            ) : null}
          </div>
          <p className="hidden shrink-0 text-text-md font-medium text-text-disabled [&&]:max-sm:block [&&]:max-sm:text-text-xs">
            {date}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                fill
                src="/icons/icon-default_profile.svg"
                alt={`${article.writer.nickname} 프로필`}
                priority
              />
            </div>
            <p className="border-r border-solid border-slate-700 pr-4 text-text-md font-medium [&&]:max-sm:border-none [&&]:max-sm:pr-0 [&&]:max-sm:text-text-xs">
              {article.writer.nickname}
            </p>
            <p className="shrink-0 pl-1 text-text-md font-medium text-text-disabled [&&]:max-sm:hidden [&&]:max-sm:text-text-xs">
              {date}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative h-4 w-4">
              <Image
                fill
                src="/icons/icon-heart.svg"
                alt="좋아요 갯수"
                priority
              />
            </div>
            <p className="text-text-md font-regular text-text-disabled [&&]:max-sm:text-text-xs">
              {article.likeCount}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
