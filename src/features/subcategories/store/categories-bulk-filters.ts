import { create } from "zustand";
import { IFilterBulkSubcategoriesQuery } from "../schemas/subcategories-schema";

interface IProductFilters {
  filters: IFilterBulkSubcategoriesQuery;
  setFilters: (filters: Partial<IFilterBulkSubcategoriesQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IFilterBulkSubcategoriesQuery = {
  name: "",
  categoryId: undefined,
  status: undefined,
};

export const useSubcategoriesBulkFilters = create<IProductFilters>((set) => ({
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
