import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import ProductItem from "./ProductItem";
import ProductItemMobile from "./ProductItemMobile";

const fetchProducts = async () => {
  const { data, error } = await supabase.from("inventory-products").select("*");

  if (error) throw new Error(error.message);

  return data;
};

const Products = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["inventory-products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <h2> Loading... </h2>;

  if (isError) return <h2> Error: {error.message} </h2>;

  return (
    <div className="lg:border-2 lg:border-border lg:p-4">
      <div className="sm:flex sm:items-center sm:justify-between sm:gap-2 mb-4">
        <div className="mb-2 sm:mb-0">
          <h2 className="text-xl font-semibold"> All Products </h2>
          <p className="text-gray-800"> View and manage your inventory </p>
        </div>

        <span> 200 products </span>
      </div>

      <table className="hidden lg:block border-2">
        <thead className="block py-3 border-b-2">
          <tr className="flex items-center justify-between">
            <th className="w-[25%] text-sm"> Product </th>
            <th className="flex-1 text-sm"> SKU </th>
            <th className="flex-1 text-sm"> Category </th>
            <th className="flex-1 text-sm"> Price </th>
            <th className="flex-1 text-sm"> Stock </th>
            <th className="flex-1 text-sm"> Status </th>
            <th className="flex-1 text-sm"> Last Updated </th>
            <th className="flex-1 text-sm"> Actions </th>
          </tr>
        </thead>

        <tbody className="block">
          {data?.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </tbody>
      </table>

      <ul className="sm:grid sm:grid-cols-2 sm:gap-4 space-y-6 sm:space-y-0 lg:hidden">
        {data?.map((product) => {
          return <ProductItemMobile key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default Products;
