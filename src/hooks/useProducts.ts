import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

const fetchProducts = async () => {
  const { data, error } = await supabase.from("inventory-products").select("*");

  if (error) throw new Error(error.message);

  return data;
};

const useProducts = () => {
    return useQuery({
    queryKey: ["inventory-products"],
    queryFn: fetchProducts,
  });
}

export default useProducts