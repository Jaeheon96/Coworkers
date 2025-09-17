import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { AxiosError } from "axios";
import getArticle from "@/core/api/boards/getArticle";
import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import ArticleInterface from "@/components/PageComponents/article/ArticleInterface";
import ArticlePageHead from "@/components/PageComponents/article/ArticlePageHead";
import { ArticleCommentsProvider } from "@/core/context/ArticleCommentsProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import { ArticleQueryProvider } from "@/core/context/ArticleQueryProvider";

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
  if (!article)
    return <InvalidRequest>게시글을 불러오는데 실패했습니다.</InvalidRequest>;

  return (
    <>
      <ArticlePageHead article={article} />
      <ArticleQueryProvider article={article}>
        <ArticleCommentsProvider initialCommentsCount={article.commentCount}>
          <ArticleInterface article={article} />
        </ArticleCommentsProvider>
      </ArticleQueryProvider>
    </>
  );
}
