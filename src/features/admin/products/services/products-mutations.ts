import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import {
  ICreateProductMutation,
  IFilterBulkProductsQuery,
  IReassignProducts,
  IUpdateBulkProducts,
  IUpdateProduct,
} from "../schemas/products-schemas";
import {
  createProduct,
  deleteManyProducts,
  deleteProduct,
  reassignProducts,
  updateManyProducts,
  updateProduct,
} from "./products-axios";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: ICreateProductMutation) => createProduct(data),
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
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["subcategory"] });
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
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

export const useDeleteManyProducts = () => {
  return useMutation({
    mutationFn: (filters: IFilterBulkProductsQuery) => deleteManyProducts(filters),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateManyProducts = () => {
  return useMutation({
    mutationFn: ({
      filters,
      data,
    }: {
      filters: IFilterBulkProductsQuery;
      data: IUpdateBulkProducts;
    }) => updateManyProducts(filters, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
