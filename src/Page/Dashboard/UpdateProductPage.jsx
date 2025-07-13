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
    image: "",
    external_Link: "",
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
      await axiosPublic.patch(`/product/${id}`, updatedProduct);
      Swal.fire("Success", "Product updated successfully", "success");
      navigate("/dashboard/myProducts");
    } catch (error) {
      Swal.fire("Error", "Failed to update the product.", "error");
    }
  };

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-black via-[#101820] to-black">
        Loading...
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#101820] to-black p-6 flex justify-center items-start">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl w-full max-w-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#00b4d8]">
          Update <span className="text-white">Product</span>
        </h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={updatedProduct.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded-md border border-white/30 bg-black/40 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={updatedProduct.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              className="w-full rounded-md border border-white/30 bg-black/40 px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
              required
            />
          </div>


          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block mb-2 font-semibold">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={updatedProduct.image || ""}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full rounded-md border border-white/30 bg-black/40 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
            />
          </div>

          {/* External Link */}
          <div>
            <label htmlFor="external_Link" className="block mb-2 font-semibold">
              External Link
            </label>
            <input
              type="text"
              name="external_Link"
              id="external_Link"
              value={updatedProduct.external_Link || ""}
              onChange={handleChange}
              placeholder="Enter external link (optional)"
              className="w-full rounded-md border border-white/30 bg-black/40 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
            />
          </div>


          <button
            type="submit"
            className="w-full py-3 bg-[#00b4d8] rounded-md font-bold text-black hover:bg-[#0099c9] transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProductPage;
