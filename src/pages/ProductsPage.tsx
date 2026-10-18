import ActiveFilters from "../components/filters/ActiveFilters";
import FilterContainer from "../components/filters/FilterContainer";
import Products from "../components/product/Products";

const ProductsPage = () => {
  return (
    <div>
      <FilterContainer />
      <ActiveFilters />
      <Products />
    </div>
  );
};

export default ProductsPage;
