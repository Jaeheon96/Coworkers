import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export default function InputAlt({ className, isError, ...props }: Props) {
  const classnameCombined = twMerge(
    `w-full h-12 rounded-xl ${isError ? "border-status-danger" : "border-border-primary"} bg-background-secondary px-4 placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none [&&]:max-sm:h-11`,
    className,
  );

  return <input className={classnameCombined} {...props} />;
}
