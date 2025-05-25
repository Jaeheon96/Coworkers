import { useBoardsData } from "@/core/context/BoardsDataProvider";
import ArticleCard from "./ArticleCard";
import ArticlesLoading from "./ArticlesLoading";
import Pages from "./Pages";
import ArticlesError from "./ArticlesError";

export default function Articles() {
  const { articles, isArticlesPending, isArticlesError } = useBoardsData();

  if (isArticlesError) return <ArticlesError />;
  if (isArticlesPending) return <ArticlesLoading />;
  return (
    <div className="flex w-full flex-col items-center gap-16 [&&]:max-sm:gap-8">
      <ul className="flex w-full flex-col gap-8 [&&]:max-sm:gap-6">
        {articles?.list.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </ul>
      <Pages />
    </div>
  );
}
