import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { motion } from "framer-motion";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const ReportedContent = () => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const [reportedProducts, setReportedProducts] = useState([]);

  useEffect(() => {
    const fetchReportedProducts = async () => {
      try {
        const response = await axiosSecure.get("/product/reported");
        setReportedProducts(response.data);
      } catch (error) {
        console.error("Error fetching reported products:", error);
      }
    };
    fetchReportedProducts();
  }, [axiosSecure]);

  const handleViewDetails = (productId) => {
    navigate(`/ProductPage/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, this product will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/product/${productId}`);
          if (response.status === 200) {
            setReportedProducts((prev) =>
              prev.filter((product) => product._id !== productId)
            );
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an issue deleting the product.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-6  text-white">
      <h1 className="text-4xl font-bold text-center mb-10">
        Reported <span className="text-[#00b4d8]">Products</span>
      </h1>

      <div className="overflow-x-auto bg-[#1a1a1a]/60 backdrop-blur-md border border-[#2c2c2c] rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.05)]">
        <table className="w-full table-auto text-sm">
          <thead className="bg-[#111] border-b border-[#2c2c2c]">
            <tr className="uppercase text-[#00f2ff] tracking-wider text-left">
              <th className="py-4 px-6">Product Name</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.length > 0 ? (
              reportedProducts.map((product) => (
                <motion.tr
                  key={product._id}
                  whileHover={{ scale: 1.02 }}
                  className="border-b border-[#2c2c2c] hover:bg-[#222]"
                >
                  <td className="py-4 px-6 text-white font-medium">{product.name}</td>
                  <td className="py-4 px-6 text-center space-x-4">
                    <button
                      onClick={() => handleViewDetails(product._id)}
                      className="inline-flex items-center gap-1 bg-[#00b4d8] hover:bg-[#009dc2] text-white px-3 py-2 rounded-md text-xs font-semibold transition"
                    >
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-xs font-semibold transition"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-10 text-gray-400 text-lg">
                  No reported products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContent;
