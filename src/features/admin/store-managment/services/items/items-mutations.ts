import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { ICreateItem, IUpdateItem } from "../../schemas/items/items-schema";
import { createItem, deleteItem, updateItem } from "./items.axios";

export const useCreateItem = () => {
  return useMutation({
    mutationFn: (data: ICreateItem) => createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};

export const useUpdateItems = <T>(id: string) => {
  return useMutation({
    mutationFn: (data: T) => updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item"] });
    },
  });
};

export const useDeleteItems = () => {
  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};
