import { useState } from "react";
import Image from "next/image";
import { ArticleComment } from "@/core/dtos/boards/boards";
import { useAuth } from "@/core/context/AuthProvider";
import CommentMenuDropdown from "./CommentMenuDropdown";
import PatchArticleCommentForm from "./PatchArticleCommentForm";

interface Props {
  comment: ArticleComment;
}

export default function ArticleCommentCard({ comment }: Props) {
  const { user } = useAuth();
  const [isPatchFormOpen, setIsPatchFormOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-8 rounded-lg bg-background-secondary px-6 py-5 [&&]:max-sm:p-4">
      {isPatchFormOpen ? (
        <PatchArticleCommentForm
          commentId={comment.id}
          defaultContent={comment.content}
          handlePatchFormClose={() => {
            setIsPatchFormOpen(false);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between gap-2">
            <p className="text-text-lg font-regular [&&]:max-sm:text-text-md">
              {comment.content}
            </p>
            {user?.id === comment.writer.id ? (
              <CommentMenuDropdown
                handlePatchFormOpen={() => {
                  setIsPatchFormOpen(true);
                }}
                commentId={comment.id}
              />
            ) : null}
          </div>
          <div className="flex items-center gap-4 [&&]:max-sm:gap-2">
            <div className="flex items-center gap-3 [&&]:max-sm:gap-1.5">
              <div className="relative h-8 w-8">
                <Image
                  fill
                  src={
                    comment.writer.image ?? "/icons/icon-default_profile.svg"
                  }
                  alt="댓글 작성자 프로필 이미지"
                />
              </div>
              <p className="border-r border-slate-700 pr-4 text-text-md font-medium [&&]:max-sm:pr-2 [&&]:max-sm:text-text-xs">
                {comment.writer.nickname}
              </p>
            </div>
            <p className="text-text-md font-medium text-slate-400 [&&]:max-sm:text-text-xs">
              {`${comment.createdAt.slice(0, 4)}. ${comment.createdAt.slice(5, 7)}. ${comment.createdAt.slice(8, 10)}`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
