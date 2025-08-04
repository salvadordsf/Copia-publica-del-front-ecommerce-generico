import axiosInstance from "@/lib/axios/axios";
import { ICreateSubcategory, IGetSubcategoryQuery, IUpdateSubcategory } from "../schemas/subcategories-schema";

export const getSubcategories = async (data: IGetSubcategoryQuery) => {
  const params: any = {
    name: data.name,
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

export const updateSubcategory = async (id: string, data: IUpdateSubcategory) => {
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
