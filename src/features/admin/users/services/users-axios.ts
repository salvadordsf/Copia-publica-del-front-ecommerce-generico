import axiosInstance from "@/lib/axios/axios";
import {
  ICreateUser,
  IGetUserQuery,
  IUpdateUser,
} from "../schemas/user-schemas";
import { IUser } from "@/types/resources/user-type";
import { ApiResponse } from "@/types/responses.type";
import { PaginationType } from "@/types/pagination-type";

export const getUsers = async (
  data: IGetUserQuery,
): Promise<
  ApiResponse<{
    data: IUser[];
    pagination: PaginationType;
  }>
> => {
  const params: IGetUserQuery = {
    ...(data?.page && { page: data.page }),
    ...(data?.pageSize && { pageSize: data.pageSize }),
    ...(data?.search && { search: data.search }),
    ...(data?.name && { name: data.name }),
    ...(data?.email && { email: data.email }),
    ...(data?.role && { role: data.role }),
    ...(data?.status && data.status === "false"
      ? { status: undefined }
      : { status: data.status }),

    ...(data?.getRole !== undefined && { getRole: data.getRole }),
    ...(data?.getAddress !== undefined && { getAddress: data.getAddress }),
    ...(data?.getOrders !== undefined && { getOrders: data.getOrders }),

    ...(data?.sortBy && { sortBy: data.sortBy }),
    ...(data?.sortOrder && { sortOrder: data.sortOrder }),
  };

  const res = await axiosInstance.get("/users", {
    params,
  });

  return res.data;
};

export const getUserById = async (id: string): Promise<ApiResponse<IUser>> => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (
  data: ICreateUser,
): Promise<ApiResponse<IUser>> => {
  const res = await axiosInstance.post("/users", data);
  return res.data;
};

export const updateUser = async (
  id: string,
  data: IUpdateUser,
): Promise<ApiResponse<IUser>> => {
  const res = await axiosInstance.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string): Promise<ApiResponse<IUser>> => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};
