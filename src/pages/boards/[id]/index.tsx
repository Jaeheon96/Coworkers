import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import ArticleInterface from "@/components/PageComponents/article/ArticleInterface";
import getArticle from "@/core/api/boards/getArticle";
import { ArticleCommentsProvider } from "@/core/context/ArticleCommentsProvider";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import { COWORKERS_TITLE } from "@/lib/constants/sharedConstants";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";

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
    <>
      <Head>
        <title>{`${COWORKERS_TITLE} - ${article.title}`}</title>
        <meta name="description" content={article.content} />
        <meta
          name="keyword"
          content="팀, 투두리스트, 일정관리, 코워커스, 자유게시판, 게시글, team, to-do list, schedule, Coworkers, article"
        />

        <meta
          property="og:title"
          content={`${COWORKERS_TITLE} - ${article.title}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={article.content} />
        <meta
          property="og:image"
          content={
            article.image ??
            `${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`
          }
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}/boards/${article.id}`}
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${COWORKERS_TITLE} - ${article.title}`}
        />
        <meta
          name="twitter:image"
          content={
            article.image ??
            `${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`
          }
        />
        <meta name="twitter:description" content={article.content} />
      </Head>
      <ArticleCommentsProvider initialCommentsCount={article.commentCount}>
        <ArticleInterface article={article} />
      </ArticleCommentsProvider>
    </>
  );
}
