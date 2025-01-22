import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-300 bg-white rounded-lg shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Product Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Number of Votes
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Status
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {product.votes || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {product.status || "Pending"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center flex justify-center gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                      onClick={() => handleUpdate(product._id)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProductsPage;
