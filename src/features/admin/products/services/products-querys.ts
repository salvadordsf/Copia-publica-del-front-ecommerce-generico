import { useQuery } from "@tanstack/react-query";
import { IGetProductsQuery } from "../schemas/products-schemas";
import {
  getProductById,
  getProducts,
  getSearchProducts,
} from "./products-axios";

export const useProducts = (query: IGetProductsQuery) => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query),
  });
};

export const useProductById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id && enabled,
  });
};

export const useSearchProducts = () => {
  return useQuery({
    queryKey: ["searchProducts"],
    queryFn: () => getSearchProducts(),
  });
};
