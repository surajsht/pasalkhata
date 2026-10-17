import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";
import useProducts from "../../hooks/useProducts";
import SwitchFilterLoader from "../skeleton-loader/SwitchFilterLoader";
import useProductStore from "../../store/useProductStore";

const stockStatusOptions: string[] = [
  "All stock",
  "In stock",
  "Low stock",
  "Out of stock",
];

const StockStatusFilter = () => {
  const stockStatus = useProductStore((state) => state.stockStatus);
  const setStockStatus = useProductStore((state) => state.setStockStatus);

  const { ref, isOpen, setIsOpen } = useOutsideClick();
  const { isLoading } = useProducts();

  const handleOptionSelect = (value: string) => {
    setStockStatus(value);
    setIsOpen(false);
  };

  if (isLoading) return <SwitchFilterLoader />;

  return (
    <div className="relative w-48" ref={ref}>
      <button
        className="flex items-center justify-between gap-3 text-sm border-2 border-border px-4 py-2 text-gray-700 rounded-md hover:border-primary focus:outline-none focus:ring-1 focus:ring-primaryHover transition-colors w-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-gray-700"> {stockStatus} </span>

        <MdOutlineKeyboardArrowDown className={`text-2xl text-gray-400`} />
      </button>

      <ul
        className={`absolute left-0 right-0 top-full bg-white border-2 border-border rounded-md z-10 space-y-2 text-gray-700 ${isOpen ? "opacity-1 visible mt-2" : "opacity-0 invisible mt-0"} transition-all duration-300 ease-in-out shadow-md`}
      >
        {stockStatusOptions.map((status, idx) => {
          return (
            <li
              key={idx}
              className={`hover:bg-primaryHover hover:text-white py-2 px-3 cursor-pointer ${stockStatus === status ? "bg-primary text-white" : "bg-transparent"}`}
              onClick={() => handleOptionSelect(status)}
            >
              {status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StockStatusFilter;
