import { AccessTokenForm, LoginResponse } from "@/core/dtos/user/auth";
import decodeJwt from "@/lib/utils/decodeJwt";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

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
          `${process.env.NEXT_PUBLIC_API_URL}auth/signIn`,
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
        const err = error as AxiosError;
        res
          .status(err.response?.status ?? 500)
          .json(err.response?.data ?? { message: "Next-API Server Error" });
      }
      break;
    }

    case "GET": {
      const refreshToken = req.cookies.coworkers_refresh;
      if (!refreshToken) {
        res.status(401).json({ message: "No Refresh Token" });
        return;
      }
      let tokenResponse: AxiosResponse<AccessTokenForm>;
      try {
        tokenResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/refresh-token`,
          { refreshToken },
        );
        res.status(200).json(tokenResponse.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          res
            .status(401)
            .setHeader(
              "Set-Cookie",
              `${REFRESH_COOKIE_NAME}=none; Secure; HttpOnly; Path=/; SameSite=Lax; Expires=-1; Max-Age=-1;`,
            )
            .json({ message: "Expired Refresh Token" });
          return;
        }
        res
          .status(err.response?.status ?? 500)
          .json(err.response?.data ?? { message: "Next-API Server Error" });
      }
      break;
    }

    case "DELETE": {
      res
        .status(204)
        .setHeader(
          "Set-Cookie",
          `${REFRESH_COOKIE_NAME}=none; Secure; HttpOnly; Path=/; SameSite=Lax; Expires=-1; Max-Age=-1;`,
        )
        .send(true);
      break;
    }

    default: {
      res.status(400).json({ error: "Unhandled Method" });
      break;
    }
  }
}
