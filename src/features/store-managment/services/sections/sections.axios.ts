import axiosInstance from "@/lib/axios/axios";
import {
  ICreateSection,
  IGetSection,
  IUpdateSection,
} from "../../schemas/sections/sections-schema";

export const getSections = async (data: IGetSection) => {
  const params: any = {
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

export const getSectionById = async (id: string) => {
  const res = await axiosInstance.get(`/home/sections/${id}`);
  console.log(res);
  return res.data;
};

export const createSection = async (data: ICreateSection) => {
  const res = await axiosInstance.post("/home/sections", data);
  console.log(res);
  return res.data;
};

export const updateSection = async (id: string, data: IUpdateSection) => {
  const res = await axiosInstance.put(`/home/sections/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteSection = async (id: string) => {
  const res = await axiosInstance.delete(`/home/sections/${id}`);
  console.log(res);
  return res.data;
};
