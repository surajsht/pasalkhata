import useProductStore from "../../../store/useProductStore";

const sortOptions: string[] = [
  "Newest First",
  "Oldest First",
  "Name: A–Z",
  "Name: Z–A",
  "Price: Low to High",
  "Price: High to Low",
  "Stock: Low to High",
  "Stock: High to Low",
];

const SortFilterMobile = () => {
  const sortBy = useProductStore((state) => state.sortBy);
  const setSortBy = useProductStore((state) => state.setSortBy);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700"> Sort by: </h2>

      <ul className="flex items-center flex-wrap gap-x-6 gap-y-2">
        {sortOptions.map((sort, idx) => {
          return (
            <li key={idx}>
              <button
                className={`text-sm font-medium border-2 border-border px-2 py-1 rounded-md hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary ${sortBy === sort ? "text-primary border-primary" : "text-gray-700"}`}
                onClick={() => setSortBy(sort)}
              >
                {sort}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SortFilterMobile;
