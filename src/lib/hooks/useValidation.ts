import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import checkEmailFormat from "../utils/checkEmailFormat";
import checkPasswordFormat from "../utils/checkPasswordFormat";

interface Form {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function useValidation(
  handleErrorChange: (key: string, value: string | null) => void,
  form?: Form,
) {
  const [isConfirmationTouched, setIsConfirmationTouched] = useState(false);

  const checkEmailError = (email: string) => {
    if (email.length <= 0) return "이메일은 필수 입력입니다.";
    if (!checkEmailFormat(email)) return "이메일 형식으로 입력해주세요.";
    return null;
  };

  const checkNicknameError = (nickname: string) => {
    if (nickname.length <= 0) return "닉네임은 필수 입력입니다.";
    if (nickname.length > 20) return "닉네임은 최대 20자까지 가능합니다.";
    return null;
  };

  const checkPasswordError = (password: string) => {
    if (password.length <= 0) return "비밀번호는 필수 입력입니다.";
    if (!checkPasswordFormat(password))
      return "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.";
    if (password.length < 8) return "비밀번호는 최소 8자 이상입니다.";
    return null;
  };

  const checkPasswordConfirmationError = () => {
    if (form) {
      if (form.passwordConfirmation.length <= 0) {
        handleErrorChange(
          "passwordConfirmation",
          "비밀번호 확인을 입력해주세요.",
        );
        return;
      }
      if (form.password !== form.passwordConfirmation) {
        handleErrorChange(
          "passwordConfirmation",
          "비밀번호가 일치하지 않습니다.",
        );
        return;
      }
      handleErrorChange("passwordConfirmation", null);
    }
  };

  const handleConfirmationFocus = () => {
    setIsConfirmationTouched(true);
  };

  const handleConfirmationBlur = () => {
    if (isConfirmationTouched) checkPasswordConfirmationError();
  };

  useEffect(() => {
    if (isConfirmationTouched) {
      checkPasswordConfirmationError();
    }
  }, [form?.password, form?.passwordConfirmation]);

  const fieldErrorPair: Record<string, (arg: string) => string | null> = {
    email: checkEmailError,
    nickname: checkNicknameError,
    password: checkPasswordError,
  };

  const handleValidation = (
    e: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.name === "passwordConfirmation") {
      return;
    }
    handleErrorChange(
      e.target.name,
      fieldErrorPair[e.target.name](e.target.value),
    );
  };

  return { handleValidation, handleConfirmationFocus, handleConfirmationBlur };
}
