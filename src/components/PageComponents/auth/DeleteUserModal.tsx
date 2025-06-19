import { useEffect, useState } from "react";
import WarningModal from "../team/WarningModal";
import VerifyUserModal from "./VerifyUserModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteUserModal({ isOpen, onClose }: Props) {
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  useEffect(() => {
    if (isOpen) setIsVerifyOpen(false);
  }, [isOpen]);

  if (isVerifyOpen)
    return <VerifyUserModal isOpen={isOpen} onClose={onClose} />;

  return (
    <WarningModal
      modalName="deleteUserModal"
      onClick={() => {
        setIsVerifyOpen(true);
      }}
      message="정말 탈퇴하시겠습니까?"
    />
  );
}
