import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { WithContext as ReactTags } from "react-tag-input";
import { useNavigate } from "react-router-dom";
import "../../AddProductPage.css";
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
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
        });
        navigate("/my-products");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">Add a New Product</h2>
      {subscriptionStatus?.subscribed === false && (
        <p>You can only add one product since you are not subscribed.</p>
      )}
      <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
       
        <div className="form-group">
          <label>Category *</label>
          <input
            {...register("category", { required: true })}
            placeholder="Enter category"
            className="form-input"
          />
          {errors.category && (
            <span className="error-text">Category is required</span>
          )}
        </div>

     
        <div className="form-group">
          <label>Product Name *</label>
          <input
            {...register("name", { required: true })}
            placeholder="Enter product name"
            className="form-input"
          />
          {errors.name && (
            <span className="error-text">Product Name is required</span>
          )}
        </div>

      
        <div className="form-group">
          <label>Product Image URL *</label>
          <input
            {...register("image", { required: true })}
            placeholder="Enter product image URL"
            className="form-input"
          />
          {errors.image && (
            <span className="error-text">Product Image URL is required</span>
          )}
        </div>

        
        <div className="form-group">
          <label>Description *</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter product description"
            className="form-textarea"
          />
          {errors.description && (
            <span className="error-text">Description is required</span>
          )}
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            delimiters={delimiters}
            placeholder="Add new tag"
          />
        </div>

        {/* External Link */}
        <div className="form-group">
          <label>External Link</label>
          <input
            {...register("external_Link")}
            placeholder="Enter external or landing page link"
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
