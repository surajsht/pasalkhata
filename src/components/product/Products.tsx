import ProductItem from "./ProductItem";
import ProductItemMobile from "./ProductItemMobile";
import CardLoader from "../skeleton-loader/CardLoader";
import TableLoader from "../skeleton-loader/TableLoader";
import ErrorMessage from "../ErrorMessage";
import type { FilteredProductsResponse } from "../../types/filteredProductsResponse";

type ProductsProps = {
  data: FilteredProductsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

const Products = ({
  data,
  isLoading,
  isError,
  error,
  refetch,
}: ProductsProps) => {
  if (isError)
    return (
      <ErrorMessage
        text="Failed to load products"
        error={(error as Error)?.message}
        refetch={refetch}
      />
    );

  const dataLength = data?.filteredData?.length || 0;

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
          <span> {data?.filteredData?.length} products </span>
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
        ) : dataLength > 0 ? (
          <tbody className="divide-y-2">
            {data?.filteredData?.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
          </tbody>
        ) : (
          ""
        )}
      </table>

      {dataLength === 0 ? (
        <p className="text-center mt-4 text-gray-700 font-medium">
          No products to show
        </p>
      ) : (
        ""
      )}

      {dataLength > 0 && (
        <ul className="sm:grid sm:grid-cols-2 sm:gap-4 space-y-6 sm:space-y-0 lg:hidden">
          {isLoading ? (
            <CardLoader />
          ) : (
            data?.filteredData?.map((product) => {
              return <ProductItemMobile key={product.id} product={product} />;
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default Products;
