import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

const deleteProduct = async (id: string | number) => {
  const { error } = await supabase
    .from("inventory-products")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filtered-products"] });
    },
  });
};
