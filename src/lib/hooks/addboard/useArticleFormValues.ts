import { ArticlePost } from "@/core/dtos/boards/boards";
import { ChangeEvent, useState } from "react";

export default function useArticleFormValues(
  initialFormValues: ArticlePost = {
    title: "",
    content: "",
  },
) {
  const [formValues, setFormValues] = useState<ArticlePost>(initialFormValues);

  const changeFormByKeyValue = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFormValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    changeFormByKeyValue(e.target.name, e.target.value);
  };

  return { formValues, handleFormValueChange };
}
