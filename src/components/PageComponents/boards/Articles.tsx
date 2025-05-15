import { useBoardsData } from "@/core/context/BoardsDataProvider";
import ArticleCard from "./ArticleCard";
import ArticlesLoading from "./ArticlesLoading";

export default function Articles() {
  const { articles, isArticlesPending } = useBoardsData();

  if (isArticlesPending) return <ArticlesLoading />;
  return articles?.list.map((article) => (
    <ArticleCard article={article} key={article.id} />
  ));
}
