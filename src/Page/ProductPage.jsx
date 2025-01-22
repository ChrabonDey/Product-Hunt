import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import UseAuth from '../Hooks/UseAuth';
import { FaAnglesUp } from 'react-icons/fa6';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewDescription, setReviewDescription] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosPublic.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get(`/reviews?productId=${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleUpvote = async () => {
    if (!user?.email) {
      navigate('/login');
      return;
    }

    if (user.email === product.ownerEmail) {
      alert('You cannot upvote your own product.');
      return;
    }

    try {
      const response = await axiosPublic.patch(`/product/${id}/upvote`, {
        email: user.email,
      });

      if (response.status === 200) {
        setProduct((prev) => ({ ...prev, votes: prev.votes + 1 }));
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleReport = async () => {
    if (!user?.email) {
      navigate('/login');
      return;
    }

    try {
      const response = await axiosPublic.post(`/product/${id}/report`, {
        email: user.email,
      });

      if (response.status === 200) {
        alert('Product reported successfully.');
        setProduct((prev) => ({ ...prev, isReported: true }));
      }
    } catch (error) {
      console.error('Error reporting product:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post a review.');
      return;
    }

    const reviewData = {
      productId: id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      description: reviewDescription,
      rating,
    };

    try {
      const response = await axiosPublic.post('/reviews', reviewData);

      if (response.status === 201) {
        alert('Review submitted successfully.');
        setReviews((prev) => [...prev, reviewData]);
        setReviewDescription('');
        setRating('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="product-page max-w-7xl mx-auto px-4 py-8">
      {/* Product Details Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-10">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={product.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mb-4 block"
          >
            Visit Product
          </a>
          <div className="flex items-center gap-4">
            <button
              className="btn bg-[#006dc7] text-white font-semibold flex items-center"
              onClick={handleUpvote}
              disabled={user?.email === product.ownerEmail}
            >
              <FaAnglesUp/>
               {product.votes} Votes
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleReport}
            >
              Report
            </button>
          </div>
        </div>
      </div>


      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{review.reviewerName}</h3>
                    <div className="text-yellow-500 text-sm">Rating: {review.rating} / 5</div>
                  </div>
                </div>
                <p className="text-gray-700">{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Review Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Post a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Reviewer Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Reviewer Image</label>
            <input
              type="text"
              value={user?.photoURL || ''}
              readOnly
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Review Description</label>
            <textarea
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              className="w-full mt-2 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full mt-2 p-2 border rounded"
              min="0"
              max="5"
              required
            />
          </div>
          <button type="submit" className="btn bg-[#006dc7] text-white font-semibold w-full">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
