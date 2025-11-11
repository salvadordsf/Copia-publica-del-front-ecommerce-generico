import axiosInstance from "@/lib/axios/axios";
import {
  ICreateCategory,
  IFilterBulkCategoryQuery,
  IGetCategoryQuery,
  IUpdateBulkCategories,
  IUpdateCategory,
} from "../schemas/categories-schema";

export const getCategories = async (data: IGetCategoryQuery) => {
  const params: any = {
    name: data.name,
    status: data.status,
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
  console.log(res);
  return res.data;
};
export const getCategoryById = async (id: string) => {
  const res = await axiosInstance.get(`/categories/${id}`);
  console.log(res);
  return res.data;
};

export const createCategory = async (data: ICreateCategory) => {
  const res = await axiosInstance.post("/categories", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const updateCategory = async (id: string, data: IUpdateCategory) => {
  const res = await axiosInstance.put(`/categories/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  console.log(res);
  return res.data;
};

export const updateManyCategories = async (
  filter: IFilterBulkCategoryQuery,
  data: IUpdateBulkCategories
) => {
  const params: IFilterBulkCategoryQuery = {
    ...(filter?.name && { name: filter?.name }),
  };

  const update: IUpdateBulkCategories = {
    ...(data?.status && { status: data.status }),
  };

  const res = await axiosInstance.put("/categories", update, { params });

  console.log(res);
  return res.data;
};

export const deleteManyCategories = async (
  filter: IFilterBulkCategoryQuery
) => {
  const params: IFilterBulkCategoryQuery = {
    ...(filter?.name && { name: filter?.name }),
  };

  const res = await axiosInstance.delete("/categories", { params });

  console.log(res);
  return res.data;
};
