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
  UpdateUserResponse,
  User,
} from "../dtos/user/auth";
import updateUser from "../api/user/updateUser";
import deleteUser from "../api/user/deleteUser";
import signIn from "../api/user/signIn";
import signOut from "../api/user/signOut";
import refreshToken from "../api/user/refreshToken";
import setAxiosInterceptors from "../api/setAxiosInterceptors";
import ejectAxiosInterceptors from "../api/ejectAxiosInterceptors";

interface AuthContextValues {
  user: User | undefined;
  isPending: boolean;
  getMe: () => void;
  login: (loginForm: LoginForm) => Promise<AccessTokenForm>;
  isLoginPending: boolean;
  logout: () => void;
  updateMe: (updateUserForm: UpdateUserForm) => Promise<UpdateUserResponse>;
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

  const {
    data: token,
    refetch: getToken,
    isPending: isTokenPending,
  } = useQuery({
    queryKey: [TOKENS.ACCESS_TOKEN],
    queryFn: async () => {
      const { accessToken } = await refreshToken();
      return accessToken;
    },
    retry: false,
    staleTime: 1000 * 60 * 30,
    gcTime: Infinity,
    throwOnError: false,
  });

  const {
    data: user,
    isPending: isUserPending,
    refetch: getMe,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 10,
    gcTime: Infinity,
    enabled: isTokenSet,
  });

  const isPending = isTokenPending || (!!token && isUserPending);

  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationFn: (loginForm: LoginForm) => signIn(loginForm),
    onSuccess: () => {
      getToken();
    },
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setIsTokenSet(false);
      queryClient.removeQueries({ queryKey: [TOKENS.ACCESS_TOKEN] });
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (e) => {
      alert("로그아웃중 오류 발생: 잠시후 다시 시도해 주세요.");
      console.error(e);
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
    if (token) {
      setInterceptors(setAxiosInterceptors(token, getToken, logout));
      setIsTokenSet(true);
      return;
    }
    ejectAxiosInterceptors(interceptors);
  }, [token]);

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
      replace(`/unauthorized?direction=${asPath}`);
    }
  }, [required, user, isPending, isReady]);

  return context;
}
