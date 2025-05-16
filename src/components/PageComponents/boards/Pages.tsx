import { useBoardsData } from "@/core/context/BoardsDataProvider";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Pages() {
  const { pages, lastPage } = useBoardsData();
  const { query } = useRouter();
  const { page }: { page?: number } = query;

  return (
    <ul className="flex items-center gap-1">
      {page === 1 || !page ? null : (
        <li className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-100 hover:bg-background-secondary">
          <div className="relative h-4 w-4">
            <Image fill src="/icons/icon-arrow_left.svg" alt="이전 페이지로" />
          </div>
        </li>
      )}
      {pages.map((p) => {
        const pageClassName = `rounded-full flex justify-center items-center w-8 h-8 text-text-lg font-semibold ${(page ?? 1) === p ? "text-brand-primary cursor-default" : "text-text-primary cursor-pointer transition-colors duration-100 hover:bg-background-secondary"}`;
        return (
          <li key={p} className={pageClassName}>
            {p}
          </li>
        );
      })}
      {(page ?? 1) === lastPage ? null : (
        <li className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-100 hover:bg-background-secondary">
          <div className="relative h-4 w-4">
            <Image fill src="/icons/icon-arrow_right.svg" alt="다음 페이지로" />
          </div>
        </li>
      )}
    </ul>
  );
}
