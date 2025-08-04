import { useMutation } from "@tanstack/react-query";
import { ICreateTagSchema } from "../schemas/tags-schema";
import { createTag, deleteTag, toggleCreateTag, updateTag } from "./tags-axios";
import { queryClient } from "@/lib/react-query/query-client";

export const useCreateTag = () => {
  return useMutation({
    mutationFn: (data: ICreateTagSchema) => createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useToggleCreateTag = () => {
  return useMutation({
    mutationFn: (data: ICreateTagSchema) => toggleCreateTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useUpdateTag = (id: string) => {
  return useMutation({
    mutationFn: (data: ICreateTagSchema) => updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tag"] });
    },
  });
};

export const useDeleteTag = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};
