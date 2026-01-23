import { create } from "zustand";
import { removeToken } from "../utils/auth-token";
import { UserLocalStorageSchema, UserLocalStorageType } from "../schemas/auth-schemas";
import { removeUser, saveUser } from "../utils/auth-user";

const userFromStorage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

const parsedUser = UserLocalStorageSchema.safeParse(userFromStorage);

const localUserExist = parsedUser.success ? parsedUser.data : null;

if (!localUserExist) removeUser();

interface IAuthStore {
  user: null | UserLocalStorageType;
  setUser: (user: UserLocalStorageType) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: localUserExist,
  setUser: (user) => {
    saveUser(user);
    set({ user });
  },
  logout: () => {
    removeToken();
    removeUser();
    set({ user: null });
  },
}));
