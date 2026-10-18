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
                className={`text-sm font-medium hover:text-primary ${stockStatus === status ? "text-primary" : "text-gray-700"}`}
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
