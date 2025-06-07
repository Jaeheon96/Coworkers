import { ButtonHTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outlined";
  size?: "large" | "x-small";
}

interface Props extends ButtonProps {
  isPending: boolean;
  disabled?: boolean;
  classname?: string;
  children: ReactNode;
  imageContainerClass?: string;
  imageClass?: string;
}

export default function LoadingButton({
  isPending,
  children,
  disabled,
  className,
  imageContainerClass,
  imageClass,
  ...rest
}: Props) {
  const imageContatinerClassName = twMerge(
    "relative h-6 w-6 animate-spin",
    imageContainerClass,
  );
  const pendingClassName = `${isPending ? "[&&]:disabled:bg-interaction-pressed" : ""}`;

  const buttonClassname = twMerge(pendingClassName, className);

  return (
    <Button
      variant="solid"
      size="large"
      type="submit"
      disabled={isPending || disabled}
      className={buttonClassname}
      {...rest}
    >
      {isPending ? (
        <div className="flex w-full justify-center">
          <div className={imageContatinerClassName}>
            <Image
              fill
              src="/icons/icon-ongoing.svg"
              alt="처리중..."
              className={imageClass}
            />
          </div>
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
