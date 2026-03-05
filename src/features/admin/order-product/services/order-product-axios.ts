import axiosInstance from "@/lib/axios/axios";
import { ICreateOrderProduct } from "../schemas/order-product-schema";

export const createOrderProduct = async (data: ICreateOrderProduct) => {
  const res = await axiosInstance.post("/order-products", data);
  console.log(res);
  return res.data;
};

export const createManyOrderProducts = async (
  items: ICreateOrderProduct[]
) => {
  const results = [];

  for (const item of items) {
    const created = await createOrderProduct(item);
    results.push(created);
  }

  return results;
};