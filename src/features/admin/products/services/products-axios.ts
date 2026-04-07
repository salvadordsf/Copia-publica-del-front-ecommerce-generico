import axiosInstance from "@/lib/axios/axios";
import {
  ICreateProductMutation,
  IFilterBulkProductsQuery,
  IGetProductsQuery,
  IReassignProducts,
  IUpdateBulkProducts,
  IUpdateProduct,
} from "../schemas/products-schemas";
import { IProduct } from "@/types/resources/product-type";
import { ApiResponse } from "@/types/responses.type";
import { PaginationType } from "@/types/pagination-type";

export const getProducts = async (
  data: IGetProductsQuery,
): Promise<ApiResponse<{ data: IProduct[]; pagination: PaginationType }>> => {
  const params: IGetProductsQuery = {
    ...(data?.page && { page: data?.page }),
    ...(data?.pageSize && { pageSize: data?.pageSize }),

    ...(data?.name && { name: data?.name }),
    ...(data?.search && { search: data?.search }),

    ...(data?.priceMin && { priceMin: data?.priceMin }),
    ...(data?.priceMax && { priceMax: data?.priceMax }),

    ...(data?.relevance && { relevance: data?.relevance }),
    ...(data?.status && { status: data?.status }),

    ...(data?.category && { category: data?.category }),
    ...(data?.subcategory && { subcategory: data?.subcategory }),
    ...(data?.tags && { tags: data?.tags }),

    ...(data?.tagsAry && { tagsAry: data?.tagsAry }),
    ...(data?.tagsAry && { tagsAry: data?.tagsAry }),

    ...(data?.categoryId && { categoryId: data?.categoryId }),
    ...(data?.subcategoryId && { subcategoryId: data?.subcategoryId }),

    ...(data?.sortBy && { sortBy: data?.sortBy }),
    ...(data?.sortOrder && { sortOrder: data?.sortOrder }),
  };

  const res = await axiosInstance.get("/products", {
    params,
  });
  return res.data;
};

export const getProductById = async (
  id: string,
): Promise<ApiResponse<IProduct>> => {
  const res = await axiosInstance.get<ApiResponse<IProduct>>(`/products/${id}`);
  return res.data;
};

export const createProduct = async (
  data: ICreateProductMutation,
): Promise<ApiResponse<IProduct>> => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const updateProduct = async (
  id: string,
  data: IUpdateProduct,
): Promise<ApiResponse<IProduct>> => {
  const res = await axiosInstance.put(`/products/${id}`, data);
  return res.data;
};

export const reassignProducts = async (
  data: IReassignProducts,
): Promise<ApiResponse<IProduct[]>> => {
  const res = await axiosInstance.patch(`/products/reassign`, data);
  return res.data;
};

export const deleteProduct = async (
  id: string,
): Promise<ApiResponse<IProduct>> => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};

export const updateManyProducts = async (
  filter: IFilterBulkProductsQuery,
  data: IUpdateBulkProducts,
): Promise<ApiResponse<{ count: number }>> => {
  const params: IFilterBulkProductsQuery = {
    ...(filter?.name && { name: filter?.name }),

    ...(filter?.priceMin && { priceMin: filter?.priceMin }),
    ...(filter?.priceMax && { priceMax: filter?.priceMax }),

    ...(filter?.relevance && { relevance: filter?.relevance }),
    ...(filter?.status && { status: filter?.status }),

    ...(filter?.categoryId && { categoryId: filter?.categoryId }),
    ...(filter?.subcategoryId && { subcategoryId: filter?.subcategoryId }),
  };

  const update: IUpdateBulkProducts = {
    ...(data?.status && { status: data.status }),
    ...(data?.relevance && { relevance: data.relevance }),
  };

  const res = await axiosInstance.put("/products", update, { params });

  return res.data;
};

export const deleteManyProducts = async (
  filter: IFilterBulkProductsQuery,
): Promise<ApiResponse<{ count: number }>> => {
  const params: IFilterBulkProductsQuery = {
    ...(filter?.name && { name: filter?.name }),

    ...(filter?.priceMin && { priceMin: filter?.priceMin }),
    ...(filter?.priceMax && { priceMax: filter?.priceMax }),

    ...(filter?.relevance && { relevance: filter?.relevance }),
    ...(filter?.status && { status: filter?.status }),

    ...(filter?.categoryId && { categoryId: filter?.categoryId }),
    ...(filter?.subcategoryId && { subcategoryId: filter?.subcategoryId }),
  };

  const res = await axiosInstance.delete("/products", { params });

  return res.data;
};

export const getSearchProducts = async (): Promise<IProduct[]> => {
  const params: IGetProductsQuery = {
    pageSize: "10000",
    status: "ACTIVE",
    category: true,
    subcategory: true,
    tags: true,
  };

  const res = await getProducts(params);
  return res.success ? res.data.data : [];
};
