import InvalidRequest from "@/components/@shared/UI/invalidRequest";

export default function serverError() {
  return (
    <InvalidRequest>
      <p>요청을 수행하던 중 오류가 발생했습니다.</p>
      <p>잠시 후 다시 시도해주세요.</p>
    </InvalidRequest>
  );
}
