import axiosInstance from "@/lib/axios/axios";
import {
  ICreateUser,
  IGetUserQuery,
  IUpdateUser,
} from "../schemas/user-schemas";

export const getUsers = async (data: IGetUserQuery) => {
  const params: any = {
    ...(data?.page && { page: data.page }),
    ...(data?.pageSize && { pageSize: data.pageSize }),
    ...(data?.search && { search: data.search }),
    ...(data?.name && { name: data.name }),
    ...(data?.email && { email: data.email }),
    ...(data?.role && { role: data.role }),
    ...(data?.status && data.status === "false" ? {status: undefined} : { status: data.status }),

    ...(data?.getRole !== undefined && { getRole: data.getRole }),
    ...(data?.getAddress !== undefined && { getAddress: data.getAddress }),
    ...(data?.getOrders !== undefined && { getOrders: data.getOrders }),

    ...(data?.sortBy && { sortBy: data.sortBy }),
    ...(data?.sortOrder && { sortOrder: data.sortOrder }),
  };

  const res = await axiosInstance.get("/users", {
    params,
  });

  console.log(res);
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axiosInstance.get(`/users/${id}`);
  console.log(res);
  return res.data;
};

export const createUser = async (data: ICreateUser) => {
  const res = await axiosInstance.post("/user", data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const updateUser = async (id: string, data: IUpdateUser) => {
  const res = await axiosInstance.put(`/user/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  console.log(res);
  return res.data;
};
