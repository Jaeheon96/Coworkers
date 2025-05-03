import InvalidRequest from "@/components/@shared/UI/invalidRequest";

export default function Wrongteam() {
  return (
    <InvalidRequest>
      <p>유효하지 않은 초대입니다.</p>
      <p>초대 코드의 만료기간이 지나지 않았는지 확인해 주세요.</p>
    </InvalidRequest>
  );
}
