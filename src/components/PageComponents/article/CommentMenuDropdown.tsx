import AnimatedDropdown from "@/components/@shared/UI/AnimatedDropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import deleteArticleComment from "@/core/api/boards/deleteArticleComment";
import { useArticleComments } from "@/core/context/ArticleCommentsProvider";
import StandardError from "@/core/types/standardError";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";

interface Props {
  handlePatchFormOpen: () => void;
  commentId: number;
}

export default function CommentMenuDropdown({
  handlePatchFormOpen,
  commentId,
}: Props) {
  const { decreaseCommentsCount, refetchComments } = useArticleComments();

  const { mutate: deleteComment } = useMutation({
    mutationFn: () => deleteArticleComment(commentId),
    onSuccess: () => {
      refetchComments();
      decreaseCommentsCount();
    },
    onError: (error) => {
      const e = error as AxiosError<StandardError>;
      console.error(error);
      alert(
        `댓글 삭제중 오류 발생 - 에러 코드: ${e.response?.status ?? e.status}`,
      );
    },
  });

  return (
    <AnimatedDropdown
      trigger={
        <div className="relative h-4 w-4">
          <Image fill src="/icons/icon-kebab.svg" alt="댓글 메뉴" />
        </div>
      }
      closeOnClick
      buttonProps={{
        name: "댓글 메뉴",
      }}
      menuClassName="border border-solid border-border-primary right-0 top-6 bg-background-secondary flex flex-col text-text-md font-regular w-30 [&&]:max-sm:text-text-xs [&&]:max-sm:rounded-lg [&&]:max-sm:w-24"
    >
      <DropdownItem
        onClick={handlePatchFormOpen}
        itemClassName="transition-colors flex items-center justify-center duration-100 hover:bg-background-tertiary rounded-t-xl h-10 [&&]:max-sm:rounded-t-lg [&&]:max-sm:text-text-xs"
      >
        수정하기
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          deleteComment();
        }}
        itemClassName="transition-colors flex items-center duration-100 justify-center hover:bg-background-tertiary rounded-b-xl h-10 [&&]:max-sm:rounded-b-lg [&&]:max-sm:text-text-xs"
      >
        삭제하기
      </DropdownItem>
    </AnimatedDropdown>
  );
}
