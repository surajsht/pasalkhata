import ActiveFilters from "../components/filters/ActiveFilters";
import FilterContainer from "../components/filters/FilterContainer";
import Pagination from "../components/Pagination";
import Products from "../components/product/Products";
import useDebounce from "../hooks/useDebounce";
import useFilteredProducts from "../hooks/useFilteredProducts";
import usePaginationStore from "../store/usePaginationStore";
import useProductStore from "../store/useProductStore";

const ProductsPage = () => {
  const userQuery = useProductStore((state) => state.userQuery);
  const categoryOption = useProductStore((state) => state.categoryOption);
  const stockStatus = useProductStore((state) => state.stockStatus);
  const sortBy = useProductStore((state) => state.sortBy);
  const debouncedValue = useDebounce(userQuery);
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const dataPerPage = usePaginationStore((state) => state.dataPerPage);

  const paginationStartIndex = (currentPage - 1) * dataPerPage;
  const paginationEndIndex = currentPage * dataPerPage - 1;

  const { data, isLoading, isError, error, refetch } = useFilteredProducts({
    debouncedValue,
    categoryOption,
    stockStatus,
    sortBy,
    paginationStartIndex,
    paginationEndIndex,
    setCurrentPage,
  });

  return (
    <div>
      <FilterContainer />
      <ActiveFilters />
      <Products
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
      <Pagination data={data} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default ProductsPage;
