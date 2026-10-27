import type { ProductDataType } from "../../TempData";
import { BsThreeDots } from "react-icons/bs";
import dateFormatter from "../../helper/dateFormatter";

type ProductItemType = {
  product: Partial<ProductDataType>;
};

const ProductItem = ({ product }: ProductItemType) => {
  const productStock = product.stock;
  const threshold = product.low_stock_threshold ?? 0;
  let stockStatus = {
    status: "",
    color: "",
  };

  if (productStock === undefined) {
    stockStatus = {
      status: "Unknown",
      color: "bg-danger",
    };
  } else if (productStock === 0) {
    stockStatus = {
      status: "Out Of Stock",
      color: "bg-danger",
    };
  } else if (productStock <= threshold) {
    stockStatus = {
      status: "Low Stock",
      color: "bg-warning",
    };
  } else {
    stockStatus = {
      status: "In Stock",
      color: "bg-success",
    };
  }

  const formattedDate = dateFormatter(product.updated_at);

  return (
    <tr className="p-2">
      <td className="w-full p-3 text-left text-sm flex items-center gap-3">
        <img
          src={product.image_url}
          alt="product image"
          loading="lazy"
          className="h-12 w-12 object-cover bg-gray-300"
        />
        <span className="font-semibold"> {product.name} </span>
      </td>
      <td className="w-[12%] p-3 text-left text-sm"> {product.sku} </td>
      <td className="w-[12%] p-3 text-left text-sm"> {product.category} </td>
      <td className="w-[10%] p-3 text-left text-sm"> Rs.{product.price} </td>
      <td className="w-[8%] p-3 text-left text-sm"> {product.stock} unit </td>
      <td className="w-[11%] p-3 text-left text-sm">
        <span
          className={`${stockStatus.color} text-white px-2 py-1 rounded-md`}
        >
          {stockStatus.status}
        </span>
      </td>
      <td className="w-[12%] p-3 text-left text-sm"> {formattedDate} </td>
      <td className="w-[10%] p-3 text-left text-sm">
        <button>
          <BsThreeDots />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
