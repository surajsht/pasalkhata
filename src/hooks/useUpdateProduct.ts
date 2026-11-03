import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

type UpdateProductParams = {
  id: string | number;
  updatedData: {
    name: string;
    price: number | string;
    category: string;
    brand: string;
    sku: string;
    description: string;
    stock: number | string;
    low_stock_threshold: number | string;
    updated_at: string;
  };
};

const updateProduct = async ({ id, updatedData }: UpdateProductParams) => {
  const { data, error } = await supabase
    .from("inventory-products")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filtered-products"] });
    },
  });
};
