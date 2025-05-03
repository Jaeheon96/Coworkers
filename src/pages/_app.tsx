/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { AuthProvider } from "@/core/context/AuthProvider";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Header from "@/components/@shared/UI/Header";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000,
            throwOnError: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <ToastContainer
          toastClassName="[&&]:bg-background-secondary"
          bodyClassName="text-text-primary font-sans text-text-md"
          position="top-center"
          autoClose={1000}
          pauseOnHover
          limit={1}
          theme="dark"
          closeOnClick
        />
        <div className="pt-15">
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
