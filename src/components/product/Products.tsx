import ProductData from "../../TempData";
import ProductItem from "./ProductItem";
import ProductItemMobile from "./ProductItemMobile";

const Products = () => {
  return (
    <div className="lg:border-2 lg:border-border lg:p-4">
      <div className="sm:flex sm:items-center sm:justify-between sm:gap-2 pb-2 mb-2 border-b-2">
        <div className="mb-2 sm:mb-0">
          <h2 className="text-xl font-semibold"> All Products </h2>
          <p className="text-gray-800"> View and manage your inventory </p>
        </div>

        <span> 200 products </span>
      </div>

      <table className="hidden lg:block">
        <tbody>
          <tr>
            <th> Product </th>
            <th> SKU </th>
            <th> Category </th>
            <th> Price </th>
            <th> Stock </th>
            <th> Status </th>
            <th> Last Updated </th>
            <th> Actions </th>
          </tr>

          {ProductData.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </tbody>
      </table>

      <ul className="sm:grid sm:grid-cols-2 sm:gap-4 space-y-6 sm:space-y-0 lg:hidden">
        {ProductData.map((product) => {
          return <ProductItemMobile key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default Products;
