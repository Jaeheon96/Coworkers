import { ErrorData } from "@/core/types/standardError";

export default function handleLoginError(
  handleErrorChange: (key: string, value: string | null) => void,
) {
  const emailErrors = ["존재하지 않는 이메일입니다."];
  const passwordErrors = ["비밀번호가 일치하지 않습니다."];

  const handleLoginResponseError = (errorData: ErrorData) => {
    const message = errorData.message ?? "";
    if (emailErrors.includes(message)) {
      handleErrorChange("email", message);
      if (passwordErrors.includes(message)) {
        handleErrorChange("password", message);
      }
      return;
    }

    handleErrorChange("email", "로그인 정보를 확인해주세요.");
    handleErrorChange("password", "로그인 정보를 확인해주세요.");
  };

  return handleLoginResponseError;
}
