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
    <tr key={product.id}>
      <td> {product.name} </td>
      <td> {product.sku} </td>
      <td> {product.category} </td>
      <td> ${product.price} </td>
      <td> {product.stock} </td>
      <td>{stockStatus}</td>
      <td> {product.updated_at} </td>
      <td>
        <button>
          <BsThreeDots />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
