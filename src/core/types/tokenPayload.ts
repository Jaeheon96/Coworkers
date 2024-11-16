export default interface TokenPayload {
  id: number;
  teamId: string;
  scope: string;
  iat: number;
  exp: number;
  iss: string;
}
