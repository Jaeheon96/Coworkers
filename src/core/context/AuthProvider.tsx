import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { TOKENS } from "@/lib/utils/tokenStorage";
import getUser from "../api/user/getUser";
import {
  AccessTokenForm,
  LoginForm,
  UpdateUserForm,
  MessageResponse,
  User,
} from "../dtos/user/auth";
import updateUser from "../api/user/updateUser";
import deleteUser from "../api/user/deleteUser";
import signIn from "../api/user/signIn";
import signOut from "../api/user/signOut";
import refreshToken from "../api/user/refreshToken";
import setAxiosInterceptors from "../api/setAxiosInterceptors";
import ejectAxiosInterceptors from "../api/ejectAxiosInterceptors";
import { routerQueries } from "../types/queries";

interface AuthContextValues {
  user: User | undefined;
  isPending: boolean;
  getMe: () => void;
  login: (loginForm: LoginForm) => Promise<AccessTokenForm>;
  isLoginPending: boolean;
  logout: () => void;
  updateMe: (updateUserForm: UpdateUserForm) => Promise<MessageResponse>;
  isUpdatePending: boolean;
  deleteMe: () => Promise<unknown>;
  isDeletionPending: boolean;
}

const INITIAL_AUTH_VALUES: AuthContextValues = {
  user: undefined,
  isPending: true,
  getMe: () => {},
  login: () => Promise.reject(),
  isLoginPending: false,
  logout: () => {},
  updateMe: () => Promise.reject(),
  isUpdatePending: false,
  deleteMe: () => Promise.reject(),
  isDeletionPending: false,
};

const AuthContext = createContext<AuthContextValues>(INITIAL_AUTH_VALUES);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [interceptors, setInterceptors] = useState({
    reqInterceptor: 0,
    resInterceptor: 0,
  });
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialPending, setInitialPending] = useState(true);

  const { mutate: logout } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setIsTokenSet(false);
      setIsLoggedIn(false);
      ejectAxiosInterceptors(interceptors);
      queryClient.setQueryData([TOKENS.ACCESS_TOKEN], null);
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: [TOKENS.ACCESS_TOKEN] });
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (e) => {
      alert("로그아웃중 오류 발생: 잠시후 다시 시도해 주세요.");
      console.error(e);
    },
  });

  const { data: token, refetch: getToken } = useQuery({
    queryKey: [TOKENS.ACCESS_TOKEN],
    queryFn: async () => {
      const res = await refreshToken();
      if (res) {
        setIsLoggedIn(true);
        setInterceptors(
          setAxiosInterceptors(res.accessToken, getToken, logout),
        );
        setIsTokenSet(true);
        return res.accessToken;
      }
      setIsLoggedIn(false);
      return null;
    },
    enabled: isLoggedIn,
    retry: false,
    staleTime: 1000 * 60 * 5,
    throwOnError: false,
  });

  const getInitialToken = async () => {
    await getToken();
    setInitialPending(false);
  };

  const setAccessToken = (accessToken: string) => {
    queryClient.setQueryData([TOKENS.ACCESS_TOKEN], accessToken);
    setInterceptors(setAxiosInterceptors(accessToken, getToken, logout));
    setIsTokenSet(true);
    setIsLoggedIn(true);
  };

  const {
    data: user,
    isPending: isUserPending,
    refetch: getMe,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 10,
    enabled: isTokenSet,
  });

  const isPending = initialPending || (!!token && isUserPending);

  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationFn: (loginForm: LoginForm) => signIn(loginForm),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  const { mutateAsync: updateMe, isPending: isUpdatePending } = useMutation({
    mutationFn: (updateUserForm: UpdateUserForm) => updateUser(updateUserForm),
    onSuccess: () => getMe(),
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  const { mutateAsync: deleteMe, isPending: isDeletionPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => logout(),
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  useEffect(() => {
    getInitialToken();
  }, []);

  const authValues = useMemo(
    () => ({
      user,
      isPending,
      getMe,
      login,
      isLoginPending,
      logout,
      updateMe,
      isUpdatePending,
      deleteMe,
      isDeletionPending,
    }),
    [
      user,
      isPending,
      getMe,
      login,
      isLoginPending,
      logout,
      updateMe,
      isUpdatePending,
      deleteMe,
      isDeletionPending,
    ],
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Out of provider scope: AuthContext");

  const { user, isPending } = context;
  const { asPath, isReady, replace } = useRouter();
  useEffect(() => {
    if (required && !user && !isPending && isReady) {
      replace(`/unauthorized?${routerQueries.loginDirection}=${asPath}`);
    }
  }, [required, user, isPending, isReady]);

  return context;
}
