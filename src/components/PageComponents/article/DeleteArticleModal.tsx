import useModalStore from "@/lib/hooks/stores/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import deleteArticle from "@/core/api/boards/deleteArticle";
import { AxiosError } from "axios";
import StandardError from "@/core/types/standardError";
import WarningModal from "../team/WarningModal";

export default function DeleteArticleModal() {
  const { query, replace } = useRouter();
  const articleId = query.id as string;

  const modalName = "deleteArticleModal";

  const { mutate: handleDelete } = useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      replace("/boards");
    },
    onError: (error) => {
      const e = error as AxiosError<StandardError>;
      alert(
        `게시물 삭제중 오류가 발생했습니다. 에러 코드: ${e.response?.status}`,
      );
    },
  });

  const isDeleteArticleModalOpen = useModalStore(
    (state) => state.modals[modalName],
  );

  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <WarningModal
      isOpen={isDeleteArticleModalOpen}
      onClick={() => {
        handleDelete();
      }}
      onClose={() => {
        closeModal(modalName);
      }}
      message="게시물을 삭제하시겠습니까?"
    />
  );
}
