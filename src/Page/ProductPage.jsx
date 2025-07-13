import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import UseAuth from '../Hooks/UseAuth';
import { FaFlag, FaExternalLinkAlt, FaThumbsUp } from 'react-icons/fa';
import Swal from 'sweetalert2';

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
    if (!user?.email) return navigate('/login');
    if (user.email === product.ownerEmail) return alert("You can't upvote your own product.");

    try {
      const response = await axiosPublic.patch(`/product/${id}`, {
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
    if (!user?.email) return navigate('/login');

    try {
      const response = await axiosPublic.post(`/product/${id}/report`, {
        email: user.email,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Reported!',
          text: 'Product reported successfully.',
          confirmButtonColor: '#ef4444',
        });
        setProduct((prev) => ({ ...prev, isReported: true }));
      }
    } catch (error) {
      console.error('Error reporting product:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login required',
        text: 'You must be logged in to post a review.',
      });
      return;
    }

    const reviewData = {
      productId: id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      description: reviewDescription,
      rating: parseFloat(rating),
    };

    try {
      const response = await axiosPublic.post('/reviews', reviewData);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Review submitted!',
          text: 'Your review has been posted successfully.',
          confirmButtonColor: '#facc15',
        });

        setReviews((prev) => [...prev, reviewData]);
        setReviewDescription('');
        setRating('');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while submitting your review.',
      });
    }
  };

  if (!product) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white my-10">
      {/* Product Card */}
      <div className="bg-gradient-to-br from-white/10 to-black/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl mb-12 border border-white/10">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">{product.name}</h1>

        <div className="flex flex-col gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl w-full h-96 object-cover border border-white/20 shadow-xl"
          />

          <p className="text-white/80 text-lg text-justify">{product.description}</p>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-4 flex-wrap">
            <a
              href={product.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-yellow-300 border border-white/20 backdrop-blur-md rounded-full hover:bg-yellow-400 hover:text-black transition font-medium cursor-pointer"
            >
              <FaExternalLinkAlt /> Visit Site
            </a>

            <button
              onClick={handleUpvote}
              disabled={user?.email === product.ownerEmail}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-yellow-400 border border-yellow-400 backdrop-blur-md rounded-full hover:bg-yellow-400 hover:text-black transition font-semibold"
            >
              <FaThumbsUp /> {product.votes} Votes
            </button>

            <button
              onClick={handleReport}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-red-400 border border-red-400 backdrop-blur-md rounded-full hover:bg-red-500 hover:text-white transition font-semibold"
            >
              <FaFlag /> Report
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-300">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-5 shadow-md text-left"
              >
                <div className="flex items-center mb-3 gap-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full border border-white/20 object-cover"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-base">{review.reviewerName}</h3>
                    <p className="text-yellow-300 text-sm font-medium">⭐ Rating: {review.rating} / 5</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed text-sm">{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Review Section */}
      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">Post a Review</h2>
        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="bg-white/10 text-white border border-white/20 p-2 rounded placeholder-white/60"
          />
          <input
            type="text"
            value={user?.photoURL || ''}
            readOnly
            className="bg-white/10 text-white border border-white/20 p-2 rounded placeholder-white/60"
          />
          <textarea
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            className="bg-white/10 text-white border border-white/20 p-2 rounded placeholder-white/60"
            placeholder="Write your review..."
            required
          />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-white/10 text-white border border-white/20 p-2 rounded placeholder-white/60"
            min="0"
            max="5"
            placeholder="Rating (0 to 5)"
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-md w-full transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
