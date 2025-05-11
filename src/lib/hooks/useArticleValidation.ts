import { ArticlePost } from "@/core/dtos/boards/boards";
import { useState } from "react";

export default function useArticleValidation(formValues: ArticlePost) {
  const { title, content } = formValues;
  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const handleErrors = (key: string, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearError = (key?: string) => {
    if (key) {
      handleErrors(key, "");
      return;
    }
    setErrors({
      title: "",
      content: "",
    });
  };

  const checkValidation = () => {
    let isValid = true;
    if (title.length < 1) {
      handleErrors("title", "제목은 필수입력입니다.");
      isValid = false;
    }
    if (content.length < 1) {
      handleErrors("content", "내용은 필수입력입니다.");
      isValid = false;
    }
    if (title.length > 200) {
      handleErrors("title", "제목은 200자 이하여야 합니다.");
      isValid = false;
    }

    return isValid;
  };

  return { errors, checkValidation, clearError };
}
