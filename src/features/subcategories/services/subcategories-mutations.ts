import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { ICreateSubcategory, IUpdateSubcategory } from "../schemas/subcategories-schema";
import { createSubcategory, deleteSubcategory, updateSubcategory } from "./subcategories-axios";

export const useCreateSubcategory = () => {
  return useMutation({
    mutationFn: (data: ICreateSubcategory) => createSubcategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};

export const useUpdateSubcategory = (id: string) => {
  return useMutation({
    mutationFn: (data: IUpdateSubcategory) => updateSubcategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategory"] });
    },
  });
};

export const useDeleteSubcategories = () => {
  return useMutation({
    mutationFn: (id: string) => deleteSubcategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};
