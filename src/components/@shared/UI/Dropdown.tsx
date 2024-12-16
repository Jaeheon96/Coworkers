import useClickOutside from "@/lib/hooks/useClickOutSide";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  children: ReactNode;
  trigger: ReactNode;
  menuClassName?: string;
  disabled?: boolean;
  closeOnClick?: boolean;
}

export default function Dropdown({
  trigger,
  children,
  menuClassName,
  disabled = false,
  closeOnClick,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBoxClick = (e?: React.MouseEvent) => {
    if (closeOnClick) toggleDropdown(e);
  };

  const dropDownRef = useClickOutside(handleClose);
  const menuClassCombined = twMerge("absolute rounded-xl z-10", menuClassName);

  return (
    <div
      ref={dropDownRef}
      className="relative flex items-center"
      onClick={handleBoxClick}
    >
      <button type="button" onClick={toggleDropdown} disabled={disabled}>
        {trigger}
      </button>
      {isOpen && <ul className={menuClassCombined}>{children}</ul>}
    </div>
  );
}
