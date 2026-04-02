import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import {
  ICreateCategory,
  IFilterBulkCategoryQuery,
  IUpdateBulkCategories,
  IUpdateCategory,
} from "../schemas/categories-schema";
import {
  createCategory,
  deleteCategory,
  deleteManyCategories,
  updateCategory,
  updateManyCategories,
} from "./categories-axios";

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

export const useDeleteManyCategories = () => {
  return useMutation({
    mutationFn: (filters: IFilterBulkCategoryQuery) =>
      deleteManyCategories(filters),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateManyCategories = () => {
  return useMutation({
    mutationFn: ({
      filters,
      data,
    }: {
      filters: IFilterBulkCategoryQuery;
      data: IUpdateBulkCategories;
    }) => updateManyCategories(filters, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
