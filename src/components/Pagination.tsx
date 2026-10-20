import useProducts from "../hooks/useProducts";
import usePaginationStore from "../store/usePaginationStore";
import PaginationLoader from "./skeleton-loader/PaginationLoader";

const Pagination = () => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const dataPerPage = usePaginationStore((state) => state.dataPerPage);
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <PaginationLoader />;

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
    <div className="flex items-center justify-center gap-6 my-6">
      <button
        className="bg-primary hover:bg-primaryHover disabled:bg-primaryLight disabled:text-gray-700 disabled:border-2 disabled:border-border text-white text-sm font-medium tracking-widest px-6 py-2 rounded-md"
        onClick={() => handlePrevClick()}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <ul className="flex items-center gap-4">
        {Array.from({ length: totalPaginationPage }).map((_, idx) => {
          return (
            <li key={idx}>
              <button
                className={`border-2 px-4 py-2 ${currentPage === idx + 1 ? "border-primary" : "border-border"} rounded-md hover:border-primary`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            </li>
          );
        })}
      </ul>

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
