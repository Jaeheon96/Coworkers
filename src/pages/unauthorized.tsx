import InvalidRequest from "@/components/@shared/UI/invalidRequest";

export default function Unauthorized() {
  return (
    <InvalidRequest login>
      <p>로그인이 필요한 서비스입니다.</p>
      <p>로그인 하시겠습니까?</p>
    </InvalidRequest>
  );
}
