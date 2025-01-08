import emailjs from "@emailjs/browser";
import Button from "@/components/@shared/UI/Button";
import Input from "@/components/@shared/UI/Input";
import Modal from "@/components/@shared/UI/Modal/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GroupResponse } from "@/core/dtos/group/group";
import getInvitationCode from "@/core/api/group/getInvitationCode";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  team: GroupResponse;
}

export default function MailInviteModal({ isOpen, onClose, team }: Props) {
  const [email, setEmail] = useState("");

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const { mutate: sendInvitation } = useMutation({
    mutationFn: async () => {
      const invitationCode = await getInvitationCode(`${team.id}`);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        {
          to_name: "none",
          from_name: team.name,
          message: `https://${process.env.NEXT_PUBLIC_URL}/participate/${invitationCode}`,
          reply_to: "codeitfe0402@gmail.com",
          to_email: email,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY },
      );
    },
    onError: (error) => {
      alert("메일 발송중 오류 발생: 오류 정보는 콘솔 확인");
      console.error(error);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendInvitation();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <form
        className="flex w-[22rem] flex-col gap-6 px-9"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-center text-text-lg font-medium text-text-primary">
            이메일로 초대 보내기
          </h3>
          <Input className="w-full" onChange={handleEmailInputChange} />
        </div>
        <Button type="submit" variant="solid" size="large">
          보내기
        </Button>
      </form>
    </Modal>
  );
}
