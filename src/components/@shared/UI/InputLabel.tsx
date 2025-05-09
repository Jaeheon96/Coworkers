import { LabelHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: ReactNode;
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
    "flex w-full flex-col gap-3 text-text-lg font-medium text-text-primary relative",
    className,
  );

  return (
    <label className={classCombined} {...props}>
      {label}
      {children}
      <span className="absolute -bottom-6.25 text-text-md font-medium text-status-danger [&&]:max-sm:-bottom-7.25">
        {errorMessage}
      </span>
    </label>
  );
}
