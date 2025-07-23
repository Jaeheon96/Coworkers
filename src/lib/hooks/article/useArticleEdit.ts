import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  ArticlePatch,
  ArticlePost,
  ArticleResponse,
} from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import patchArticle from "@/core/api/boards/patchArticle";
import useImageUpload from "../useImageUpload";

export default function useArticleEdit(
  formValues: ArticlePost,
  article: ArticleResponse,
) {
  const { replace } = useRouter();

  const {
    fileInputValue,
    file,
    handleFileInputChange,
    getImageUrl,
    imagePreview,
    clearFileInput,
  } = useImageUpload(article.image);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => {
      let imageUrl: string | null = null;
      if (file) {
        imageUrl = await getImageUrl(file);
      }

      const editForm: ArticlePatch = {
        title:
          formValues.title === article.title ? undefined : formValues.title,
        content:
          formValues.content === article.content
            ? undefined
            : formValues.content,
        image: article.image === imagePreview ? undefined : imageUrl,
      };

      if (
        typeof editForm.title === "undefined" &&
        typeof editForm.content === "undefined" &&
        typeof editForm.image === "undefined"
      )
        return article;

      const res = await patchArticle(`${article.id}`, editForm);

      return res;
    },
    throwOnError: false,
    onSuccess: (data) => {
      replace(`/boards/${data.id}`);
    },
    onError: (error) => {
      const e = error as AxiosError<StandardError>;
      console.error(e);
      alert(
        `게시물 등록중 오류가 발생했습니다. 에러 코드: ${e.response?.status}`,
      );
    },
  });

  return {
    submit,
    isPending,
    fileInputValue,
    handleFileInputChange,
    imagePreview,
    clearFileInput,
  };
}
