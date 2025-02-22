import { useState } from "react";
import handleLoginError from "../utils/handleLoginError";
import useValidation from "./useValidation";
import handleSignupError from "../utils/handleSignupError";

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

  const { handleValidation, handleConfirmationFocus, handleConfirmationBlur } =
    useValidation(handleErrorChange, form);

  const handleLoginResponseError = handleLoginError(handleErrorChange);
  const handleSignupResponseError = handleSignupError(handleErrorChange);

  return {
    errors,
    handleValidation,
    handleConfirmationFocus,
    handleConfirmationBlur,
    handleLoginResponseError,
    handleSignupResponseError,
  };
}
