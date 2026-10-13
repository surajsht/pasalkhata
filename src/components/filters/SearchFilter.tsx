import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useProducts from "../../hooks/useProducts";

const SearchFilter = () => {
  const [userQuery, setUserQuery] = useState<string>("");

  const { isLoading } = useProducts();

  if (isLoading)
    return <div className="h-8 flex-1 bg-gray-300 animate-pulse"></div>;

  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="text-gray-700 text-sm border-2 border-border py-2 pl-10 pr-2 rounded-md w-full focus:outline-none hover:border-primary focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
        placeholder="Search products by name..."
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
      />
      <IoSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchFilter;
