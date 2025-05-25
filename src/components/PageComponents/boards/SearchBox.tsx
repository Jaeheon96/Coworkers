import InputAlt from "@/components/@shared/UI/InputAlt";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function SearchBox() {
  const { query, push, isReady } = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    push({
      pathname: "/boards",
      query: {
        ...query,
        page: 1,
        keyword,
      },
    });
  };

  useEffect(() => {
    if (typeof query.keyword === "string") setKeyword(query.keyword);
  }, [isReady]);

  return (
    <form
      className="relative mb-10 h-14 w-full [&&]:max-md:mb-8 [&&]:max-sm:mb-6 [&&]:max-sm:h-12"
      onSubmit={handleSubmit}
    >
      <InputAlt
        className="h-full pl-4 pr-14 [&&]:max-sm:h-full"
        placeholder="검색어를 입력해주세요"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <button
        className="absolute right-0 top-0 flex h-full w-14 items-center justify-center [&&]:max-sm:w-12"
        name="검색"
        type="submit"
      >
        <div className="relative h-6 w-6">
          <Image fill src="/icons/icon-search.svg" alt="검색" priority />
        </div>
      </button>
    </form>
  );
}
