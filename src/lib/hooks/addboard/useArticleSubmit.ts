import { useState } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import postArticle from "@/core/api/boards/postArticle";
import { ArticlePost } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import useImageUpload from "../useImageUpload";

export default function useArticleSubmit(formValues: ArticlePost) {
  const { replace } = useRouter();
  const [responseError, setResponseError] = useState("");

  const {
    fileInputValue,
    file,
    handleFileInputChange,
    getImageUrl,
    imagePreview,
    clearFileInput,
  } = useImageUpload();

  const { mutate: submit, isPending: isSubmitPending } = useMutation({
    mutationFn: async () => {
      let imageUrl: string | null = null;
      if (file) {
        imageUrl = await getImageUrl(file);
      }

      const res = await postArticle({
        ...formValues,
        image: imageUrl ?? undefined,
      });

      return res;
    },
    throwOnError: false,
    onSuccess: (data) => {
      replace(`/boards/${data.id}`);
    },
    onError: (error) => {
      const e = error as AxiosError<StandardError>;
      console.error(e);
      setResponseError(
        `게시물 등록중 오류가 발생했습니다. 에러 코드: ${e.response?.status}`,
      );
    },
  });

  return {
    submit,
    isSubmitPending,
    fileInputValue,
    handleFileInputChange,
    imagePreview,
    clearFileInput,
    responseError,
  };
}
