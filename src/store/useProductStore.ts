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
  editId: string | null;
  setEditId: (id: string | null) => void;
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
  editId: "",
  setEditId: (id) => set({ editId: id }),
}));

export default useProductStore;
