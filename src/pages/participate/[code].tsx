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

  const { mutate } = useMutation({
    mutationFn: postInvitationAccept,
    onSuccess: (res) => {
      replace(`/${res.groupId}`);
      getMe();
    },
    onError: () => {
      replace("/wrongteam");
    },
  });

  useEffect(() => {
    if (userEmail && token) mutate({ userEmail, token });
  }, [userEmail, token]);

  return null;
}
