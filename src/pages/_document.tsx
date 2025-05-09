import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script> */}
      </Head>
      <body className="font-pretendard bg-background-primary text-text-primary antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
