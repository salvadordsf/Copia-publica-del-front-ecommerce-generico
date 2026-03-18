import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { ICreateOrder, IUpdateOrder } from "../schemas/orders-schema";
import { createOrder, deleteOrder, updateOrder } from "./orders-axios";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: ICreateOrder) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = (id: string) => {
  return useMutation({
    mutationFn: (data: IUpdateOrder) => updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};
