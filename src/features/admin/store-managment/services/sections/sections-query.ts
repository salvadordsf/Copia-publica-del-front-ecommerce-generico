import { useQuery } from "@tanstack/react-query";
import { IGetSection } from "../../schemas/sections/sections-schema";
import { getSectionById, getSections } from "./sections.axios";

export const useSections = (query: IGetSection) => {
  return useQuery({
    queryKey: ["sections", query],
    queryFn: () => getSections(query),
  });
};

export const useSectionById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["section", id],
    queryFn: () => getSectionById(id),
    enabled: !!id && enabled,
  });
};
