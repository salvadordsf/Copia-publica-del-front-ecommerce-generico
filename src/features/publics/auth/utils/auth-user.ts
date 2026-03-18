import { UserLocalStorageType } from "../schemas/auth-schemas";

export const saveUser = (user: UserLocalStorageType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    if (!getUser()) return;
    localStorage.removeItem("user");
  }
};

export const getUser = (): UserLocalStorageType | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
  }
  return null;
};
