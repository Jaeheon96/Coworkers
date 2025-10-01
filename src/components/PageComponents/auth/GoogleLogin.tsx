import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/core/context/AuthProvider";
import { routerQueries } from "@/core/types/queries";
import { ErrorData } from "@/core/types/standardError";

interface Props {
  handleLoginResponseError: (errorData: ErrorData) => void;
}

interface CredentialResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    handleCredentialResponse: (credentialResponse: CredentialResponse) => void;
  }
}

export default function GoogleLogin({ handleLoginResponseError }: Props) {
  const { query, push } = useRouter();
  const { oAuthLogin } = useAuth();

  const { mutate: requestOAuthLogin } = useMutation({
    mutationFn: oAuthLogin,
    throwOnError: false,
    onSuccess: () => {
      const dir = query[routerQueries.loginDirection];
      const to = typeof dir === "string" ? dir : "/";
      push(to);
    },
    onError: (e: AxiosError) => {
      handleLoginResponseError(e.response?.data as ErrorData);
    },
  });

  useEffect(() => {
    window.handleCredentialResponse = (credentialResponse) => {
      const form = { token: credentialResponse.credential };
      requestOAuthLogin({ provider: "GOOGLE", form });
    };
  }, [requestOAuthLogin]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async />
      <div
        id="g_id_onload"
        data-client_id="112842505799-lb8flu1ep269f9bksgkeos4v6a7rj0kh.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCredentialResponse"
        data-auto_prompt="false"
      />
      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="circle"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
      />
    </>
  );
}
