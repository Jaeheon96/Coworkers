import InvalidRequest from "@/components/@shared/UI/invalidRequest";

export default function notFound() {
  return (
    <InvalidRequest>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
    </InvalidRequest>
  );
}
