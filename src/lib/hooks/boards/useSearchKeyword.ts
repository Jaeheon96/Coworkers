import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useSearchKeyword() {
  const { query, isReady } = useRouter();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (typeof query.keyword === "string") setKeyword(query.keyword);
  }, [isReady]);

  return { keyword, setKeyword };
}
