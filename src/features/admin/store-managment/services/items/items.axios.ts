import axiosInstance from "@/lib/axios/axios";
import {
  ICreateItem,
  IGetItem,
  IUpdateItem,
} from "../../schemas/items/items-schema";

export const getItems = async (data: IGetItem) => {
  const params: any = {
    ...(data?.sectionId && { sectionId: data?.sectionId }),
    ...(data?.itemType && { itemType: data?.itemType }),
    ...(data?.productId && { productId: data?.productId }),
    ...(data?.categoryId && { categoryId: data?.categoryId }),
  };

  const res = await axiosInstance.get("/home/items-sections", {
    params,
  });
  console.log(res);
  return res.data;
};

export const getItemById = async (id: string) => {
  const res = await axiosInstance.get(`/home/items-sections/${id}`);
  console.log(res);
  return res.data;
};

export const createItem = async (data: ICreateItem) => {
  const res = await axiosInstance.post("/home/items-sections", data);
  console.log(res);
  return res.data;
};

export const updateItem = async <T>(id: string, data: T) => {
  const res = await axiosInstance.put(`/home/items-sections/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteItem = async (id: string) => {
  const res = await axiosInstance.delete(`/home/items-sections/${id}`);
  console.log(res);
  return res.data;
};
