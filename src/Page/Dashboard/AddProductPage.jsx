import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { WithContext as ReactTags } from "react-tag-input";
import { useNavigate } from "react-router-dom";
import { FaTag, FaLink, FaBoxes, FaRegImage, FaRegFileAlt, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const AddProductPage = () => {
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await axiosPublic.get(`/subscriptions/${user?.email}`);
        setSubscriptionStatus(response.data);
      } catch (error) {
        setSubscriptionStatus({ subscribed: false });
      }
    };

    if (user?.email) {
      checkSubscriptionStatus();
    }
  }, [user, axiosPublic]);

  const keyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [keyCodes.comma, keyCodes.enter];

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      Name: user?.name,
      Image: user?.photoURL,
      Email: user?.email,
      tags: tags.map((tag) => tag.text),
      timestamp: new Date(),
    };

    try {
      const response = await axiosPublic.post("/product", productData);
      if (response.status === 200) {
        Swal.fire({ icon: "success", title: "Product added successfully!" });
        navigate("/my-products");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Add a New Product</h2>

        {subscriptionStatus?.subscribed === false && (
          <p className="text-red-400 text-sm text-center mb-4">
            You can only add one product since you are not subscribed.
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1"><FaBoxes /> Category *</label>
            <input
              {...register("category", { required: true })}
              placeholder="Enter category"
              className="bg-white/10 border border-white/20 px-4 py-2 rounded focus:outline-none"
            />
            {errors.category && <span className="text-red-400 text-sm">Category is required</span>}
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1"><FaRegFileAlt /> Product Name *</label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter product name"
              className="bg-white/10 border border-white/20 px-4 py-2 rounded focus:outline-none"
            />
            {errors.name && <span className="text-red-400 text-sm">Product Name is required</span>}
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1"><FaRegImage /> Product Image URL *</label>
            <input
              {...register("image", { required: true })}
              placeholder="Enter image URL"
              className="bg-white/10 border border-white/20 px-4 py-2 rounded focus:outline-none"
            />
            {errors.image && <span className="text-red-400 text-sm">Image URL is required</span>}
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1"><FaRegFileAlt /> Description *</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Enter description"
              className="bg-white/10 border border-white/20 px-4 py-2 rounded focus:outline-none"
            ></textarea>
            {errors.description && <span className="text-red-400 text-sm">Description is required</span>}
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1"><FaTag /> Tags</label>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              delimiters={delimiters}
              placeholder="Add new tag"
              classNames={{
                tagInputField: "bg-white/10 border border-white/20 px-4 py-2 rounded text-white",
                tag: "bg-cyan-500 px-2 py-1 rounded mr-2",
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1"><FaLink /> External Link</label>
            <input
              {...register("external_Link")}
              placeholder="Enter external link"
              className="bg-white/10 border border-white/20 px-4 py-2 rounded focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-[#00b4d8] hover:bg-[#009bb0] text-white font-semibold py-2 rounded shadow-md inline-flex items-center justify-center gap-2">
            <FaUpload /> Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
