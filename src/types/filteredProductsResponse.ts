import type { ProductDataType } from "../TempData";

export type FilteredProductsResponse = {
  filteredData: ProductDataType[] | undefined;
  count: number | null;
};
