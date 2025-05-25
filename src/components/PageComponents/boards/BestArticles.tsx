import { useBoardsData } from "@/core/context/BoardsDataProvider";
import BestArticleCard from "./BestArticleCard";
import BestArticlesLoading from "./BestArticlesLoading";
import BestArticlesError from "./BestArticlesError";

export default function BestArticles() {
  const { bestArticles, isBestArticlesPending, isBestArticlesError } =
    useBoardsData();

  if (isBestArticlesError) return <BestArticlesError />;
  if (isBestArticlesPending) return <BestArticlesLoading />;
  return (
    <div className="flex w-full gap-5 [&&]:max-md:gap-4">
      <BestArticleCard article={bestArticles?.list[0]} />
      <BestArticleCard
        article={bestArticles?.list[1]}
        className="[&&]:max-sm:hidden"
      />
      <BestArticleCard
        article={bestArticles?.list[2]}
        className="[&&]:max-md:hidden"
      />
    </div>
  );
}
