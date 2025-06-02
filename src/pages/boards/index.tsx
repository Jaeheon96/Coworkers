import Head from "next/head";
import BoardsInterface from "@/components/PageComponents/boards/BoardsInterface";
import { BoardsDataProvider } from "@/core/context/BoardsDataProvider";
import {
  COWORKERS_BASE_DESCRIPTION,
  COWORKERS_TITLE,
} from "@/lib/constants/sharedConstants";

export default function Boards() {
  return (
    <>
      <Head>
        <title>{`${COWORKERS_TITLE} - 자유게시판`}</title>
        <meta name="description" content="코워커스 자유게시판" />
        <meta
          name="keyword"
          content="팀, 투두리스트, 일정관리, 코워커스, 자유게시판, team, to-do list, schedule, Coworkers, boards, articles"
        />

        <meta property="og:title" content={`${COWORKERS_TITLE} - 자유게시판`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={COWORKERS_BASE_DESCRIPTION} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}/boards`}
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${COWORKERS_TITLE} - 자유게시판`}
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`}
        />
        <meta name="twitter:description" content="코워커스 자유게시판" />
      </Head>
      <BoardsDataProvider>
        <BoardsInterface />
      </BoardsDataProvider>
    </>
  );
}
