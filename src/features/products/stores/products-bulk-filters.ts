import { create } from "zustand";
import { IFilterBulkProductsQuery } from "../schemas/products-schemas";

interface IProductFilters {
  filters: IFilterBulkProductsQuery;
  setFilters: (filters: Partial<IFilterBulkProductsQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IFilterBulkProductsQuery = {
  search: "",
  priceMin: undefined,
  priceMax: undefined,
  relevance: undefined,
  categoryId: undefined,
  subcategoryId: undefined,
  status: undefined,
};

export const useProductsBulkFilters = create<IProductFilters>((set) => ({
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
