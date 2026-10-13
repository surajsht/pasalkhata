import CategoryFilter from "./CategoryFilter";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";
import StockStatusFilter from "./StockStatusFilter";

const FilterContainer = () => {
  return (
    <div className="bg-white p-4 rounded-lg border-2 border-border mb-6 flex items-center justify-between gap-4">
      <SearchFilter />

      <div className="flex items-center justify-between gap-4">
        <CategoryFilter />
        <StockStatusFilter />
        <SortFilter />
      </div>
    </div>
  );
};

export default FilterContainer;
