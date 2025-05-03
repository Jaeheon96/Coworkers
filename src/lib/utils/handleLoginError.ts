import { ErrorData } from "@/core/types/standardError";

export default function handleLoginError(
  handleErrorChange: (key: string, value: string | null) => void,
) {
  const emailErrors = ["존재하지 않는 이메일입니다."];
  const passwordErrors = ["비밀번호가 일치하지 않습니다."];

  const handleLoginResponseError = (errorData: ErrorData) => {
    const message = errorData.message ?? "";
    let isHandled = false;
    if (emailErrors.includes(message)) {
      handleErrorChange("email", message);
      isHandled = true;
    }
    if (passwordErrors.includes(message)) {
      handleErrorChange("password", message);
      isHandled = true;
    }

    if (!isHandled) {
      handleErrorChange("email", "로그인 정보를 확인해주세요.");
      handleErrorChange("password", "로그인 정보를 확인해주세요.");
    }
  };

  return handleLoginResponseError;
}
