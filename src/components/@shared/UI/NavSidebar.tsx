import { Membership } from "@/core/dtos/user/membership";
import { allowScroll, preventScroll } from "@/lib/utils/lockScroll";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  memberships: Membership[];
}

export default function NavSidebar({
  isOpen,
  handleClose,
  memberships,
}: Props) {
  const { query, pathname } = useRouter();

  const boardsClassName = `text-text-md font-medium${pathname === "/boards" ? " text-brand-primary" : ""}`;

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
    return undefined;
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: "100%" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className="fixed inset-0 z-40 h-screen w-screen bg-black/50"
          onClick={handleClose}
        >
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.2,
              bounce: 0,
            }}
            className="flex h-full max-w-[12.75rem] flex-col gap-9 bg-background-secondary p-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="relative h-6 w-6 cursor-pointer self-end"
              onClick={handleClose}
            >
              <Image fill src="/icons/icon-x.svg" alt="닫기" priority />
            </div>
            <div className="flex h-full w-full flex-col gap-6 overflow-y-auto">
              {memberships.map((membership) => {
                const teamNameClass = `truncate text-text-md font-medium ${query.teamId === `${membership.groupId}` ? "text-brand-primary" : "text-text-primary"}`;
                return (
                  <Link
                    key={membership.groupId}
                    href={`/${membership.groupId}`}
                    onClick={handleClose}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-6 w-6 shrink-0">
                        <Image
                          fill
                          src={
                            membership.group.image ??
                            "/icons/icon-default_profile.svg"
                          }
                          className="rounded-md"
                          alt="팀이미지"
                          priority
                        />
                      </div>
                      <p className={teamNameClass}>{membership.group.name}</p>
                    </div>
                  </Link>
                );
              })}
              <Link href="/boards" onClick={handleClose}>
                <p className={boardsClassName}>자유게시판</p>
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
