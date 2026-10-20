import ActiveFilters from "../components/filters/ActiveFilters";
import FilterContainer from "../components/filters/FilterContainer";
import Pagination from "../components/Pagination";
import Products from "../components/product/Products";

const ProductsPage = () => {
  return (
    <div>
      <FilterContainer />
      <ActiveFilters />
      <Products />
      <Pagination />
    </div>
  );
};

export default ProductsPage;
