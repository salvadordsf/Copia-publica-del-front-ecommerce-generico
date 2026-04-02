import { create } from "zustand";
import { IGetOrderQuery } from "../../orders/schemas/orders-schema";

interface IOrdersFilters {
  filters: IGetOrderQuery;
  setFilters: (filter: Partial<IGetOrderQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IGetOrderQuery = {
  userId: "",
  status: undefined,
  products: false,
  search: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const useOrdersSearchFilters = create<IOrdersFilters>((set) => ({
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
