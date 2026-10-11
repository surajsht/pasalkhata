import type { ProductDataType } from "../../TempData";
import { BsThreeDots } from "react-icons/bs";

type ProductItemMobileType = {
  product: Partial<ProductDataType>;
};

const ProductItemMobile = ({ product }: ProductItemMobileType) => {
  const productStock = product.stock;
  const threshold = product.low_stock_threshold ?? 0;
  let stockStatus = {
    "bg-color": "",
    status: "",
  };

  if (productStock === undefined) {
    stockStatus = {
      "bg-color": "bg-danger",
      status: "Unknown",
    };
  } else if (productStock === 0) {
    stockStatus = {
      "bg-color": "bg-danger",
      status: "Out Of Stock",
    };
  } else if (productStock <= threshold) {
    stockStatus = {
      "bg-color": "bg-warning",
      status: "Low Stock",
    };
  } else {
    stockStatus = {
      "bg-color": "bg-success",
      status: "In Stock",
    };
  }

  return (
    <li className="bg-white rounded-xl overflow-hidden">
      <article>
        <div className="relative">
          <img
            src={product.image_url}
            alt="Product Image"
            loading="lazy"
            className="h-60 w-full object-cover bg-gray-300"
          />
          <span
            className={`absolute top-5 right-5 ${stockStatus["bg-color"]} text-white text-sm font-medium px-2 py-1 rounded-lg`}
          >
            {stockStatus.status}
          </span>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-block bg-gray-100 text-gray-500 px-2 py-1 text-xs rounded-md tracking-widest">
              SKU: {product.sku}
            </span>

            <p>
              <button>
                <BsThreeDots />
              </button>
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl text-gray-700">
              {product.name}
            </h2>
            <p className="text-primary"> {product.category} </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-gray-500 text-sm">Price:</p>
              <p className="font-semibold text-xl text-gray-700">
                Rs.{product.price}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm"> Stock Available: </p>
              <p className="text-sm text-gray-700 font-semibold">
                {product.stock} units
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Updated at: {product.updated_at}
          </p>
        </div>
      </article>
    </li>
  );
};

export default ProductItemMobile;
