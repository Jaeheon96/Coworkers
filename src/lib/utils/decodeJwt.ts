import TokenPayload from "@/core/types/tokenPayload";

export default function decodeJwt(jwt: string) {
  const basePayload = jwt.split(".")[1];
  const payload = JSON.parse(atob(basePayload)) as TokenPayload;

  return payload;
}
