import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

type FilteredProducts = {
  searchQuery: string;
};

const fetchFilteredProducts = async ({ searchQuery }: FilteredProducts) => {
  let query = supabase.from("inventory-products").select("*");

  if (searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  return await query;
};

const useFilteredProducts = (searchQuery: string) => {
  return useQuery({
    queryKey: ["filtered-products", searchQuery],
    queryFn: () => fetchFilteredProducts({ searchQuery }),
  });
};

export default useFilteredProducts;
