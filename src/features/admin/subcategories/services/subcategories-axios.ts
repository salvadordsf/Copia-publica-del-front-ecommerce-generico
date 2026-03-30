import axiosInstance from "@/lib/axios/axios";
import {
  ICreateSubcategory,
  IFilterBulkSubcategoriesQuery,
  IGetSubcategoryQuery,
  IUpdateBulkSubcategories,
  IUpdateSubcategory,
} from "../schemas/subcategories-schema";
import { ISubcategory } from "@/types/resources/subcategory-type";
import { ApiResponse } from "@/types/responses.type";

export const getSubcategories = async (
  data: IGetSubcategoryQuery,
): Promise<ApiResponse<ISubcategory[]>> => {
  const params: IGetSubcategoryQuery = {
    ...(data?.name && { name: data?.name }),
    ...(data?.status && { status: data?.status }),
    ...(data?.categoryId && { categoryId: data?.categoryId }),
  };

  if (data.category) {
    params.category = true;
  }
  if (data.products) {
    params.products = true;
  }

  const res = await axiosInstance.get("/subcategories", {
    params,
  });
  console.log(res);
  return res.data;
};
export const getSubcategoryById = async (
  id: string,
): Promise<ApiResponse<ISubcategory>> => {
  const res = await axiosInstance.get(`/subcategories/${id}`);
  console.log(res);
  return res.data;
};

export const createSubcategory = async (
  data: ICreateSubcategory,
): Promise<ApiResponse<ISubcategory>> => {
  const res = await axiosInstance.post("/subcategories", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const updateSubcategory = async (
  id: string,
  data: IUpdateSubcategory,
): Promise<ApiResponse<ISubcategory>> => {
  const res = await axiosInstance.put(`/subcategories/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteSubcategory = async (
  id: string,
): Promise<ApiResponse<ISubcategory>> => {
  const res = await axiosInstance.delete(`/subcategories/${id}`);
  console.log(res);
  return res.data;
};

export const updateManySubcategories = async (
  filter: IFilterBulkSubcategoriesQuery,
  data: IUpdateBulkSubcategories,
): Promise<ApiResponse<{ count: number }>>  => {
  const params: IFilterBulkSubcategoriesQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.status && { status: filter?.status }),
    ...(filter?.categoryId && { categoryId: filter?.categoryId }),
  };

  const update: IUpdateBulkSubcategories = {
    ...(data?.status && { status: data.status }),
    ...(data?.categoryId && { categoryId: data.categoryId }),
  };

  const res = await axiosInstance.put("/subcategories", update, { params });

  console.log(res);
  return res.data;
};

export const deleteManySubcategories = async (
  filter: IFilterBulkSubcategoriesQuery,
): Promise<ApiResponse<{ count: number }>> => {
  const params: IFilterBulkSubcategoriesQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.status && { status: filter?.status }),
    ...(filter?.categoryId && { categoryId: filter?.categoryId }),
  };

  const res = await axiosInstance.delete("/subcategories", { params });

  console.log(res);
  return res.data;
};
