import { useQuery } from "@tanstack/react-query";
import { IGetTagQuery } from "../schemas/tags-schema";
import { getTagById, getTags } from "./tags-axios";

export const useTags = (query: IGetTagQuery) => {
  return useQuery({
    queryKey: ["tags", query],
    queryFn: () => getTags(query),
  });
};

export const useTagById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["tag", id],
    queryFn: () => getTagById(id),
    enabled: !!id && enabled,
  });
};
