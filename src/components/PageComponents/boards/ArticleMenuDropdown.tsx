import AnimatedDropdown from "@/components/@shared/UI/AnimatedDropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";

export default function ArticleMenuDropdown() {
  return (
    <AnimatedDropdown
      trigger={
        <div className="relative h-6 w-6">
          <Image fill src="/icons/icon-kebab.svg" alt="게시글 메뉴" />
        </div>
      }
      closeOnClick
      buttonProps={{
        name: "게시글 메뉴",
      }}
      menuClassName="border border-solid border-border-primary right-0 bottom-full bg-background-secondary flex flex-col text-text-md font-regular w-30 [&&]:max-sm:text-text-xs [&&]:max-sm:rounded-lg [&&]:max-sm:top-[2.875rem]"
    >
      <DropdownItem
        onClick={() => {}}
        itemClassName="transition-colors flex items-center justify-center duration-100 hover:bg-background-tertiary rounded-t-xl h-10 [&&]:max-sm:rounded-t-lg [&&]:max-sm:text-text-xs"
      >
        수정하기
      </DropdownItem>
      <DropdownItem
        onClick={() => {}}
        itemClassName="transition-colors flex items-center duration-100 justify-center hover:bg-background-tertiary rounded-b-xl h-10 [&&]:max-sm:rounded-b-lg [&&]:max-sm:text-text-xs"
      >
        삭제하기
      </DropdownItem>
    </AnimatedDropdown>
  );
}
