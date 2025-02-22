import { ErrorData } from "@/core/types/standardError";

export default function handleSignupError(
  handleErrorChange: (key: string, value: string | null) => void,
) {
  const emailErrors = ["이미 사용중인 이메일입니다."];
  const nicknameErrors = ["이미 사용중인 닉네임입니다."];
  const passwordErrors = ["비밀번호 형식이 올바르지 않습니다."];

  const handleSignupResponseError = (errorData: ErrorData) => {
    const message = errorData.message ?? "";
    let isHandled = false;
    if (emailErrors.includes(message)) {
      handleErrorChange("email", message);
      isHandled = true;
    }
    if (nicknameErrors.includes(message)) {
      handleErrorChange("nickname", message);
      isHandled = true;
    }
    if (passwordErrors.includes(message)) {
      handleErrorChange("password", message);
      isHandled = true;
    }

    if (!isHandled) {
      handleErrorChange(
        "email",
        "올바르지 않은 양식입니다. 관리자에게 문의해 주세요.",
      );
      handleErrorChange(
        "nickname",
        "올바르지 않은 양식입니다. 관리자에게 문의해 주세요.",
      );
      handleErrorChange(
        "password",
        "올바르지 않은 양식입니다. 관리자에게 문의해 주세요.",
      );
    }
  };

  return handleSignupResponseError;
}
