import { ArticlePost } from "@/core/dtos/boards/boards";
import { ChangeEvent, useState } from "react";

export default function useFormValues() {
  const [formValues, setFormValues] = useState<ArticlePost>({
    title: "",
    content: "",
  });

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
