import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { createSection, deleteSection, updateSection } from "./sections.axios";
import {
  ICreateSection,
  IUpdateSectionForMutation,
} from "../../schemas/sections/sections-schema";

export const useCreateSection = () => {
  return useMutation({
    mutationFn: (data: ICreateSection) => createSection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};

export const useUpdateSection = (id: string) => {
  return useMutation({
    mutationFn: (data: IUpdateSectionForMutation) => updateSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};

export const useDeleteSection = () => {
  return useMutation({
    mutationFn: (id: string) => deleteSection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};
