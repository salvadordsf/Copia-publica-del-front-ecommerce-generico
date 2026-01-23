import axiosInstance from "@/lib/axios/axios";

export const getHome = async () => {
  const res = await axiosInstance.get("/home");
  console.log(res);
  return res.data;
};
