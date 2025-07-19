import { useAuth } from "@/core/context/AuthProvider";
import Image from "next/image";
import Link from "next/link";

export default function AddBoardsButton() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <Link
      className="fixed bottom-11 right-12 flex h-12 items-center justify-center gap-1 rounded-4xl bg-brand-primary px-5 text-text-lg text-white transition duration-100 hover:scale-110 [&&]:max-md:right-6 [&&]:max-sm:right-4"
      href="/addboard"
    >
      <div className="relative h-4 w-4">
        <Image src="/icons/icon-plus.svg" fill alt="게시글 쓰기" />
      </div>
      글쓰기
    </Link>
  );
}
