import axiosInstance from "@/lib/axios/axios";
import {
  ICreateSection,
  IGetSection,
  IUpdateSectionForMutation,
} from "../../schemas/sections/sections-schema";
import { ApiResponse } from "@/types/responses.type";
import { HomeSection } from "@/types/resources/home-section-types";

export const getSections = async (
  data: IGetSection,
): Promise<ApiResponse<HomeSection[]>> => {
  const params: IGetSection = {
    ...(data?.isEnabled && { isEnabled: data?.isEnabled }),
    ...(data?.type && { type: data?.type }),
    ...(data?.key && { key: data?.key }),
  };

  const res = await axiosInstance.get("/home/sections", {
    params,
  });
  console.log(res);
  return res.data;
};

export const getSectionById = async (
  id: string,
): Promise<ApiResponse<HomeSection>> => {
  const res = await axiosInstance.get(`/home/sections/${id}`);
  console.log(res);
  return res.data;
};

export const createSection = async (
  data: ICreateSection,
): Promise<ApiResponse<HomeSection>> => {
  const res = await axiosInstance.post("/home/sections", data);
  console.log(res);
  return res.data;
};

export const updateSection = async (
  id: string,
  data: IUpdateSectionForMutation,
): Promise<ApiResponse<HomeSection>> => {
  const res = await axiosInstance.put(`/home/sections/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteSection = async (
  id: string,
): Promise<ApiResponse<HomeSection>> => {
  const res = await axiosInstance.delete(`/home/sections/${id}`);
  console.log(res);
  return res.data;
};
