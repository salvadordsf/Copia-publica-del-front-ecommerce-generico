import axiosInstance from "@/lib/axios/axios";
import { HomeSection } from "@/types/resources/home-section-types";
import { ApiResponse } from "@/types/responses.type";

export const getHome = async (): Promise<ApiResponse<HomeSection[]>> => {
  const res = await axiosInstance.get("/home");
  return res.data;
};
