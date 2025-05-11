export interface Writer {
  nickname: string;
  id: number;
}

export interface ArticlePost {
  title: string;
  content: string;
  image?: string;
}

export interface ArticlePostResponse {
  id: number;
  title: string;
  image: string | null;
  writer: Writer;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}
