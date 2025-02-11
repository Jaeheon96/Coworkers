import { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  errorMessage?: string | null;
}

export default function InputLabel({
  className,
  label,
  children,
  errorMessage,
  ...props
}: Props) {
  const classCombined = twMerge(
    "flex w-full flex-col gap-3 text-lg font-medium text-text-primary relative",
    className,
  );

  return (
    <label className={classCombined} {...props}>
      {label}
      {children}
      <span className="absolute bottom-[-1.5625rem] text-text-md font-medium text-status-danger [&&]:max-sm:bottom-[-1.8125rem]">
        {errorMessage}
      </span>
    </label>
  );
}
