import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaTicketAlt } from "react-icons/fa";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discount: "",
  });
  const [editingCoupon, setEditingCoupon] = useState(null);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosSecure.get("/coupons");
        if (response.data) {
          setCoupons(response.data);
        }
      } catch (error) {
        Swal.fire("Error", "Failed to load coupons.", "error");
      }
    };
    fetchCoupons();
  }, [axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        const response = await axiosSecure.put(`/coupons/${editingCoupon._id}`, form);
        if (response.data) {
          setCoupons((prev) =>
            prev.map((coupon) =>
              coupon._id === editingCoupon._id ? response.data : coupon
            )
          );
          Swal.fire("Updated!", "Coupon updated successfully!", "success");
        }
      } else {
        const response = await axiosSecure.post("/coupons", form);
        if (response.data) {
          setCoupons((prev) => [...prev, response.data]);
          Swal.fire("Created!", "Coupon added successfully!", "success");
        }
      }
      setForm({ code: "", expiryDate: "", description: "", discount: "" });
      setEditingCoupon(null);
    } catch (error) {
      Swal.fire("Error", "Operation failed.", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This coupon will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/coupons/${id}`);
        setCoupons((prev) => prev.filter((coupon) => coupon._id !== id));
        Swal.fire("Deleted!", "Coupon deleted successfully.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete coupon.", "error");
      }
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      expiryDate: coupon.expiryDate.split("T")[0],
      description: coupon.description,
      discount: coupon.discount,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8 text-white rounded-xl">
      <h1 className="text-4xl font-bold text-center mb-10">
        <span className="text-[#00d9ff]">🎟️ Manage Coupons</span>
      </h1>

      <motion.form
        onSubmit={handleAddCoupon}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl mb-10 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleInputChange}
            placeholder="Coupon Code"
            className="bg-white/10 text-white placeholder:text-gray-400 p-3 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleInputChange}
            className="bg-white/10 text-white p-3 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleInputChange}
            placeholder="Discount (%)"
            className="bg-white/10 text-white placeholder:text-gray-400 p-3 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Coupon Description"
            className="bg-white/10 text-white placeholder:text-gray-400 p-3 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-full transition"
        >
          {editingCoupon ? "Update Coupon" : "Add Coupon"}
        </button>
      </motion.form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.length === 0 ? (
          <p className="text-center col-span-2 text-gray-300">No coupons available.</p>
        ) : (
          coupons.map((coupon) => (
            <motion.div
              key={coupon._id}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaTicketAlt className="text-yellow-400 text-xl" />
                <h3 className="text-lg font-semibold text-white">{coupon.code}</h3>
              </div>
              <p className="text-gray-300">Discount: {coupon.discount}%</p>
              <p className="text-gray-300">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
              <p className="text-gray-400 mt-1">{coupon.description}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(coupon)}
                  className="px-4 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCouponsPage;
