export interface Writer {
  nickname: string;
  id: number;
}

export interface ArticlePost {
  title: string;
  content: string;
  image?: string;
}

export interface ArticleAbstract {
  id: number;
  title: string;
  image: string | null;
  writer: Writer;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticlesResponse {
  list: ArticleAbstract[];
  totalCount: number;
}

export type ArticlesOrderBy = "recent" | "like";

export interface GetArticlesQuery {
  page?: number;
  pageSize?: number;
  orderBy?: ArticlesOrderBy;
  keyword?: string;
}

export interface ArticleResponse extends ArticleAbstract {
  content: string;
  isLiked: boolean | null;
  commentCount: number;
}
