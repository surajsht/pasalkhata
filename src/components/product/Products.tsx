import ProductItem from "./ProductItem";
import ProductItemMobile from "./ProductItemMobile";
import CardLoader from "../skeleton-loader/CardLoader";
import TableLoader from "../skeleton-loader/TableLoader";
import ErrorMessage from "../ErrorMessage";
import useProducts from "../../hooks/useProducts";

const Products = () => {
  const { data, isLoading, isError, error, refetch } = useProducts();

  if (isError)
    return (
      <ErrorMessage
        text="Failed to load products"
        error={error.message}
        refetch={refetch}
      />
    );

  return (
    <div className="lg:border-2 lg:border-border lg:p-4">
      <div className="sm:flex sm:items-center sm:justify-between sm:gap-2 mb-4">
        <div className="mb-2 sm:mb-0">
          <h2 className="text-xl font-semibold"> All Products </h2>
          <p className="text-gray-800"> View and manage your inventory </p>
        </div>

        {isLoading ? (
          <div className="animate-pulse h-3 w-20 bg-gray-300"></div>
        ) : (
          <span> {data?.length} products </span>
        )}
      </div>

      <table className="hidden lg:table w-full table-fixed border-2">
        <thead className="border-b-2">
          <tr>
            <th className="w-[25%] p-3 text-left text-sm">Product</th>
            <th className="w-[12%] p-3 text-left text-sm">SKU</th>
            <th className="w-[12%] p-3 text-left text-sm">Category</th>
            <th className="w-[10%] p-3 text-left text-sm">Price</th>
            <th className="w-[8%] p-3 text-left text-sm">Stock</th>
            <th className="w-[11%] p-3 text-left text-sm">Status</th>
            <th className="w-[12%] p-3 text-left text-sm">Last Updated</th>
            <th className="w-[10%] p-3 text-left text-sm">Actions</th>
          </tr>
        </thead>

        {isLoading ? (
          <TableLoader />
        ) : (
          <tbody className="divide-y-2">
            {data?.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
          </tbody>
        )}
      </table>

      <ul className="sm:grid sm:grid-cols-2 sm:gap-4 space-y-6 sm:space-y-0 lg:hidden">
        {isLoading ? (
          <CardLoader />
        ) : (
          data?.map((product) => {
            return <ProductItemMobile key={product.id} product={product} />;
          })
        )}
      </ul>
    </div>
  );
};

export default Products;
