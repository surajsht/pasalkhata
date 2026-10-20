import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

type FilteredProductsParams = {
  debouncedValue: string;
  categoryOption: string;
  stockStatus: string;
  sortBy: string;
  paginationStartIndex: number;
  paginationEndIndex: number;
  setCurrentPage: (pageNum: number) => void;
};

const sortConfig: Record<string, { column: string; ascending: boolean }> = {
  "Price: Low to High": { column: "price", ascending: true },
  "Price: High to Low": { column: "price", ascending: false },
  "Name: A–Z": { column: "name", ascending: true },
  "Name: Z–A": { column: "name", ascending: false },
  "Stock: Low to High": { column: "stock", ascending: true },
  "Stock: High to Low": { column: "stock", ascending: false },
  "Newest First": { column: "created_at", ascending: false },
  "Oldest First": { column: "created_at", ascending: true },
};

const fetchFilteredProducts = async ({
  debouncedValue,
  categoryOption,
  stockStatus,
  sortBy,
  paginationStartIndex,
  paginationEndIndex,
  setCurrentPage,
}: FilteredProductsParams) => {
  let query = supabase
    .from("inventory-products")
    .select("*", { count: "exact" })
    .range(paginationStartIndex, paginationEndIndex);

  if (debouncedValue.trim() !== "") {
    setCurrentPage(1);
    query = query.ilike("name", `%${debouncedValue}%`);
  }

  if (categoryOption !== "All Categories") {
    query = query.eq("category", categoryOption);
  }

  const sortRule = sortConfig[sortBy] || {
    column: "created_at",
    ascending: false,
  };

  query = query.order(sortRule.column, { ascending: sortRule.ascending });

  const { data, error, count } = await query;

  if (error || !data) return { filteredData: [], count: 0 };

  let resultData = data;

  if (stockStatus === "Out of stock") {
    resultData = data.filter((item) => item.stock === 0);
  } else if (stockStatus === "Low stock") {
    resultData = data.filter(
      (item) => item.stock > 0 && item.stock <= item.low_stock_threshold,
    );
  } else if (stockStatus === "In stock") {
    resultData = data.filter((item) => item.stock > item.low_stock_threshold);
  }

  return {
    filteredData: resultData,
    count: count ?? 0,
  };
};

const useFilteredProducts = (params: FilteredProductsParams) => {
  return useQuery({
    queryKey: [
      "filtered-products",
      params.debouncedValue,
      params.categoryOption,
      params.stockStatus,
      params.sortBy,
      params.paginationStartIndex,
      params.paginationEndIndex,
    ],
    queryFn: () => fetchFilteredProducts(params),
    staleTime: 1000 * 60 * 2,
  });
};

export default useFilteredProducts;
