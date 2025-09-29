import { useEffect } from "react";
import Script from "next/script";

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

export default function GoogleLogin() {
  useEffect(() => {
    window.handleCredentialResponse = (credentialResponse) => {
      console.log(credentialResponse);
    };
  }, []);

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
