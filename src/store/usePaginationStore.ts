import { create } from "zustand";

type PaginationStore = {
  dataPerPage: number;
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
};

const usePaginationStore = create<PaginationStore>((set) => ({
  dataPerPage: 10,
  currentPage: 1,
  setCurrentPage: (pageNum) => set({ currentPage: pageNum }),
}));

export default usePaginationStore;
