import axiosInstance from "@/lib/axios/axios";
import {
  ICreateTagSchema,
  IFilterBulkTagsQuery,
  IGetTagQuery,
  IUpdateBulkTags,
  IUpdateTag,
} from "../schemas/tags-schema";
import { ApiResponse } from "@/types/responses.type";
import { ITag, IToggleCreateTag } from "@/types/resources/tag-type";

export const getTags = async (
  data: IGetTagQuery,
): Promise<ApiResponse<ITag[]>> => {
  const params: IGetTagQuery = {
    ...(data?.name && { name: data?.name }),
    ...(data?.status && { status: data?.status }),
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

export const getTagById = async (id: string): Promise<ApiResponse<ITag>> => {
  const res = await axiosInstance.get(`/tags/${id}`);
  console.log(res);
  return res.data;
};

export const createTag = async (
  data: ICreateTagSchema,
): Promise<ApiResponse<ITag>> => {
  const res = await axiosInstance.post("/tags", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const toggleCreateTag = async (
  data: ICreateTagSchema,
): Promise<ApiResponse<IToggleCreateTag>> => {
  const res = await axiosInstance.post("/tags/toggleCreate", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const updateTag = async (
  id: string,
  data: IUpdateTag,
): Promise<ApiResponse<ITag>> => {
  const res = await axiosInstance.put(`/tags/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteTag = async (id: string): Promise<ApiResponse<ITag>> => {
  const res = await axiosInstance.delete(`/tags/${id}`);
  console.log(res);
  return res.data;
};

export const updateManyTags = async (
  filter: IFilterBulkTagsQuery,
  data: IUpdateBulkTags,
): Promise<ApiResponse<{ count: number }>> => {
  const params: IFilterBulkTagsQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.status && { status: filter?.status }),
  };

  const update: IUpdateBulkTags = {
    ...(data?.status && { status: data.status }),
  };

  const res = await axiosInstance.put("/tags", update, { params });

  console.log(res);
  return res.data;
};

export const deleteManyTags = async (
  filter: IFilterBulkTagsQuery,
): Promise<ApiResponse<{ count: number }>> => {
  const params: IFilterBulkTagsQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.status && { status: filter?.status }),
  };

  const res = await axiosInstance.delete("/tags", { params });

  console.log(res);
  return res.data;
};
