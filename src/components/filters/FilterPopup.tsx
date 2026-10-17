import CategoryFilterMobile from "./filterMobile/CategoryFilterMobile";

type FilterPopupProp = {
  isModalOpen: boolean;
};

const FilterPopup = ({ isModalOpen }: FilterPopupProp) => {
  return (
    <div
      className={`${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"} fixed inset-0 h-screen w-screen bg-[rgba(0,0,0,.8)] z-20 transition-opacity duration-300 ease-in-out py-8 lg:hidden`}
    >
      <div className="container">
        <div className="bg-white p-6 space-y-6 rounded-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Filter Products:
          </h2>

          <CategoryFilterMobile />
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
