import { Membership } from "@/core/dtos/user/membership";
import { allowScroll, preventScroll } from "@/lib/utils/lockScroll";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createPortal } from "react-dom";

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
  const { query } = useRouter();

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
    return undefined;
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-40 h-screen w-screen bg-black/50"
      onClick={handleClose}
    >
      <div
        className="flex h-full max-w-[12.75rem] flex-col gap-9 bg-background-secondary p-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="relative h-6 w-6 cursor-pointer self-end"
          onClick={handleClose}
        >
          <Image fill src="/icons/icon-x.svg" alt="닫기" />
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
                        "/images/image-defaultProfile.png"
                      }
                      className="rounded-md"
                      alt="팀이미지"
                    />
                  </div>
                  <p className={teamNameClass}>{membership.group.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
