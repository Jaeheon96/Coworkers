import { AxiosError, AxiosRequestConfig } from "axios";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export default function setAxiosInterceptors(
  token: string,
  getToken: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<string | null, Error>>,
  logout: () => void,
) {
  axiosInstance.interceptors.request.use((config) => {
    const reqConfig = config;
    reqConfig.headers.Authorization = `bearer ${token}`;

    return config;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest: AxiosRequestConfig = error.config ?? {};
      if (error.response?.status === 401 && !!token) {
        try {
          await getToken();
        } catch (refreshError) {
          console.error(refreshError);
          logout();
          return Promise.reject(error.response);
        }
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error.response);
    },
  );
}
