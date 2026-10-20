import useProducts from "../hooks/useProducts";
import usePaginationStore from "../store/usePaginationStore";

const Pagination = () => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const dataPerPage = usePaginationStore((state) => state.dataPerPage);
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <h2> Loading... </h2>;

  const totalDataNumber = data?.length || 0;
  const totalPaginationPage = Math.ceil(totalDataNumber / dataPerPage);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  if (isError) return null;

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <button
        className="bg-primary hover:bg-primaryHover disabled:bg-primaryLight disabled:text-gray-700 disabled:border-2 disabled:border-border text-white text-sm font-medium tracking-widest px-6 py-2 rounded-md"
        onClick={() => handlePrevClick()}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="text-lg font-medium text-gray-700"> {currentPage} </span>
      <button
        className="bg-primary hover:bg-primaryHover disabled:bg-primaryLight disabled:text-gray-700 disabled:border-2 disabled:border-border text-white text-sm font-medium tracking-widest px-6 py-2 rounded-md"
        onClick={() => handleNextClick()}
        disabled={currentPage === totalPaginationPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
