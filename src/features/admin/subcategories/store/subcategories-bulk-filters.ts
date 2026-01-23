import { create } from "zustand";
import { IFilterBulkSubcategoriesQuery } from "../schemas/subcategories-schema";

interface ISubcategoriesFiltersStore {
  filters: IFilterBulkSubcategoriesQuery;
  setFilters: (filters: Partial<IFilterBulkSubcategoriesQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IFilterBulkSubcategoriesQuery = {
  name: "",
  categoryId: undefined,
  status: undefined,
};

export const useSubcategoriesBulkFilters = create<ISubcategoriesFiltersStore>(
  (set) => ({
    filters: defaultFilters,
    setFilters: (filters) => set({ filters: { ...filters } }),
    resetFilters: () => set({ filters: { ...defaultFilters } }),
  })
);
