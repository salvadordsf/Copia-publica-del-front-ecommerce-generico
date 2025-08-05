import { create } from "zustand";
import { IGetUserQuery } from "../schemas/user-schemas";

interface IUserFilters {
  filters: IGetUserQuery;
  setFilters: (filter: Partial<IGetUserQuery>) => void;
  resetFilters: () => void;
}

const defaultFilters: IGetUserQuery = {
  page: undefined,
  pageSize: undefined,
  search: undefined,
  name: undefined,
  email: undefined,
  role: undefined,
  status: undefined,
  
  getRole: undefined,
  getAddress: undefined,
  getOrders: undefined,

  sortBy: undefined,
  sortOrder: undefined,
};

export const useUserSearchFilters = create<IUserFilters>((set) => ({
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
