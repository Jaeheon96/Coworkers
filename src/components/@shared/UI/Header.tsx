import { useAuth } from "@/core/context/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Dropdown from "./Dropdown";
import DropdownItem from "./Item";
import NavSidebar from "./NavSidebar";

export default function Header() {
  const { isPending, user, logout } = useAuth();
  const { pathname, query } = useRouter();
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <>
      <header className="fixed top-0 z-30 flex h-[3.75rem] w-full items-center justify-between border-b border-border-primary bg-background-secondary px-[22.5rem] max-md:px-6 max-sm:px-4">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div
              className="relative hidden h-6 w-6 cursor-pointer max-sm:block"
              onClick={() => setIsNavSidebarOpen(true)}
            >
              <Image fill src="icons/icon-gnb_menu.svg" alt="메뉴" />
            </div>
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
          </div>
          {!isPending && user && (
            <Dropdown
              trigger={
                <div className="flex items-center gap-2.5 text-text-lg font-medium max-sm:hidden">
                  <p className="max-w-36 truncate">
                    {user.memberships.find(
                      (team) => `${team.groupId}` === query.teamId,
                    )?.group.name ?? "내가 속한 팀"}
                  </p>
                  <div className="relative h-4 w-4">
                    <Image fill src="icons/icon-arrow_down.svg" alt="펼치기" />
                  </div>
                </div>
              }
              menuClassName="border border-solid border-border-primary bg-background-secondary p-4 left-0 top-12 flex flex-col gap-4 text-text-lg font-medium w-[13.625rem] max-sm:hidden"
            >
              <div className="flex max-h-64 flex-col gap-2 overflow-hidden hover:overflow-y-auto">
                {user.memberships.map((team) => (
                  <Link href={`/${team.groupId}`} key={team.groupId}>
                    <DropdownItem itemClassName="flex w-full items-center gap-3 rounded-lg p-2">
                      <div className="relative h-8 w-8 shrink-0 rounded-md">
                        <Image
                          fill
                          src={
                            team.group.image ??
                            "/images/image-defaultProfile.png"
                          }
                          className="rounded-md"
                          alt="팀"
                        />
                      </div>
                      <p className="truncate">{team.group.name}</p>
                    </DropdownItem>
                  </Link>
                ))}
              </div>
              <Link href="/addteam">
                <DropdownItem itemClassName="rounded-xl border border-solid border-slate-50 w-full h-12 flex justify-center gap-1 items-center">
                  <div className="relative h-4 w-4">
                    <Image fill src="icons/icon-plus.svg" alt="추가" />
                  </div>
                  팀 추가하기
                </DropdownItem>
              </Link>
            </Dropdown>
          )}
        </div>
        {!isPending && !user && (
          <div className="flex items-center gap-4">
            <Link
              href="login"
              className="text-text-lg font-semibold max-md:text-text-md"
            >
              로그인
            </Link>
            <Link
              href="signup"
              className="text-text-lg font-semibold max-md:text-text-md max-sm:hidden"
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
                <p className="text-text-md font-medium max-md:hidden">
                  {user.nickname}
                </p>
              </div>
            }
            menuClassName="border border-solid border-border-primary right-0 top-8 bg-background-secondary px-6 flex flex-col text-text-lg font-regular w-max max-sm:text-text-md max-sm:px-5"
          >
            <Link href="myhistory">
              <DropdownItem
                onClick={() => {}}
                itemClassName="py-3.5 text-center max-sm:py-3"
              >
                마이 히스토리
              </DropdownItem>
            </Link>
            <DropdownItem
              onClick={() => {}}
              itemClassName="py-3.5 text-center max-sm:py-3"
            >
              계정 설정
            </DropdownItem>
            <DropdownItem
              onClick={() => {}}
              itemClassName="py-3.5 text-center max-sm:py-3"
            >
              팀 참여
            </DropdownItem>
            <DropdownItem
              onClick={logout}
              itemClassName="py-3.5 text-center max-sm:py-3"
            >
              로그아웃
            </DropdownItem>
          </Dropdown>
        )}
      </header>
      <NavSidebar
        isOpen={isNavSidebarOpen}
        handleClose={() => setIsNavSidebarOpen(false)}
        memberships={user?.memberships ?? []}
      />
    </>
  );
}
