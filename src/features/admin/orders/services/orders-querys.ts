import { useQuery } from "@tanstack/react-query";
import { IGetOrderQuery } from "../schemas/orders-schema";
import { getOrderById, getOrders } from "./orders-axios";

export const useOrders = (query: IGetOrderQuery) => {
  return useQuery({
    queryKey: ["orders", query],
    queryFn: () => getOrders(query),
  });
};

export const useOrderById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id && enabled,
  });
};
