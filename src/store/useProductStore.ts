import { create } from "zustand";

type ProductStore = {
  userQuery: string;
  setUserQuery: (value: string) => void;
};

const useProductStore = create<ProductStore>((set) => ({
  userQuery: "",
  setUserQuery: (value: string) => set({ userQuery: value }),
}));

export default useProductStore;
