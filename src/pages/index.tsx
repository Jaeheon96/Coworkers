import Main from "@/components/PageComponents/home/Main";
import Content from "@/components/PageComponents/home/Content";
import Footer from "@/components/PageComponents/home/Footer";
import Head from "next/head";
import { COWORKERS_TITLE } from "@/lib/constants/sharedConstants";

export default function Home() {
  return (
    <>
      <Head>
        <title>{COWORKERS_TITLE}</title>
      </Head>
      <main>
        <Main />
        <Content />
      </main>
      <Footer />
    </>
  );
}
