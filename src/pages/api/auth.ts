import { LoginResponse } from "@/core/dtos/user/auth";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

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
        res
          .status(201)
          .setHeader(
            "Set-Cookie",
            `refresh_token=${refreshToken}; Secure; HttpOnly; Path=/; SameSite=Lax;`,
          )
          .json({ accessToken });
      } catch (error) {
        const err = error as AxiosError;
        res
          .status(err.response?.status ?? 500)
          .json(err.response?.data ?? { message: "Internal Server Error" });
      }
      break;
    }

    default: {
      res.status(400).json({ error: "Unhandled Method" });
      break;
    }
  }
}
