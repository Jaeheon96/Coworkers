import { useRouter } from "next/router";

export default function usePageQuery() {
  const { query, push } = useRouter();
  const currentPage = +(typeof query.page === "string" ? query.page : "1");

  const pushPage = (targetPage: number) => {
    push({
      pathname: "/boards",
      query: {
        ...query,
        page: targetPage,
      },
    });
  };

  return { currentPage, pushPage };
}
