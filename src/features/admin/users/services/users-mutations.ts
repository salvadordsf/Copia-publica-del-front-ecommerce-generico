import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { ICreateUser, IUpdateUser } from "../schemas/user-schemas";
import { createUser, deleteUser, updateUser } from "./users-axios";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: ICreateUser) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = (id: string) => {
  return useMutation({
    mutationFn: (data: IUpdateUser) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
