import { create } from "zustand";
import { IFilterBulkCategoryQuery } from "../../schemas/categories-schema";

interface ICategoriesFilters {
  filters: IFilterBulkCategoryQuery;
  setFilters: (filters: Partial<IFilterBulkCategoryQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IFilterBulkCategoryQuery = {
  name: "",
  status: undefined,
};

export const useCategoriesBulkFilters = create<ICategoriesFilters>((set) => ({
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
