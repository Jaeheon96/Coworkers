import axiosInstance from "./axiosInstance";

export default function ejectAxiosInterceptors({
  reqInterceptor,
  resInterceptor,
}: {
  reqInterceptor: number;
  resInterceptor: number;
}) {
  axiosInstance.interceptors.request.eject(reqInterceptor);
  axiosInstance.interceptors.response.eject(resInterceptor);
}
