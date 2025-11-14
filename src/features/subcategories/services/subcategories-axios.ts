import axiosInstance from "@/lib/axios/axios";
import {
  ICreateSubcategory,
  IFilterBulkSubcategoriesQuery,
  IGetSubcategoryQuery,
  IUpdateBulkSubcategories,
  IUpdateSubcategory,
} from "../schemas/subcategories-schema";

export const getSubcategories = async (data: IGetSubcategoryQuery) => {
  const params: any = {
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
export const getSubcategoryById = async (id: string) => {
  const res = await axiosInstance.get(`/subcategories/${id}`);
  console.log(res);
  return res.data;
};

export const createSubcategory = async (data: ICreateSubcategory) => {
  const res = await axiosInstance.post("/subcategories", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const updateSubcategory = async (
  id: string,
  data: IUpdateSubcategory
) => {
  const res = await axiosInstance.put(`/subcategories/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteSubcategory = async (id: string) => {
  const res = await axiosInstance.delete(`/subcategories/${id}`);
  console.log(res);
  return res.data;
};

export const updateManySubcategories = async (
  filter: IFilterBulkSubcategoriesQuery,
  data: IUpdateBulkSubcategories
) => {
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
  filter: IFilterBulkSubcategoriesQuery
) => {
  const params: IFilterBulkSubcategoriesQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.status && { status: filter?.status }),
    ...(filter?.categoryId && { categoryId: filter?.categoryId }),
  };

  const res = await axiosInstance.delete("/subcategories", { params });

  console.log(res);
  return res.data;
};
