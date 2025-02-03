import { InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import InputAlt from "./InputAlt";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export default function PasswordInput(props: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div
        className="peer absolute right-4 top-3 h-6 w-6 cursor-pointer [&&]:max-sm:top-2.5"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        <Image
          fill
          src={`/icons/icon-visibility_${isVisible ? "on" : "off"}.svg`}
          alt="가시성 토글"
        />
      </div>
      <InputAlt
        type={isVisible ? "text" : "password"}
        className="pr-11 peer-hover:border-interaction-hover"
        {...props}
      />
    </div>
  );
}
