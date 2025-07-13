import React, { useState, useEffect } from 'react';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import UseAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';

const FeaturedProducts = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const [products, setProducts] = useState([]);
  const [reviewCounts, setReviewCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get('/product');
        const sortedProducts = response.data
          .filter(product => product.isFeatured && product.timestamp)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const topProducts = sortedProducts.slice(0, 4);
        setProducts(topProducts);

        // Fetch review counts
        const counts = {};
        for (const product of topProducts) {
          try {
            const reviewRes = await axiosPublic.get(`/reviews?productId=${product._id}`);
            counts[product._id] = reviewRes.data.length;
          } catch {
            counts[product._id] = 0;
          }
        }
        setReviewCounts(counts);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [axiosPublic]);

  const handleUpvote = async (productId, userEmail, productOwnerEmail) => {
    if (!userEmail) {
      navigate('/login');
      return;
    }

    if (userEmail === productOwnerEmail) {
      alert('You cannot vote for your own product.');
      return;
    }

    try {
      const response = await axiosPublic.patch(`/product/${productId}`, {
        email: userEmail,
      });

      if (response.status === 200) {
        const updatedProduct = response.data;
        setProducts(prev =>
          prev.map(p => (p._id === productId ? updatedProduct : p))
        );
      }
    } catch (error) {
      console.error('Error upvoting:', error);
      alert(error.response?.data?.message || 'Something went wrong while upvoting.');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductPage/${productId}`);
  };

  return (
    <section className="p-6 bg-black min-h-screen">
      <h2 className="text-4xl font-bold text-white my-8">
        Featured <span className='text-yellow-400'>Products</span>
      </h2>

      {loading ? (
        
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="backdrop-blur-lg bg-white/10 p-10 rounded-3xl border border-white/20 shadow-lg flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <p className="text-white font-semibold tracking-wide">Loading... Please wait</p>
        </div>
      </div>
    
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-black/40 border border-white/20 rounded-xl overflow-hidden shadow-lg text-white p-4 flex flex-col justify-between gap-4 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div onClick={() => handleProductClick(product._id)} className="cursor-pointer">
                  <h3 className="text-xl font-bold text-yellow-400">{product.name}</h3>
                  <p className="text-sm text-white/80">by {product.brand || "Unknown Brand"}</p>
                </div>
                <a
                  href={product.external_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-300"
                >
                  Visit
                </a>
              </div>

              {/* Image */}
              <div className="flex justify-center items-center h-48 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-2xl object-cover border border-white/10 w-full h-full"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 line-clamp-2">{product.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags?.map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Review count */}
              <p className="text-xs text-white/50 italic mt-2">
                {reviewCounts[product._id] || 0} review
                {(reviewCounts[product._id] || 0) !== 1 ? 's' : ''}
              </p>

              {/* Upvote */}
              <div className="flex items-center justify-end">
                <button
                  className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
                    product.voters?.includes(user?.email)
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-yellow-400 hover:text-yellow-300'
                  }`}
                  onClick={() => handleUpvote(product._id, user?.email, product.Email)}
                  disabled={
                    user?.email === product.Email ||
                    product.voters?.includes(user?.email)
                  }
                >
                  <FaThumbsUp className="text-lg" /> {product.votes || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
