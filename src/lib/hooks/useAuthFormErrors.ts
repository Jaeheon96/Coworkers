import { useState } from "react";
import handleAuthInputBlur from "../utils/handleAuthInputBlur";
import handleLoginError from "../utils/handleLoginError";

interface Errors {
  email: string | null;
  nickname: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}

interface Form {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function useAuthFormErrors(form?: Form) {
  const [errors, setErrors] = useState<Errors>({
    email: null,
    nickname: null,
    password: null,
    passwordConfirmation: null,
  });

  const handleErrorChange = (key: string, value: string | null) => {
    setErrors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBlur = handleAuthInputBlur(handleErrorChange, form);
  const handleLoginResponseError = handleLoginError(handleErrorChange);

  return { errors, handleBlur, handleLoginResponseError };
}
