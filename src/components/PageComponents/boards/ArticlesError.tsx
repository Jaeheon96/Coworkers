import Button from "@/components/@shared/UI/Button";
import { useBoardsData } from "@/core/context/BoardsDataProvider";

export default function ArticlesError() {
  const { refetchArticles } = useBoardsData();
  const handleButtonClick = () => {
    refetchArticles();
  };

  return (
    <div className="flex h-55 w-full flex-col items-center justify-center gap-8 [&&]:max-sm:h-44.5">
      <p className="text-text-lg text-text-default [&&]:max-sm:text-text-md">
        게시물을 불러오던 중 오류가 발생했습니다.
      </p>
      <Button
        variant="outlined"
        size="large"
        className="w-60 bg-transparent"
        onClick={handleButtonClick}
      >
        다시 시도
      </Button>
    </div>
  );
}
