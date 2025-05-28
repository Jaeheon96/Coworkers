import InvalidRequest from "@/components/@shared/UI/invalidRequest";
import EditArticleForm from "@/components/PageComponents/article/EditArticleForm";
import EditArticleLoading from "@/components/PageComponents/article/EditArticleLoading";
import getArticle from "@/core/api/boards/getArticle";
import { useAuth } from "@/core/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function EditArticle() {
  const { user, isPending: isAuthPending } = useAuth(true);

  const { query } = useRouter();
  const id = query.id as string;

  const { data: article, isError } = useQuery({
    queryKey: ["Article", +id],
    queryFn: () => getArticle(id),
    staleTime: Infinity,
    gcTime: 0,
    throwOnError: false,
  });

  console.log(article);

  if (isError)
    return <InvalidRequest>게시글을 불러오는데 실패했습니다.</InvalidRequest>;
  if (!article || isAuthPending) return <EditArticleLoading />;
  if (article.writer.id !== user?.id)
    return (
      <InvalidRequest>게시글은 작성자만 수정할 수 있습니다.</InvalidRequest>
    );

  return <EditArticleForm article={article} />;
}
