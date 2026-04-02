import { create } from "zustand";
import { IGetProductsQuery } from "../schemas/products-schemas";

interface IProductFilters {
  filters: IGetProductsQuery;
  setFilters: (filter: Partial<IGetProductsQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IGetProductsQuery = {
  search: "",
  priceMin: undefined,
  priceMax: undefined,
  relevance: undefined,
  categoryId: undefined,
  subcategoryId: undefined,
  status: undefined,
  category: true,
  subcategory: true,
  tags: false,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const useProductsSearchFilters = create<IProductFilters>((set) => ({
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
