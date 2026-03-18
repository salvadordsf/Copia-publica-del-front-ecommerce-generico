import { useQuery } from "@tanstack/react-query";
import { IGetUserQuery } from "../schemas/user-schemas";
import { getUserById, getUsers } from "./users-axios";


export const useUsers = (query: IGetUserQuery) => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => getUsers(query),
  });
};

export const useUserById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id && enabled,
  });
};
