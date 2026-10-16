import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

type FilteredProducts = {
  searchQuery: string;
  categoryOption: string;
};

const fetchFilteredProducts = async ({
  searchQuery,
  categoryOption,
}: FilteredProducts) => {
  let query = supabase.from("inventory-products").select("*");

  if (searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  if (categoryOption !== "All Categories") {
    query = query.eq("category", categoryOption);
  }

  return await query;
};

const useFilteredProducts = ({
  searchQuery,
  categoryOption,
}: FilteredProducts) => {
  return useQuery({
    queryKey: ["filtered-products", searchQuery, categoryOption],
    queryFn: () => fetchFilteredProducts({ searchQuery, categoryOption }),
  });
};

export default useFilteredProducts;
