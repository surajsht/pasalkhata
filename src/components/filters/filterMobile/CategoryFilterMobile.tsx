import useProducts from "../../../hooks/useProducts";
import useProductStore from "../../../store/useProductStore";

const CategoryFilterMobile = () => {
  const categoryOption = useProductStore((state) => state.categoryOption);
  const setCategoryOption = useProductStore((state) => state.setCategoryOption);

  const { data, isLoading } = useProducts();

  if (isLoading) return <h3>Loading...</h3>;

  const getCategories =
    data?.map((product) => {
      return product.category;
    }) || [];
  const uniqueCategories = ["All Categories", ...new Set(getCategories)];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700"> Categories: </h2>

      <ul className="flex items-center flex-wrap gap-x-6 gap-y-2">
        {uniqueCategories.map((category, idx) => {
          return (
            <li key={idx}>
              <button
                className={`text-sm font-medium hover:text-primary ${categoryOption === category ? "text-primary" : "text-gray-700"}`}
                onClick={() => setCategoryOption(category)}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilterMobile;
