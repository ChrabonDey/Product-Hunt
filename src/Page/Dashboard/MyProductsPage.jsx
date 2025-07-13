import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaBoxOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const MyProductsPage = () => {
  const { user, loading } = UseAuth();
  const [products, setProducts] = useState([]);
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get(`/product?email=${user?.email}`);
        setProducts(response.data);
      } catch (error) {
        Swal.fire("Error", "Failed to load products.", "error");
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [user, axiosPublic]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.delete(`/product/${id}`);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        setProducts((prev) => prev.filter((product) => product._id !== id));
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-product/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#101820] to-black p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          <FaBoxOpen className="inline-block mr-2 text-[#00b4d8]" />
          My <span className="text-[#00b4d8]">Products</span>
        </h2>

        <div className="overflow-x-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg">
         <table className="min-w-full text-sm table-fixed">
  <thead className="bg-[#1c1c1c] text-[#00f2ff] uppercase">
    <tr>
      <th className="w-1/3 px-4 py-3 text-center">Product</th>
      <th className="w-1/6 px-4 py-3 text-center">Votes</th>
      <th className="w-1/6 px-4 py-3 text-center">Status</th>
      <th className="w-1/3 px-4 py-3 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.length > 0 ? (
      products.map((product) => (
        <tr
          key={product._id}
          className="border-t border-white/10 hover:bg-white/5 transition"
        >
          {/* Centered content with flex */}
          <td className="px-4 py-3 text-center font-medium">{product.name}</td>
          <td className="px-4 py-3 text-center">{product.votes || 0}</td>
          <td className="px-4 py-3 text-center capitalize">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                product.status === "accepted"
                  ? "bg-green-600 text-white"
                  : product.status === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {product.status || "pending"}
            </span>
          </td>
          <td className="px-4 py-3 text-center">
            <div className="flex justify-center gap-2">
              <button
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs"
                onClick={() => handleUpdate(product._id)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                onClick={() => handleDelete(product._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan="4"
          className="text-center py-6 text-gray-400 font-semibold"
        >
          No products found.
        </td>
      </tr>
    )}
  </tbody>
</table>

        </div>
      </div>
    </section>
  );
};

export default MyProductsPage;