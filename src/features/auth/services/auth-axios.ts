import axiosInstance from "@/lib/axios/axios";
import { ILogin, IRegister } from "../schemas/auth-schemas";

export const register = async (data: IRegister) => {
  const res = await axiosInstance.post("/auth/register", data);
  console.log(data)
  console.log(res)
  return res.data;
};

export const login = async (data: ILogin) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const getUser = async () => {
    const res = await axiosInstance.get("/users")
    console.log(res)
    return res.data
}
getUser();