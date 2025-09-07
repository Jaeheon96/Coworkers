import Head from "next/head";
import { ArticleResponse } from "@/core/dtos/boards/boards";
import { COWORKERS_TITLE } from "@/lib/constants/sharedConstants";

interface Props {
  article: ArticleResponse;
}

export default function ArticlePageHead({ article }: Props) {
  return (
    <Head>
      <title>{`${COWORKERS_TITLE} - ${article.title}`}</title>
      <meta
        name="description"
        content={`코워커스 자유게시판 게시글: ${article.title}`}
      />
      <meta
        name="keyword"
        content="팀, 투두리스트, 일정관리, 코워커스, 자유게시판, 게시글, team, to-do list, schedule, Coworkers, article"
      />

      <meta
        property="og:title"
        content={`${COWORKERS_TITLE} - ${article.title}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={article.content} />
      <meta
        property="og:image"
        content={
          article.image ??
          `${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`
        }
      />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_URL}/boards/${article.id}`}
      />

      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content={`${COWORKERS_TITLE} - ${article.title}`}
      />
      <meta
        name="twitter:image"
        content={
          article.image ??
          `${process.env.NEXT_PUBLIC_URL}/icons/icon-logo_coworkers_large.png`
        }
      />
      <meta name="twitter:description" content={article.content} />
    </Head>
  );
}
