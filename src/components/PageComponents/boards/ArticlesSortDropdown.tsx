import AnimatedDropdown from "@/components/@shared/UI/AnimatedDropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";

export default function ArticlesSortDropdown() {
  return (
    <AnimatedDropdown
      trigger={
        <>
          <p className="text-text-md font-regular [&&]:max-sm:text-text-xs">
            최신순
          </p>
          <div className="relative h-6 w-6">
            <Image
              fill
              src="/icons/icon-toggle.svg"
              alt="정렬 펼치기"
              priority
            />
          </div>
        </>
      }
      closeOnClick
      buttonProps={{
        className:
          "flex h-fit transition-colors duration-100 w-30 items-center justify-between rounded-xl bg-background-secondary px-3.5 py-2.5 focus:bg-background-tertiary [&&]:max-sm:w-[5.875rem] [&&]:max-sm:rounded-lg [&&]:max-sm:p-2",
        name: "정렬",
      }}
      menuClassName="border border-solid border-border-primary right-0 top-13 bg-background-secondary flex flex-col text-text-md font-regular w-full [&&]:max-sm:text-text-xs [&&]:max-sm:rounded-lg [&&]:max-sm:top-[2.875rem]"
    >
      <DropdownItem
        onClick={() => {}}
        itemClassName="transition-colors flex items-center duration-100 px-3.5 hover:bg-background-tertiary rounded-t-xl h-10 [&&]:max-sm:rounded-t-lg [&&]:max-sm:text-text-xs [&&]:max-sm:px-2"
      >
        최신순
      </DropdownItem>
      <DropdownItem
        onClick={() => {}}
        itemClassName="transition-colors flex items-center duration-100 px-3.5 hover:bg-background-tertiary rounded-b-xl h-10 [&&]:max-sm:rounded-b-lg [&&]:max-sm:text-text-xs [&&]:max-sm:px-2"
      >
        좋아요 많은순
      </DropdownItem>
    </AnimatedDropdown>
  );
}
