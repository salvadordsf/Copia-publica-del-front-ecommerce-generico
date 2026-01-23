import { useQuery } from "@tanstack/react-query";
import { getSubcategories, getSubcategoryById } from "./subcategories-axios";
import { IGetSubcategoryQuery } from "../schemas/subcategories-schema";

export const useSubcategories = (query: IGetSubcategoryQuery) => {
  return useQuery({
    queryKey: ["subcategories", query],
    queryFn: () => getSubcategories(query),
  });
};

export const useSubcategoryById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["subcategory", id],
    queryFn: () => getSubcategoryById(id),
    enabled: !!id && enabled,
  });
};
