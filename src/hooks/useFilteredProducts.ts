import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

type FilteredProductsParams = {
  searchQuery: string;
  categoryOption: string;
  stockStatus: string;
  sortBy: string;
  paginationStartIndex: number;
  paginationEndIndex: number;
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
  searchQuery,
  categoryOption,
  stockStatus,
  sortBy,
  paginationStartIndex,
  paginationEndIndex,
}: FilteredProductsParams) => {
  let query = supabase
    .from("inventory-products")
    .select("*")
    .range(paginationStartIndex, paginationEndIndex);

  if (searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  if (categoryOption !== "All Categories") {
    query = query.eq("category", categoryOption);
  }

  const sortRule = sortConfig[sortBy] || {
    column: "created_at",
    ascending: false,
  };

  query = query.order(sortRule.column, { ascending: sortRule.ascending });

  const { data, error } = await query;

  if (error || !data) return [];

  if (stockStatus === "Out of stock") {
    return data.filter((item) => item.stock === 0);
  }

  if (stockStatus === "Low stock") {
    return data.filter(
      (item) => item.stock > 0 && item.stock <= item.low_stock_threshold,
    );
  }

  if (stockStatus === "In stock") {
    return data.filter((item) => item.stock > item.low_stock_threshold);
  }

  return data;
};

const useFilteredProducts = (params: FilteredProductsParams) => {
  return useQuery({
    queryKey: [
      "filtered-products",
      params.searchQuery,
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
