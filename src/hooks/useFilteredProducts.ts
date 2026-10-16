import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

type FilteredProducts = {
  searchQuery: string;
  categoryOption: string;
  stockStatus: string;
};

const fetchFilteredProducts = async ({
  searchQuery,
  categoryOption,
  stockStatus,
}: FilteredProducts) => {
  let query = supabase.from("inventory-products").select("*");

  if (searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  if (categoryOption !== "All Categories") {
    query = query.eq("category", categoryOption);
  }

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

const useFilteredProducts = ({
  searchQuery,
  categoryOption,
  stockStatus,
}: FilteredProducts) => {
  return useQuery({
    queryKey: ["filtered-products", searchQuery, categoryOption, stockStatus],
    queryFn: () =>
      fetchFilteredProducts({ searchQuery, categoryOption, stockStatus }),
  });
};

export default useFilteredProducts;
