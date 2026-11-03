import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

const getSingleProduct = async (id: string | null) => {
  const { data, error } = await supabase
    .from("inventory-products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

const useSingleProduct = (id: string | null) => {
  return useQuery({
    queryKey: ["single-product", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
  });
};

export default useSingleProduct;
