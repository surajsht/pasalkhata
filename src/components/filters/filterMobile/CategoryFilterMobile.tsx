import useProducts from "../../../hooks/useProducts";

const CategoryFilterMobile = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) return <h3>Loading...</h3>;

  const getCategories =
    data?.map((product) => {
      return product.category;
    }) || [];
  const uniqueCategories = ["All Categories", ...new Set(getCategories)];

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-700"> Categories: </h2>

      <ul>
        {uniqueCategories.map((category, idx) => {
          return (
            <li key={idx}>
              <button>{category}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilterMobile;
