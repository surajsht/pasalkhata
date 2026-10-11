import type { ProductDataType } from "../../TempData";
import { BsThreeDots } from "react-icons/bs";

type ProductItemType = {
  product: Partial<ProductDataType>;
};

const ProductItem = ({ product }: ProductItemType) => {
  const productStock = product.stock;
  const threshold = product.low_stock_threshold ?? 0;
  let stockStatus = "";

  if (productStock === undefined) {
    stockStatus = "Unknown";
  } else if (productStock === 0) {
    stockStatus = "Out Of Stock";
  } else if (productStock <= threshold) {
    stockStatus = "Low Stock";
  } else {
    stockStatus = "In Stock";
  }

  return (
    <tr className="flex items-center justify-between p-2 border-b-2 last:border-b-2">
      <td className="flex items-center gap-3 w-[25%] text-sm">
        <img
          src={product.image_url}
          alt="product image"
          loading="lazy"
          className="h-12 w-12 object-cover bg-gray-300"
        />
        <span className="font-semibold"> {product.name} </span>
      </td>
      <td className="flex-1 text-center text-sm"> {product.sku} </td>
      <td className="flex-1 text-center text-sm"> {product.category} </td>
      <td className="flex-1 text-center text-sm"> Rs.{product.price} </td>
      <td className="flex-1 text-center text-sm"> {product.stock} unit </td>
      <td className="flex-1 text-center text-sm">{stockStatus}</td>
      <td className="flex-1 text-center text-sm"> {product.updated_at} </td>
      <td className="flex-1 text-center text-sm">
        <button>
          <BsThreeDots />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
