import axiosInstance from "@/lib/axios/axios";
import {
  ICreateOrder,
  IGetOrderQuery,
  IUpdateOrder,
} from "../schemas/orders-schema";

export const getOrders = async (data: IGetOrderQuery) => {
  const params: any = {
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

export const getOrderById = async (id: string) => {
  const res = await axiosInstance.get(`/orders/${id}`);
  console.log(res);
  return res.data;
};

export const createOrder = async (data: ICreateOrder) => {
  const res = await axiosInstance.post("/orders", data);
  console.log(res);
  return res.data;
};

export const updateOrder = async (id: string, data: IUpdateOrder) => {
  const res = await axiosInstance.put(`/orders/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteOrder = async (id: string) => {
  const res = await axiosInstance.delete(`/orders/${id}`);
  console.log(res);
  return res.data;
};
