import useProductStore from "../../store/useProductStore";
import { IoCloseSharp } from "react-icons/io5";

const ActiveFilters = () => {
  const debouncedValue = useProductStore((state) => state.debouncedValue);
  const setDebouncedValue = useProductStore((state) => state.setDebouncedValue);
  const setUserQuery = useProductStore((state) => state.setUserQuery);
  const categoryOption = useProductStore((state) => state.categoryOption);
  const setCategoryOption = useProductStore((state) => state.setCategoryOption);
  const stockStatus = useProductStore((state) => state.stockStatus);
  const setStockStatus = useProductStore((state) => state.setStockStatus);
  const sortBy = useProductStore((state) => state.sortBy);
  const setSortBy = useProductStore((state) => state.setSortBy);

  if (
    !debouncedValue.trim() &&
    categoryOption === "All Categories" &&
    stockStatus === "All stock" &&
    sortBy === "Newest First"
  )
    return null;

  return (
    <div className="mt-4 mb-6 flex items-center gap-2 flex-wrap">
      <h2 className="text-lg font-medium text-gray-700"> Filter by: </h2>

      <div className="flex items-center gap-4">
        {debouncedValue && (
          <div className="flex items-center gap-3 border border-primary bg-surface px-3 py-1 text-gray-700 rounded-md">
            <span className="text-sm font-medium"> {debouncedValue} </span>
            <button
              className=" hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => {
                setDebouncedValue("");
                setUserQuery("");
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        )}

        {categoryOption !== "All Categories" && (
          <div className="flex items-center gap-3 border border-primary bg-surface px-3 py-1 text-gray-700 rounded-md">
            <span className="text-sm font-medium"> {categoryOption} </span>
            <button
              className=" hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setCategoryOption("All Categories")}
            >
              <IoCloseSharp />
            </button>
          </div>
        )}

        {stockStatus !== "All stock" && (
          <div className="flex items-center gap-3 border border-primary bg-surface px-3 py-1 text-gray-700 rounded-md">
            <span className="text-sm font-medium"> {stockStatus} </span>
            <button
              className=" hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setStockStatus("All stock")}
            >
              <IoCloseSharp />
            </button>
          </div>
        )}

        {sortBy !== "Newest First" && (
          <div className="flex items-center gap-3 border border-primary bg-surface px-3 py-1 text-gray-700 rounded-md">
            <span className="text-sm font-medium"> {sortBy} </span>
            <button
              className=" hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setSortBy("Newest First")}
            >
              <IoCloseSharp />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
