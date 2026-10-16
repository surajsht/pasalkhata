import { create } from "zustand";

type ProductStore = {
  userQuery: string;
  setUserQuery: (value: string) => void;
  categoryOption: string;
  setCategoryOption: (value: string) => void;
  stockStatus: string;
  setStockStatus: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
};

const useProductStore = create<ProductStore>((set) => ({
  userQuery: "",
  setUserQuery: (value: string) => set({ userQuery: value }),
  categoryOption: "All Categories",
  setCategoryOption: (value) => set({ categoryOption: value }),
  stockStatus: "All stock",
  setStockStatus: (value) => set({ stockStatus: value }),
  sortBy: "Newest First",
  setSortBy: (value) => set({ sortBy: value }),
}));

export default useProductStore;
