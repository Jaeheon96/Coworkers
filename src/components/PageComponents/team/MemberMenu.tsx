import Image from "next/image";
import DropdownItem from "@/components/@shared/UI/Item";
import AnimatedDropdown from "@/components/@shared/UI/AnimatedDropdown";
import useModalStore from "@/lib/hooks/stores/modalStore";
import MemberProfileModal from "./MemberProfileModal";

interface Props {
  image: string;
  name: string;
  email: string;
}

export default function MemberMenu({ image, name, email }: Props) {
  const profileModalName = `${email}ProfileModal`;

  const isProfileOpen = useModalStore(
    (state) => state.modals[profileModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <>
      <AnimatedDropdown
        trigger={
          <div className="relative h-4 w-4">
            <Image fill src="/icons/icon-kebab.svg" alt="메뉴" />
          </div>
        }
        menuClassName="flex flex-col text-text-primary font-regular text-text-md w-30 bg-background-secondary border border-solid border-border-primary right-0 top-6"
      >
        <DropdownItem
          onClick={() => openModal(profileModalName)}
          itemClassName="transition-colors duration-100 h-10 flex justify-center items-center rounded-xl hover:bg-background-tertiary"
        >
          프로필 보기
        </DropdownItem>
      </AnimatedDropdown>
      <MemberProfileModal
        isOpen={isProfileOpen}
        onClose={() => closeModal(profileModalName)}
        image={image}
        name={name}
        email={email}
      />
    </>
  );
}
