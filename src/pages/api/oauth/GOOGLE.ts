import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginResponse } from "@/core/dtos/user/auth";
import decodeJwt from "@/lib/utils/decodeJwt";
import StandardError from "@/core/types/standardError";

const REFRESH_COOKIE_NAME = "coworkers_refresh";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST": {
      let loginResponse: AxiosResponse<LoginResponse>;
      try {
        loginResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/signIn/GOOGLE`,
          req.body,
        );
        const { refreshToken, accessToken } = loginResponse.data;
        const { exp: refreshExpNum } = decodeJwt(refreshToken);
        const expDate = new Date(refreshExpNum * 1000).toUTCString();
        res
          .status(201)
          .setHeader(
            "Set-Cookie",
            `${REFRESH_COOKIE_NAME}=${refreshToken}; Secure; HttpOnly; Path=/; SameSite=Lax; Expires=${expDate};`,
          )
          .json({ accessToken });
      } catch (error) {
        const err = error as AxiosError<StandardError>;
        res
          .status(err.response?.status ?? 500)
          .json(err.response?.data ?? { message: "Next-API Server Error" });
      }
      break;
    }

    default: {
      res.status(400).json({ error: "Unhandled Method" });
      break;
    }
  }
}
