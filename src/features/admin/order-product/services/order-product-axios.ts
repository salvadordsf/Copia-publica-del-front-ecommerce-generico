import axiosInstance from "@/lib/axios/axios";
import { ICreateOrderProduct } from "../schemas/order-product-schema";
import { ApiResponse } from "@/types/responses.type";
import { IOrder, IOrderProduct } from "@/types/resources/order-types";

export const createOrderProduct = async (
  data: ICreateOrderProduct,
): Promise<ApiResponse<{ orderProduct: IOrderProduct; order: IOrder }>> => {
  const res = await axiosInstance.post("/order-products", data);

  return res.data;
};

export const createManyOrderProducts = async (items: ICreateOrderProduct[]) => {
  const results = [];

  for (const item of items) {
    const created = await createOrderProduct(item);
    results.push(created);
  }

  return results;
};
