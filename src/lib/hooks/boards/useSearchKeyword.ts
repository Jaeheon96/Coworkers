import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useSearchKeyword() {
  const { query, isReady, push } = useRouter();
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

  return { keyword, setKeyword, handleSubmit };
}
