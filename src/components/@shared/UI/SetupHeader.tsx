import Image from "next/image";
import Link from "next/link";

export default function SetupHeader() {
  return (
    <header className="h-15 fixed top-0 z-30 flex w-full justify-center border-b border-border-primary bg-background-secondary px-6 [&&]:max-sm:px-4">
      <div className="w-300 flex h-full items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-0.5">
            <div className="relative h-6 w-6 [&&]:max-md:h-4 [&&]:max-md:w-4">
              <Image fill src="icons/icon-logo.svg" alt="로고" />
            </div>
            <div className="[&&]:max-md:w-21 w-33 relative h-8 [&&]:max-md:h-5">
              <Image fill src="icons/icon-title.svg" alt="타이틀" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
