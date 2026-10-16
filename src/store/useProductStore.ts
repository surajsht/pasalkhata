import { create } from "zustand";

type ProductStore = {
  userQuery: string;
  setUserQuery: (value: string) => void;
  categoryOption: string;
  setCategoryOption: (value: string) => void;
};

const useProductStore = create<ProductStore>((set) => ({
  userQuery: "",
  setUserQuery: (value: string) => set({ userQuery: value }),
  categoryOption: "All Categories",
  setCategoryOption: (value) => set({ categoryOption: value }),
}));

export default useProductStore;
