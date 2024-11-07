import Image from "next/image";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import DropdownItem from "./Item";

export default function Profile() {
  const router = useRouter();
  const profileImageUrl = "/icons/icon-user.png";

  // 드롭다운 항목 클릭 핸들러 정의 -> 수정 예정
  const handleMyHistoryClick = () => {
    router.push("/");
  };

  const handleJoinTeamClick = () => {
    router.push("/");
  };

  return (
    <Dropdown
      trigger={
        <Image
          src={profileImageUrl}
          width={24}
          height={24}
          alt="프로필 이미지"
          className="flex cursor-pointer rounded-full"
        />
      }
      menuClassName="border-opacity-10 absolute top-full mt-2 z-10 w-[140px] max-h-[200px] overflow-y-auto border border-border-primary bg-background-secondary"
    >
      <DropdownItem
        onClick={handleMyHistoryClick}
        itemClassName="px-4 py-2 text-center text-md font-regular text-text-primary"
      >
        마이 히스토리
      </DropdownItem>

      <DropdownItem
        onClick={handleJoinTeamClick}
        itemClassName="px-4 py-2 text-center text-md font-regular text-text-primary"
      >
        팀 참여
      </DropdownItem>
    </Dropdown>
  );
}
