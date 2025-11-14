import axiosInstance from "@/lib/axios/axios";
import {
  ICreateTagSchema,
  IFilterBulkTagsQuery,
  IGetTagQuery,
  IUpdateBulkTags,
} from "../schemas/tags-schema";

export const getTags = async (data: IGetTagQuery) => {
  const params: any = {
    name: data.name,
    status: data.status,
  };

  if (data.products) {
    params.products = true;
  }

  const res = await axiosInstance.get("/tags", {
    params,
  });
  console.log(res);
  return res.data;
};

export const getTagById = async (id: string) => {
  const res = await axiosInstance.get(`/tags/${id}`);
  console.log(res);
  return res.data;
};

export const createTag = async (data: ICreateTagSchema) => {
  const res = await axiosInstance.post("/tags", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const toggleCreateTag = async (data: ICreateTagSchema) => {
  const res = await axiosInstance.post("/tags/toggleCreate", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const updateTag = async (id: string, data: ICreateTagSchema) => {
  const res = await axiosInstance.put(`/tags/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteTag = async (id: string) => {
  const res = await axiosInstance.delete(`/tags/${id}`);
  console.log(res);
  return res.data;
};

export const updateManyTags = async (
  filter: IFilterBulkTagsQuery,
  data: IUpdateBulkTags
) => {
  const params: IFilterBulkTagsQuery = {
    ...(filter?.name && { name: filter?.name }),
  };

  const update: IUpdateBulkTags = {
    ...(data?.status && { status: data.status }),
  };

  const res = await axiosInstance.put("/tags", update, { params });

  console.log(res);
  return res.data;
};

export const deleteManyTags = async (filter: IFilterBulkTagsQuery) => {
  const params: IFilterBulkTagsQuery = {
    ...(filter?.name && { name: filter?.name }),
  };

  const res = await axiosInstance.delete("/tags", { params });

  console.log(res);
  return res.data;
};
