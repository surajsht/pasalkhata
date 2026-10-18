import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import CategoryFilter from "./CategoryFilter";
import FilterPopup from "./FilterPopup";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";
import StockStatusFilter from "./StockStatusFilter";
import { FaFilter } from "react-icons/fa";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";

const FilterContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isError } = useProducts();

  useBodyScrollLock({ isOpen: isModalOpen, setIsModalOpen });

  return (
    !isError && (
      <div className="relative bg-white p-4 rounded-lg border-2 border-border mb-6 flex items-center justify-between gap-4">
        <SearchFilter />

        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
          <CategoryFilter />
          <StockStatusFilter />
          <SortFilter />
        </div>

        <button
          className="bg-primary hover:bg-primaryHover text-white py-3 px-3 text-md rounded-md lg:hidden"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <FaFilter />
        </button>

        <FilterPopup
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    )
  );
};

export default FilterContainer;
