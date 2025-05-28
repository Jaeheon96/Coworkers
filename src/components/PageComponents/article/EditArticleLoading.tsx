import InputAlt from "@/components/@shared/UI/InputAlt";
import InputLabel from "@/components/@shared/UI/InputLabel";
import LoadingButton from "@/components/@shared/UI/LoadingButton";

export default function EditArticleLoading() {
  return (
    <main className="px-6 [&&]:max-sm:px-4">
      <form className="mx-auto mt-14 flex max-w-300 flex-col pb-8 [&&]:max-sm:mt-10">
        <div className="mb-10 w-full border-b border-border-primary pb-10 [&&]:max-md:mb-8 [&&]:max-md:pb-8 [&&]:max-sm:mb-6 [&&]:max-sm:pb-6">
          <div className="flex w-full items-center justify-between">
            <h1 className="cursor-default text-text-xl font-bold [&&]:max-sm:text-text-2lg">
              게시글 수정
            </h1>
            <LoadingButton
              className="h-12 w-[11.5rem] [&&]:max-sm:hidden"
              variant="solid"
              size="large"
              type="submit"
              disabled
              isPending
            >
              등록
            </LoadingButton>
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
            className="gap-4"
          >
            <InputAlt
              className="animate-pulse px-6 text-text-lg [&&]:hover:border-border-primary [&&]:focus:border-border-primary [&&]:max-sm:h-12 [&&]:max-sm:px-4 [&&]:max-sm:text-text-md"
              name="title"
              disabled
            />
          </InputLabel>
          <InputLabel
            label={
              <p className="flex gap-1.5 text-text-lg [&&]:max-sm:text-text-md">
                <span className="text-brand-tertiary">*</span>
                <span>내용</span>
              </p>
            }
            className="gap-4"
          >
            <textarea
              className="h-60 animate-pulse resize-none rounded-xl border-border-primary px-6 py-4 text-text-lg [&&]:bg-background-secondary [&&]:focus:border-border-primary [&&]:focus:ring-0 [&&]:max-sm:px-4 [&&]:max-sm:py-2 [&&]:max-sm:text-text-md"
              name="content"
              disabled
            />
          </InputLabel>
          <div className="flex flex-col gap-4">
            <p className="flex cursor-default items-center gap-1.5 text-text-lg font-medium [&&]:max-sm:text-text-md">
              이미지
            </p>
            <div className="relative flex h-60 w-60 animate-pulse items-center justify-center rounded-xl border border-solid border-border-primary bg-background-secondary [&&]:max-sm:h-40 [&&]:max-sm:w-40" />
          </div>
        </div>
        <LoadingButton
          variant="solid"
          size="large"
          className="hidden h-12 w-full [&&]:max-sm:block"
          type="submit"
          isPending
          disabled
        >
          등록
        </LoadingButton>
      </form>
    </main>
  );
}
