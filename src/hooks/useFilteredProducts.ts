import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

type FilteredProducts = {
  searchQuery: string;
  categoryOption: string;
  stockStatus: string;
  sortBy: string;
};

const fetchFilteredProducts = async ({
  searchQuery,
  categoryOption,
  stockStatus,
  sortBy,
}: FilteredProducts) => {
  let query = supabase.from("inventory-products").select("*");

  if (searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  if (categoryOption !== "All Categories") {
    query = query.eq("category", categoryOption);
  }

  if (sortBy === "Price: Low to High") {
    query = query.order("price", { ascending: true });
  } else if (sortBy === "Price: High to Low") {
    query = query.order("price", { ascending: false });
  } else if (sortBy === "Name: A–Z") {
    query = query.order("name", { ascending: true });
  } else if (sortBy === "Name: Z–A") {
    query = query.order("name", { ascending: false });
  } else if (sortBy === "Stock: Low to High") {
    query = query.order("stock", { ascending: true });
  } else if (sortBy === "Stock: High to Low") {
    query = query.order("stock", { ascending: false });
  } else if (sortBy === "Newest First") {
    query = query.order("created_at", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
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
  sortBy,
}: FilteredProducts) => {
  return useQuery({
    queryKey: [
      "filtered-products",
      searchQuery,
      categoryOption,
      stockStatus,
      sortBy,
    ],
    queryFn: () =>
      fetchFilteredProducts({
        searchQuery,
        categoryOption,
        stockStatus,
        sortBy,
      }),
  });
};

export default useFilteredProducts;
