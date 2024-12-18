import { useAuth } from "@/core/context/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./Dropdown";
import DropdownItem from "./Item";

export default function Header() {
  const { isPending, user, logout } = useAuth();

  return (
    <header className="fixed top-0 z-40 flex h-[3.75rem] w-full items-center justify-between border-b border-border-primary bg-background-secondary px-[22.5rem] sm:px-4 md:px-6">
      <Link href="/">
        <div className="flex items-center gap-0.5">
          <div className="relative h-6 w-6 sm:h-4 sm:w-4 md:h-4 md:w-4">
            <Image fill src="icons/icon-logo.svg" alt="로고" />
          </div>
          <div className="relative h-8 w-[8.25rem] sm:h-5 sm:w-[5.25rem] md:h-5 md:w-[5.25rem]">
            <Image fill src="icons/icon-title.svg" alt="타이틀" />
          </div>
        </div>
      </Link>
      {!isPending && !user && (
        <div className="flex items-center gap-4">
          <Link
            href="login"
            className="text-text-lg font-semibold sm:text-text-md md:text-text-md"
          >
            로그인
          </Link>
          <Link
            href="signup"
            className="block text-text-lg font-semibold sm:hidden md:text-text-md"
          >
            회원가입
          </Link>
        </div>
      )}
      {!isPending && user && (
        <Dropdown
          trigger={
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-4">
                <Image
                  fill
                  src={user.image ?? "icons/icon-user.svg"}
                  alt="프로필"
                />
              </div>
              <p className="block text-text-md font-medium sm:hidden md:hidden">
                {user.nickname}
              </p>
            </div>
          }
          menuClassName="border border-solid border-border-primary right-0 top-8 bg-background-secondary px-6 flex flex-col text-text-lg font-regular w-max sm:text-text-md sm:px-5"
        >
          <Link href="myhistory">
            <DropdownItem
              onClick={() => {}}
              itemClassName="py-3.5 text-center sm:py-3"
            >
              마이 히스토리
            </DropdownItem>
          </Link>
          <DropdownItem
            onClick={() => {}}
            itemClassName="py-3.5 text-center sm:py-3"
          >
            계정 설정
          </DropdownItem>
          <DropdownItem
            onClick={() => {}}
            itemClassName="py-3.5 text-center sm:py-3"
          >
            팀 참여
          </DropdownItem>
          <DropdownItem
            onClick={logout}
            itemClassName="py-3.5 text-center sm:py-3"
          >
            로그아웃
          </DropdownItem>
        </Dropdown>
      )}
    </header>
  );
}
