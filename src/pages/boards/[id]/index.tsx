import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import getArticle from "@/core/api/boards/getArticle";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = (context.params?.id as string) ?? "wrong";
  let article: ArticleResponse | null = null;
  try {
    article = await getArticle(id);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
    if (e.status === 404) return { notFound: true };
  }

  return { props: { article } };
};

export default function Article({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!article)
    return <InvalidRequest>게시글을 불러오는데 실패했습니다.</InvalidRequest>;
  return <div>게시글 페이지</div>;
}
