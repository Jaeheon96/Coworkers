import FileInput from "@/components/@shared/UI/FileInput";
import InputAlt from "@/components/@shared/UI/InputAlt";
import InputLabel from "@/components/@shared/UI/InputLabel";
import LoadingButton from "@/components/@shared/UI/LoadingButton";
import postArticle from "@/core/api/boards/postArticle";
import { useAuth } from "@/core/context/AuthProvider";
import { ArticlePost } from "@/core/dtos/boards/boards";
import StandardError from "@/core/types/standardError";
import useArticleValidation from "@/lib/hooks/useArticleValidation";
import useImageUpload from "@/lib/hooks/useImageUpload";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

export default function Addboard() {
  useAuth(true);

  const [formValues, setFormValues] = useState<ArticlePost>({
    title: "",
    content: "",
  });

  const [generalError, setGeneralError] = useState("");

  const { replace } = useRouter();

  const handleFormValues = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { errors, checkValidation, clearError } =
    useArticleValidation(formValues);

  const {
    fileInputValue,
    file,
    handleFileInputChange,
    getImageUrl,
    imagePreview,
    clearFileInput,
  } = useImageUpload();

  const { mutate: submit, isPending } = useMutation({
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
      setGeneralError(
        `게시물 등록중 오류가 발생했습니다. 에러 코드: ${e.response?.status}`,
      );
    },
  });

  const contentClassName = `h-60 resize-none rounded-xl ${errors.content ? "border-status-danger" : "border-border-primary"} px-6 py-4 text-text-lg placeholder:text-text-default [&&]:bg-background-secondary [&&]:hover:border-interaction-hover [&&]:focus:border-interaction-focus [&&]:focus:ring-0 [&&]:max-sm:px-4 [&&]:max-sm:py-2 [&&]:max-sm:text-text-md`;

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    clearError(e.target.name);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleFormValues(e.target.name, e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!checkValidation()) return;
    submit();
  };

  return (
    <main className="px-6 [&&]:max-sm:px-4">
      <form
        className="mx-auto mt-14 flex max-w-300 flex-col pb-8 [&&]:max-sm:mt-10"
        onSubmit={handleSubmit}
      >
        <div className="relative mb-10 w-full border-b border-border-primary pb-10 [&&]:max-md:mb-8 [&&]:max-md:pb-8 [&&]:max-sm:mb-6 [&&]:max-sm:pb-6">
          <div className="flex w-full items-center justify-between">
            <h1 className="cursor-default text-text-xl font-bold [&&]:max-sm:text-text-2lg">
              게시글 쓰기
            </h1>
            <LoadingButton
              className="h-12 w-[11.5rem] [&&]:max-sm:hidden"
              variant="solid"
              size="large"
              type="submit"
              isPending={isPending}
            >
              등록
            </LoadingButton>
            <p className="absolute bottom-1 right-0 text-text-md font-medium text-status-danger">
              {generalError}
            </p>
          </div>
        </div>
        <div className="mb-10 flex w-full flex-col gap-10 [&&]:max-md:gap-8">
          <InputLabel
            label={
              <p className="flex gap-1.5 text-text-lg [&&]:max-sm:text-text-md">
                <span className="text-brand-tertiary">*</span>
                <span>제목</span>
              </p>
            }
            errorMessage={errors.title}
            className="gap-4"
          >
            <InputAlt
              className="px-6 text-text-lg [&&]:max-sm:h-12 [&&]:max-sm:px-4 [&&]:max-sm:text-text-md"
              placeholder="제목을 입력해주세요."
              name="title"
              isError={!!errors.title}
              value={formValues.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </InputLabel>
          <InputLabel
            label={
              <p className="flex gap-1.5 text-text-lg [&&]:max-sm:text-text-md">
                <span className="text-brand-tertiary">*</span>
                <span>내용</span>
              </p>
            }
            errorMessage={errors.content}
            className="gap-4"
          >
            <textarea
              className={contentClassName}
              placeholder="내용을 입력해주세요."
              name="content"
              value={formValues.content}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </InputLabel>
          <div className="flex flex-col gap-4">
            <p className="flex cursor-default items-center gap-1.5 text-text-lg font-medium [&&]:max-sm:text-text-md">
              이미지
              {imagePreview && (
                <div
                  className="relative h-5 w-5 cursor-pointer transition hover:scale-125"
                  onClick={() => {
                    clearFileInput();
                  }}
                >
                  <Image fill src="/icons/icon-x.svg" alt="이미지 지우기" />
                </div>
              )}
            </p>
            <FileInput
              value={fileInputValue}
              onInputChange={handleFileInputChange}
            >
              <div className="relative flex h-60 w-60 cursor-pointer items-center justify-center rounded-xl border border-solid border-border-primary bg-background-secondary [&&]:hover:border-interaction-hover [&&]:focus:border-interaction-focus [&&]:max-sm:h-40 [&&]:max-sm:w-40">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    fill
                    style={{ objectFit: "contain" }}
                    alt="이미지 브리뷰"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative h-12 w-12 [&&]:max-sm:h-6 [&&]:max-sm:w-6">
                      <Image
                        fill
                        src="/icons/icon-slim_gray_plus.svg"
                        alt="이미지 첨부"
                      />
                    </div>
                    <p className="text-text-lg font-regular text-gray-400 [&&]:max-sm:text-text-md">
                      이미지 등록
                    </p>
                  </div>
                )}
              </div>
            </FileInput>
          </div>
        </div>
        <LoadingButton
          variant="solid"
          size="large"
          className="hidden h-12 w-full [&&]:max-sm:block"
          type="submit"
          isPending={isPending}
        >
          등록
        </LoadingButton>
      </form>
    </main>
  );
}
