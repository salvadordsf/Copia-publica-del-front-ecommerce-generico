import { useQuery } from "@tanstack/react-query";
import { IGetItem } from "../../schemas/items/items-schema";
import { getItemById, getItems } from "./items.axios";

export const useItems = (query: IGetItem) => {
  return useQuery({
    queryKey: ["items", query],
    queryFn: () => getItems(query),
  });
};

export const useItemById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
    enabled: !!id && enabled,
  });
};
