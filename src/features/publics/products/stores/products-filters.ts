import { IGetProductsQuery } from "@/features/admin/products/schemas/products-schemas";
import { create } from "zustand";

interface ProductsFiltersState {
  filters: IGetProductsQuery;

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;

  setSearch: (search?: string) => void;
  setPriceRange: (min?: number, max?: number) => void;

  setCategoryId: (categoryId?: string) => void;
  setSubcategoryId: (subcategoryId?: string) => void;

  setSort: (
    sortBy?: IGetProductsQuery["sortBy"],
    sortOrder?: IGetProductsQuery["sortOrder"],
  ) => void;

  setFilters: (filters: Partial<IGetProductsQuery>) => void;
  resetFilters: () => void;
}

const initialState: IGetProductsQuery = {
  page: "1",
  pageSize: "12",
  status: "ACTIVE",

  name: undefined,
  search: undefined,

  priceMin: undefined,
  priceMax: undefined,

  category: undefined,
  subcategory: undefined,

  categoryId: undefined,
  subcategoryId: undefined,

  sortBy: undefined,
  sortOrder: undefined,
};

export const useProductsFiltersStore = create<ProductsFiltersState>((set) => ({
  filters: initialState,

  setPage: (page) =>
    set((state) => ({
      filters: {
        ...state.filters,
        page: String(page),
      },
    })),

  setPageSize: (pageSize) =>
    set((state) => ({
      filters: {
        ...state.filters,
        pageSize: String(pageSize),
        page: "1",
      },
    })),

  setSearch: (search) =>
    set((state) => ({
      filters: {
        ...state.filters,
        search,
        page: "1",
      },
    })),

  setPriceRange: (min, max) =>
    set((state) => ({
      filters: {
        ...state.filters,
        priceMin: min !== undefined ? String(min) : undefined,
        priceMax: max !== undefined ? String(max) : undefined,
        page: "1",
      },
    })),

  setCategoryId: (categoryId) =>
    set((state) => ({
      filters: {
        ...state.filters,
        categoryId,
        subcategoryId: undefined,
        page: "1",
      },
    })),

  setSubcategoryId: (subcategoryId) =>
    set((state) => ({
      filters: {
        ...state.filters,
        subcategoryId,
        page: "1",
      },
    })),

  setSort: (sortBy, sortOrder) =>
    set((state) => ({
      filters: {
        ...state.filters,
        sortBy,
        sortOrder,
        page: "1",
      },
    })),

  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
        page:
          filters.page !== undefined
            ? String(filters.page)
            : state.filters.page,
        status: "ACTIVE",
      },
    })),

  resetFilters: () =>
    set(() => ({
      filters: initialState,
    })),
}));