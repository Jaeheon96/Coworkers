import { Membership } from "./membership";

export interface UserBase {
  id: number;
  teamId: string;
  email: string;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenForm {
  refreshToken: string;
}

export interface AccessTokenForm {
  accessToken: string;
}

export interface User extends UserBase {
  memberships: Membership[];
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginResponse extends Tokens {
  user: UserBase;
}

export interface UpdateUserForm {
  nickname?: string;
  image: string;
}

export interface UpdateUserResponse {
  message: string;
}
