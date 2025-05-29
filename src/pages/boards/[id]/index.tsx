import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import ArticleInterface from "@/components/PageComponents/article/ArticleInterface";
import getArticle from "@/core/api/boards/getArticle";
import { ArticleCommentsProvider } from "@/core/context/ArticleCommentsProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = (context.params?.id as string) ?? "wrong";
  let article: ArticleResponse | null = null;
  try {
    article = await getArticle(id);
  } catch (error: unknown) {
    const e = error as AxiosError<StandardError>;
    if (e.response?.status === 404 || e.status === 404)
      return { notFound: true };
  }

  return { props: { article } };
};

export default function Article({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useQuery({
    queryKey: ["Article", article?.id],
    queryFn: () => article,
    staleTime: 0,
    gcTime: 5000,
  });

  if (!article)
    return <InvalidRequest>게시글을 불러오는데 실패했습니다.</InvalidRequest>;

  return (
    <ArticleCommentsProvider initialCommentsCount={article.commentCount}>
      <ArticleInterface article={article} />
    </ArticleCommentsProvider>
  );
}
