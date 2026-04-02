import axiosInstance from "@/lib/axios/axios";
import {
  ICreateOrder,
  IGetOrderQuery,
  IUpdateOrder,
} from "../schemas/orders-schema";
import { ApiResponse } from "@/types/responses.type";
import { IOrder } from "@/types/resources/order-types";
import { PaginationType } from "@/types/pagination-type";

export const getOrders = async (
  data: IGetOrderQuery,
): Promise<ApiResponse<{ data: IOrder[]; pagination: PaginationType }>> => {
  const params: IGetOrderQuery = {
    ...(data?.page && { page: data?.page }),
    ...(data?.pageSize && { pageSize: data?.pageSize }),

    ...(data?.userId && { userId: data?.userId }),
    ...(data?.search && { search: data?.search }),
    ...(data?.status && { status: data?.status }),

    ...(data?.products && { products: data?.products }),

    ...(data?.sortBy && { sortBy: data?.sortBy }),
    ...(data?.sortOrder && { sortOrder: data?.sortOrder }),
  };

  const res = await axiosInstance.get("/orders", {
    params,
  });
  console.log(res);
  return res.data;
};

export const getOrderById = async (
  id: string,
): Promise<ApiResponse<IOrder>> => {
  const res = await axiosInstance.get(`/orders/${id}`);
  console.log(res);
  return res.data;
};

export const createOrder = async (
  data: ICreateOrder,
): Promise<ApiResponse<IOrder>> => {
  const res = await axiosInstance.post("/orders", data);
  console.log(res);
  return res.data;
};

export const updateOrder = async (
  id: string,
  data: IUpdateOrder,
): Promise<ApiResponse<IOrder>> => {
  const res = await axiosInstance.put(`/orders/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteOrder = async (id: string): Promise<ApiResponse<IOrder>> => {
  const res = await axiosInstance.delete(`/orders/${id}`);
  console.log(res);
  return res.data;
};
