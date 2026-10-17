import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";
import useProducts from "../../hooks/useProducts";
import SwitchFilterLoader from "../skeleton-loader/SwitchFilterLoader";
import useProductStore from "../../store/useProductStore";

const CategoryFilter = () => {
  const categoryOption = useProductStore((state) => state.categoryOption);
  const setCategoryOption = useProductStore((state) => state.setCategoryOption);
  const { isOpen, setIsOpen, ref } = useOutsideClick();

  const { data, isLoading } = useProducts();

  if (isLoading) return <SwitchFilterLoader />;

  const getCategories =
    data?.map((product) => {
      return product.category;
    }) || [];
  const uniqueCategories = ["All Categories", ...new Set(getCategories)];

  const handleOptionSelect = (value: string) => {
    setCategoryOption(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-48" ref={ref}>
      <button
        className="flex items-center justify-between gap-3 text-sm border-2 border-border px-4 py-2 text-gray-700 rounded-md hover:border-primary focus:outline-none focus:ring-1 focus:ring-primaryHover transition-colors w-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-gray-700"> {categoryOption} </span>

        <MdOutlineKeyboardArrowDown className={`text-2xl text-gray-400`} />
      </button>

      <ul
        className={`absolute left-0 right-0 top-full bg-white border-2 border-border rounded-md z-10 space-y-2 text-gray-700 ${isOpen ? "opacity-1 visible mt-2" : "opacity-0 invisible mt-0"} transition-all duration-300 ease-in-out shadow-md`}
      >
        {uniqueCategories.map((category, idx) => {
          return (
            <li
              key={idx}
              className={`hover:bg-primaryHover hover:text-white py-2 px-3 cursor-pointer ${categoryOption === category ? "bg-primary text-white" : "bg-transparent"}`}
              onClick={() => handleOptionSelect(category)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
