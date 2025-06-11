import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import postInvitationAccept from "@/core/api/group/postInvitationAccept";
import { useAuth } from "@/core/context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AcceptInvite() {
  const { user, getMe } = useAuth(true);
  const { replace, query } = useRouter();

  const userEmail = user?.email;
  const token = query.code as string;

  const { mutate, isError } = useMutation({
    mutationFn: postInvitationAccept,
    onSuccess: (res) => {
      replace(`/${res.groupId}`);
      getMe();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (userEmail && token) mutate({ userEmail, token });
  }, [userEmail, token]);

  if (isError)
    return (
      <InvalidRequest>
        <p>유효하지 않은 초대입니다.</p>
        <p>초대 기간이 만료되었을 수 있습니다.</p>
      </InvalidRequest>
    );

  return (
    <main className="flex h-123 items-center justify-center">
      <p className="mt-40 text-text-md font-medium">참여 요청중...</p>
    </main>
  );
}
