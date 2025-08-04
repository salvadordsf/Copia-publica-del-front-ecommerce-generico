import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import {
  ICreateProduct,
  IReassignProducts,
  IUpdateProduct,
} from "../schemas/products-schemas";
import {
  createProduct,
  deleteProduct,
  reassignProducts,
  updateProduct,
} from "./products-axios";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: ICreateProduct) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = (id: string) => {
  return useMutation({
    mutationFn: (data: IUpdateProduct) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useReassignProducts = () => {
  return useMutation({
    mutationFn: (data: IReassignProducts) => reassignProducts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProducts = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
