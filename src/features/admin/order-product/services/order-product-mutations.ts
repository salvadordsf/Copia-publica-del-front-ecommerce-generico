import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { ICreateOrderProduct } from "../schemas/order-product-schema";
import { createManyOrderProducts } from "./order-product-axios";

export const useCreateOrderProducts = () => {
  return useMutation({
    mutationFn: (data: ICreateOrderProduct[]) => createManyOrderProducts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
