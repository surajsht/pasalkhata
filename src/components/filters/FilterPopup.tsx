import CategoryFilterMobile from "./filterMobile/CategoryFilterMobile";
import SortFilterMobile from "./filterMobile/SortFilterMobile";
import StockStatusFilterMobile from "./filterMobile/StockStatusFilterMobile";
import { IoCloseSharp } from "react-icons/io5";

type FilterPopupProp = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterPopup = ({ isModalOpen, setIsModalOpen }: FilterPopupProp) => {
  return (
    <div
      className={`${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"} fixed inset-0 h-screen w-screen bg-[rgba(0,0,0,.8)] z-20 transition-opacity duration-300 ease-in-out flex items-center justify-center lg:hidden`}
    >
      <div className="container h-[440px]">
        <div className="bg-white p-6 space-y-6 h-full overflow-auto rounded-md">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Filter Products:
            </h2>

            <button
              className="text-xl bg-primary text-white p-1 rounded-md hover:bg-primaryHover"
              onClick={() => setIsModalOpen(false)}
            >
              <IoCloseSharp />
            </button>
          </div>

          <CategoryFilterMobile />
          <StockStatusFilterMobile />
          <SortFilterMobile />
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
