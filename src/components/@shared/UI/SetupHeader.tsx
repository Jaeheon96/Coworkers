import Image from "next/image";
import Link from "next/link";

export default function SetupHeader() {
  return (
    <header className="fixed top-0 z-40 flex h-[3.75rem] w-full items-center justify-between border-b border-border-primary bg-background-secondary px-[22.5rem] max-md:px-6 max-sm:px-4">
      <Link href="/">
        <div className="flex items-center gap-0.5">
          <div className="relative h-6 w-6 max-md:h-4 max-md:w-4">
            <Image fill src="icons/icon-logo.svg" alt="로고" />
          </div>
          <div className="relative h-8 w-[8.25rem] max-md:h-5 max-md:w-[5.25rem]">
            <Image fill src="icons/icon-title.svg" alt="타이틀" />
          </div>
        </div>
      </Link>
    </header>
  );
}
