import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
    if (editingCoupon) {
      
      try {
        const response = await axiosSecure.put(`/coupons/${editingCoupon._id}`, form);
        if (response.data) {
          setCoupons((prev) => prev.map((coupon) => coupon._id === editingCoupon._id ? response.data : coupon));
          Swal.fire("Success", "Coupon updated successfully!", "success");
          setEditingCoupon(null);
          setForm({ code: "", expiryDate: "", description: "", discount: "" });
        }
      } catch (error) {
        Swal.fire("Error", "Failed to update coupon.", "error");
      }
    } else {
      // Adding new coupon
      try {
        const response = await axiosSecure.post("/coupons", form);
        if (response.data) {
          setCoupons((prev) => [...prev, response.data]);
          Swal.fire("Success", "Coupon added successfully!", "success");
          setForm({ code: "", expiryDate: "", description: "", discount: "" });
        }
      } catch (error) {
        Swal.fire("Error", "Failed to add coupon.", "error");
      }
    }
  };

  
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This coupon will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
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
    <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center  mb-8">Manage <span className='text-[#006dc7]'>Coupons</span></h1>
      <form className="mb-6 bg-white p-4 shadow rounded" onSubmit={handleAddCoupon}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleInputChange}
            placeholder="Coupon Code"
            className="input input-bordered"
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleInputChange}
            className="input input-bordered"
            required
          />
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleInputChange}
            placeholder="Discount Amount (%)"
            className="input input-bordered"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Coupon Description"
            className="textarea textarea-bordered"
            required
          />
        </div>
        <button type="submit" className="btn  bg-[#006dc7] text-white font-semibold mt-4">
          {editingCoupon ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon._id} className="card bg-white shadow p-4 rounded">
              <h3 className="text-lg font-semibold">{coupon.code}</h3>
              <p>Discount: {coupon.discount}%</p>
              <p>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
              <p>{coupon.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(coupon)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(coupon._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCouponsPage;
