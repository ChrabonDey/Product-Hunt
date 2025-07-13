import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { motion } from "framer-motion";
import { FaStar, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Product = () => {
  const axiosSecure = UseAxiosSecure();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/product");
        const sorted = response.data.sort((a, b) => {
          const order = ["pending", "accepted", "rejected"];
          return order.indexOf(a.status) - order.indexOf(b.status);
        });
        setProducts(sorted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  const handleViewDetails = (id) => navigate(`/ProductPage/${id}`);

  const updateProduct = async (url, id, updateState, successMsg, failMsg) => {
    try {
      const res = await axiosSecure.patch(url);
      if (res.data.message) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, ...updateState } : p))
        );
        Swal.fire("Success", successMsg, "success");
      }
    } catch {
      Swal.fire("Error", failMsg, "error");
    }
  };

  const confirmAction = (title, text, action) =>
    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((res) => res.isConfirmed && action());

  const chartData = ["pending", "accepted", "rejected"].map((status) => ({
    status,
    count: products.filter((p) => p.status === status).length,
  }));

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black p-4 text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Product <span className="text-[#00b4d8]">Review</span>
      </h1>

      <div className="w-full max-w-3xl mx-auto mb-8">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" stroke="#fff" />
            <YAxis stroke="#fff" allowDecimals={false} />
            <Tooltip wrapperClassName="text-black" />
            <Bar dataKey="count" fill="#00b4d8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
        <table className="hidden md:table w-full text-sm">
          <thead className="bg-[#111] text-[#00f2ff] uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">Product Name</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {products.map((product) => (
              <motion.tr
                key={product._id}
                whileHover={{ scale: 1.01 }}
                className="transition border-t border-white/10 hover:bg-[#1b1b1b]"
              >
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === "accepted"
                        ? "bg-green-600 text-white"
                        : product.status === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {product.status}
                  </span>
                  {product.isFeatured && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-600 rounded-full text-white flex items-center gap-1 inline-flex">
                      <FaStar className="text-yellow-400" /> Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="inline-flex items-center gap-1 bg-[#00b4d8] hover:bg-[#008bb0] px-3 py-2 rounded-md text-xs font-semibold"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() =>
                      confirmAction("Make Featured?", "Confirm to feature this product.", () =>
                        updateProduct(
                          `/product/${product._id}/feature`,
                          product._id,
                          { isFeatured: true },
                          "Product marked as featured.",
                          "Failed to feature product."
                        )
                      )
                    }
                    disabled={product.isFeatured}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold ${
                      product.isFeatured
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    <FaStar /> {product.isFeatured ? "Featured" : "Make Featured"}
                  </button>
                  <button
                    onClick={() =>
                      confirmAction("Accept Product?", "Confirm to accept this product.", () =>
                        updateProduct(
                          `/product/${product._id}/accept`,
                          product._id,
                          { status: "accepted" },
                          "Product accepted.",
                          "Failed to accept product."
                        )
                      )
                    }
                    disabled={product.status === "accepted"}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold ${
                      product.status === "accepted"
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    onClick={() =>
                      confirmAction("Reject Product?", "Confirm to reject this product.", () =>
                        updateProduct(
                          `/product/${product._id}/reject`,
                          product._id,
                          { status: "rejected" },
                          "Product rejected.",
                          "Failed to reject product."
                        )
                      )
                    }
                    disabled={product.status === "rejected"}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold ${
                      product.status === "rejected"
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    <FaTimes /> Reject
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Table */}
        <div className="md:hidden flex flex-col gap-4 p-2">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white/10 border border-white/10 rounded-lg p-4"
            >
              <div className="text-lg font-bold mb-2">{product.name}</div>
              <div className="mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === "accepted"
                      ? "bg-green-600 text-white"
                      : product.status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {product.status}
                </span>
                {product.isFeatured && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-600 rounded-full text-white inline-flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> Featured
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleViewDetails(product._id)}
                  className="bg-[#00b4d8] hover:bg-[#008bb0] px-3 py-1 rounded-md text-xs font-semibold"
                >
                  <FaEye className="inline" /> View
                </button>
                <button
                  onClick={() =>
                    confirmAction("Make Featured?", "Confirm to feature this product.", () =>
                      updateProduct(
                        `/product/${product._id}/feature`,
                        product._id,
                        { isFeatured: true },
                        "Product marked as featured.",
                        "Failed to feature product."
                      )
                    )
                  }
                  disabled={product.isFeatured}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    product.isFeatured
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  <FaStar className="inline" /> {product.isFeatured ? "Featured" : "Feature"}
                </button>
                <button
                  onClick={() =>
                    confirmAction("Accept Product?", "Confirm to accept this product.", () =>
                      updateProduct(
                        `/product/${product._id}/accept`,
                        product._id,
                        { status: "accepted" },
                        "Product accepted.",
                        "Failed to accept product."
                      )
                    )
                  }
                  disabled={product.status === "accepted"}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    product.status === "accepted"
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <FaCheck className="inline" /> Accept
                </button>
                <button
                  onClick={() =>
                    confirmAction("Reject Product?", "Confirm to reject this product.", () =>
                      updateProduct(
                        `/product/${product._id}/reject`,
                        product._id,
                        { status: "rejected" },
                        "Product rejected.",
                        "Failed to reject product."
                      )
                    )
                  }
                  disabled={product.status === "rejected"}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    product.status === "rejected"
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  <FaTimes className="inline" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
