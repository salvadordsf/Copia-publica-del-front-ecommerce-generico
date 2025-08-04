import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { ICreateCategory, IUpdateCategory } from "../schemas/categories-schema";
import { createCategory, deleteCategory, updateCategory } from "./categories-axios";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: ICreateCategory) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = (id: string) => {
  return useMutation({
    mutationFn: (data: IUpdateCategory) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
