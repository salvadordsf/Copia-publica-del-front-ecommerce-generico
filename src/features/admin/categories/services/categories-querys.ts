import { useQuery } from "@tanstack/react-query";
import { IGetCategoryQuery } from "../schemas/categories-schema";
import { getCategories, getCategoryById } from "./categories-axios";

export const useCategories = (query: IGetCategoryQuery) => {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: () => getCategories(query),
  });
};

export const useCategoryById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id && enabled,
  });
};
