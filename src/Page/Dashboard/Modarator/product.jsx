import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const Product = () => {
  const axiosSecure = UseAxiosSecure();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/product");
        const sortedProducts = response.data.sort((a, b) => {
          const statusOrder = ["pending", "accepted", "rejected"];
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  const handleViewDetails = (productId) => {
    navigate(`/ProductPage/${productId}`);
  };

  const handleMakeFeatured = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to mark this product as featured!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make it featured!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.patch(`/product/${productId}/feature`);
        if (response.data.message === "Product marked as featured") {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId ? { ...product, isFeatured: true } : product
            )
          );
          Swal.fire("Success", "The product has been marked as featured.", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to mark product as featured.", "error");
      }
    }
  };

  const handleAccept = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.patch(`/product/${productId}/accept`);
        if (response.data.message === "Product accepted") {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId ? { ...product, status: "accepted" } : product
            )
          );
          Swal.fire("Success", "The product has been accepted.", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to accept the product.", "error");
      }
    }
  };

  const handleReject = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.patch(`/product/${productId}/reject`);
        if (response.data.message === "Product rejected") {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId ? { ...product, status: "rejected" } : product
            )
          );
          Swal.fire("Success", "The product has been rejected.", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to reject the product.", "error");
      }
    }
  };

  return (
    <section className="p-6">
        <h1 className="text-4xl font-bold text-center  mb-8">Product <span className='text-[#006dc7]'>Review</span></h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  className="btn  bg-[#006dc7] text-white font-semibold"
                  onClick={() => handleViewDetails(product._id)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-primary"
                  disabled={product.isFeatured}
                  onClick={() => handleMakeFeatured(product._id)}
                >
                  {product.isFeatured ? "Featured" : "Make Featured"}
                </button>
                <button
                  className="btn btn-success"
                  disabled={product.status === "accepted"}
                  onClick={() => handleAccept(product._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  disabled={product.status === "rejected"}
                  onClick={() => handleReject(product._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Product;
