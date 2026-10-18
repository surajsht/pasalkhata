import useProductStore from "../../../store/useProductStore";

const stockStatusOptions: string[] = [
  "All stock",
  "In stock",
  "Low stock",
  "Out of stock",
];

const StockStatusFilterMobile = () => {
  const stockStatus = useProductStore((state) => state.stockStatus);
  const setStockStatus = useProductStore((state) => state.setStockStatus);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700"> Stock status: </h2>

      <ul className="flex items-center flex-wrap gap-x-6 gap-y-2">
        {stockStatusOptions.map((status, idx) => {
          return (
            <li key={idx}>
              <button
                className={`text-sm font-medium border-2 border-border px-2 py-1 rounded-md hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary ${stockStatus === status ? "text-primary border-primary" : "text-gray-700"}`}
                onClick={() => setStockStatus(status)}
              >
                {status}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StockStatusFilterMobile;
