import { useMutation } from "@tanstack/react-query";
import { login, register } from "./auth-axios";
import { saveToken } from "../utils/auth-token";
import { useAuthStore } from "../store/auth-store";
import { UserLocalStorageType } from "../schemas/auth-schemas";

interface AuthResponse {
  token: string;
  user: UserLocalStorageType;
}

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: (res: AuthResponse ) => {
        console.log(res.token)
      saveToken(res.token);
      useAuthStore.getState().setUser(res.user);
    },
    onError: (error) => {
      console.error("Error en register:", error);
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: (res: AuthResponse ) => {
        console.log(res)
      saveToken(res.token);
      useAuthStore.getState().setUser(res.user);
    },
    onError: (error) => {
      console.error("Error en login:", error);
    },
  });
