import { create } from "zustand";
import { IFilterBulkTagsQuery } from "../schemas/tags-schema";

interface ITagsFilters {
  filters: IFilterBulkTagsQuery;
  setFilters: (filters: Partial<IFilterBulkTagsQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IFilterBulkTagsQuery = {
  name: "",
  status: undefined,
};

export const useTagsBulkFilters = create<ITagsFilters>((set) => ({
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
