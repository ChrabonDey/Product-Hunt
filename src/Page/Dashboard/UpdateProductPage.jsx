import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const UpdateProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
    status: "pending",
  });
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosPublic.get(`/product/${id}`);
        setProduct(response.data);
        setUpdatedProduct(response.data); 
      } catch (error) {
        Swal.fire("Error", "Failed to load product details.", "error");
      }
    };

    fetchProduct();
  }, [id, axiosPublic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.patch(`/product/${id}`, updatedProduct);
      Swal.fire("Success", "Product updated successfully", "success");
      navigate("/dashboard/myProducts");
    } catch (error) {
      Swal.fire("Error", "Failed to update the product.", "error");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            name="Image"
            value={updatedProduct.image}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            name="Image"
            value={updatedProduct.
                external_Link}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
