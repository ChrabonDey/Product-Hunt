import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

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

  // Handle view details
  const handleViewDetails = (productId) => {
    navigate(`/ProductPage/${productId}`);
  };

  // Handle delete product
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
            // Remove the deleted product from the UI
            setReportedProducts((prevProducts) =>
              prevProducts.filter((product) => product._id !== productId)
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
    <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center  mb-8">Reported <span className='text-[#006dc7]'>Products</span></h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b border-gray-300">Product Name</th>
              <th className="py-3 px-6 text-center border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {reportedProducts.length > 0 ? (
              reportedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-left border-b border-gray-300">
                    {product.name}
                  </td>
                  <td className="py-3 px-6 text-center border-b border-gray-300 space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-200"
                      onClick={() => handleViewDetails(product._id)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-200"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="py-6 text-center text-gray-500 text-lg font-semibold"
                >
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
