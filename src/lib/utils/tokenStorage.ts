import { AccessTokenForm } from "@/core/dtos/user/auth";

export const TOKENS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export function saveToken(tokenForm: AccessTokenForm) {
  localStorage.setItem(TOKENS.ACCESS_TOKEN, tokenForm.accessToken);
}

export function removeToken() {
  localStorage.removeItem(TOKENS.ACCESS_TOKEN);
}
