import axiosInstance from "@/lib/axios/axios";
import {
  ICreateCategory,
  IFilterBulkCategoryQuery,
  IGetCategoryQuery,
  IUpdateBulkCategories,
  IUpdateCategory,
} from "../schemas/categories-schema";
import { ApiResponse } from "@/types/responses.type";
import { ICategory } from "@/types/resources/category-type";

export const getCategories = async (
  data: IGetCategoryQuery,
): Promise<ApiResponse<ICategory[]>> => {
  const params: IGetCategoryQuery = {
    ...(data?.name && { name: data?.name }),
    ...(data?.status && { status: data?.status }),
  };
  if (data.subcategories) {
    params.subcategories = true;
  }
  if (data.products) {
    params.products = true;
  }

  const res = await axiosInstance.get("/categories", {
    params,
  });
  return res.data;
};

export const getCategoryById = async (
  id: string,
): Promise<ApiResponse<ICategory>> => {
  const res = await axiosInstance.get<ApiResponse<ICategory>>(
    `/categories/${id}`,
  );
  return res.data;
};

export const createCategory = async (
  data: ICreateCategory,
): Promise<ApiResponse<ICategory>> => {
  const res = await axiosInstance.post("/categories", data);
  return res.data;
};

export const updateCategory = async (
  id: string,
  data: IUpdateCategory,
): Promise<ApiResponse<ICategory>> => {
  const res = await axiosInstance.put(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (
  id: string,
): Promise<ApiResponse<ICategory>> => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};

export const updateManyCategories = async (
  filter: IFilterBulkCategoryQuery,
  data: IUpdateBulkCategories,
): Promise<ApiResponse<{ count: number }>> => {
  const params: IFilterBulkCategoryQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.status && { status: filter?.status }),
  };

  const update: IUpdateBulkCategories = {
    ...(data?.status && { status: data.status }),
  };

  const res = await axiosInstance.put("/categories", update, { params });

  return res.data;
};

export const deleteManyCategories = async (
  filter: IFilterBulkCategoryQuery,
): Promise<ApiResponse<{ count: number }>> => {
  const params: IFilterBulkCategoryQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.status && { status: filter?.status }),
  };

  const res = await axiosInstance.delete("/categories", { params });

  return res.data;
};
