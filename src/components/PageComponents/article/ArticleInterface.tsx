import dynamic from "next/dynamic";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import DeleteArticleModal from "./DeleteArticleModal";
import ArticleCommentsLoading from "./ArticleCommentsLoading";
import ArticleHeader from "./ArticleHeader";
import ArticleCommentForm from "./ArticleCommentForm";

interface Props {
  article: ArticleResponse;
}

export default function ArticleInterface({ article }: Props) {
  const ArticleComments = dynamic(() => import("./ArticleComments"), {
    ssr: false,
    loading: ArticleCommentsLoading,
  });

  return (
    <>
      <main className="mx-auto mt-20 flex max-w-312 flex-col px-6 [&&]:max-sm:mt-16 [&&]:max-sm:px-4">
        <ArticleHeader article={article} />
        <article className="mb-20 py-2.5 text-text-lg font-regular leading-7 text-text-secondary [&&]:max-sm:text-text-md [&&]:max-sm:leading-6">
          {article.content}
        </article>
        <ArticleCommentForm article={article} />
        <ArticleComments />
      </main>
      <DeleteArticleModal />
    </>
  );
}
