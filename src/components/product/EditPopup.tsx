import { useState, useEffect, type ChangeEvent, type RefObject } from "react";
import useSingleProduct from "../../hooks/useSingleProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import useProductStore from "../../store/useProductStore";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import ConfirmPopup from "../ConfirmPopup";

type EditPopupProp = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: RefObject<HTMLDivElement | null>;
};

const EditPopup = ({ isOpen, setIsOpen, modalRef }: EditPopupProp) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const editId = useProductStore((state) => state.editId);
  const setEditId = useProductStore((state) => state.setEditId);
  const { data, isLoading, isError, error } = useSingleProduct(editId);
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  useBodyScrollLock({ isOpen, setIsModalOpen: setIsOpen });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    sku: "",
    description: "",
    updated_at: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        price: data.price || "",
        category: data.category || "",
        brand: data.brand || "",
        sku: data.sku || "",
        description: data.description || "",
        updated_at: data.updated_at || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isOpen) {
      setEditId(null);
      setImagePreview(null);
      setShowConfirm(false);
    }
  }, [isOpen, setEditId]);

  if (!isOpen) return null;
  if (isLoading) return <div> Loading... </div>;
  if (isError) return <h2> Error: {error.message} </h2>;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      updated_at: new Date().toISOString(),
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleDelete = () => {
    if (!editId) return;

    deleteProduct(editId, {
      onSuccess: () => {
        setShowConfirm(false);
        setIsOpen(false);
      },
    });
  };

  const handleSave = () => {
    if (!editId) return;

    updateProduct(
      {
        id: editId,
        updatedData: formData,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
        <div
          className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
          ref={modalRef}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
            onClick={() => {
              setIsOpen(false);
              setEditId(null);
            }}
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Edit Product
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex flex-col items-center gap-3">
              <div className="w-full h-48 rounded-lg bg-gray-100 flex items-center justify-center border border-border overflow-hidden">
                <img
                  src={imagePreview || data?.image_url}
                  alt="Product Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Select Image from Device
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full px-3 py-1.5 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="$0.00"
                    className="w-full px-3 py-1.5 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Electronics"
                    className="w-full px-3 py-1.5 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Mi"
                    className="w-full px-3 py-1.5 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Product Code
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="SKU"
                    className="w-full px-3 py-1.5 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write product description..."
                  className="w-full px-3 py-1.5 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex justify-end gap-3">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-danger hover:bg-red-700 rounded"
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting}
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primaryHover rounded disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>

          <ConfirmPopup
            isOpen={showConfirm}
            title="Delete product?"
            message="This action cannot be undone."
            confirmText="Delete"
            isLoading={isDeleting}
            onConfirm={handleDelete}
            onCancel={(e) => {
              e.stopPropagation();
              setShowConfirm(false);
            }}
          />
        </div>
      </div>
    )
  );
};

export default EditPopup;
