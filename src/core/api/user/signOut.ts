import axios, { AxiosError } from "axios";

export default async function signOut() {
  await axios.delete("/api/auth").catch((e: AxiosError) => Promise.reject(e));
}
