import { LabelHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: ReactNode;
  errorMessage?: string | null;
  errorClassName?: string;
}

export default function InputLabel({
  className,
  label,
  children,
  errorMessage,
  errorClassName,
  ...props
}: Props) {
  const classCombined = twMerge(
    "flex w-full flex-col gap-3 text-text-lg font-medium text-text-primary relative",
    className,
  );

  const errorClassCombined = twMerge(
    "absolute -bottom-6.25 text-text-md font-medium text-status-danger [&&]:max-sm:-bottom-7.25",
    errorClassName,
  );

  return (
    <label className={classCombined} {...props}>
      {label}
      {children}
      <span className={errorClassCombined}>{errorMessage}</span>
    </label>
  );
}
