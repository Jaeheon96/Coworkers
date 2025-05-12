import { ArticleAbstract } from "@/core/dtos/boards/boards";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  article: ArticleAbstract | undefined;
  className?: string;
}

export default function BestArticleCard({ article, className }: Props) {
  const cardClassName = twMerge(
    "h-55 [&&]:max-sm:h-44.5 justify-between relative flex w-full flex-col rounded-xl border border-border-primary bg-background-secondary gap-6 px-6 pb-4 pt-12 [&&]:max-sm:px-4 [&&]:max-sm:pt-10 [&&]:max-sm:gap-4",
    className,
  );

  const date = `${article?.createdAt.slice(0, 4)}. ${article?.createdAt.slice(5, 7)}. ${article?.createdAt.slice(8, 10)}`;

  if (!article) return null;

  return (
    <div className={cardClassName}>
      <div className="left-4.5 [&&]:max-sm:top-2.375 absolute top-2 flex items-center gap-1 [&&]:max-sm:left-3.5">
        <div className="relative h-4 w-4">
          <Image fill src="/icons/icon-medal.svg" alt="베스트" priority />
        </div>
        <h3 className="text-base font-semibold leading-[1.625rem] text-white [&&]:max-sm:text-text-md">
          Best
        </h3>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="relative flex w-full justify-between gap-4 [&&]:max-sm:gap-6 [&&]:max-sm:pr-20">
          <p className="line-clamp-2 max-h-14 text-text-2lg font-medium leading-7 text-text-secondary [&&]:max-sm:text-sm [&&]:max-sm:leading-6">
            {article.title}
          </p>
          {article.image ? (
            <div className="h-18 w-18 relative shrink-0 rounded-lg border border-border-primary [&&]:max-sm:absolute [&&]:max-sm:right-0 [&&]:max-sm:top-0 [&&]:max-sm:h-16 [&&]:max-sm:w-16">
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
        <p className="shrink-0 text-text-md font-medium text-text-disabled [&&]:max-sm:text-text-xs">
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
          <p className="text-text-md font-medium [&&]:max-sm:text-text-xs">
            {article.writer.nickname}
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
    </div>
  );
}
