import getArticle from "@/core/api/boards/getArticle";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = (context.params?.id as string) ?? "wrong";
  const article = await getArticle(id);

  return { props: { article } };
};

export default function Article({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(article);

  return <div>게시글 페이지</div>;
}
