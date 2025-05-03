import useClickOutside from "@/lib/hooks/useClickOutSide";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  children: ReactNode;
  trigger: ReactNode;
  menuClassName?: string;
  disabled?: boolean;
  closeOnClick?: boolean;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  motionProps?: HTMLMotionProps<"ul">;
}

export default function AnimatedDropdown({
  trigger,
  children,
  menuClassName,
  disabled = false,
  closeOnClick,
  buttonProps,
  motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: "100%" },
    exit: { opacity: 0 },
    transition: { duration: 0.1 },
  },
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
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        {...buttonProps}
      >
        {trigger}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul {...motionProps} className={menuClassCombined}>
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
