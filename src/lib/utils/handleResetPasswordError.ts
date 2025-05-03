import { ErrorData } from "@/core/types/standardError";

export default function handleResetPasswordError(
  handleErrorChange: (str: string) => void,
) {
  const handleResetPasswordResponseError = (errorData: ErrorData) => {
    const message = errorData.message ?? "";
    switch (message) {
      case "User not found":
        handleErrorChange("존재하지 않는 유저입니다.");
        break;
      default:
        break;
    }
  };

  return handleResetPasswordResponseError;
}
