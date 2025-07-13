import React, { useState, useEffect } from 'react';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import UseAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TrendingProducts = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axiosPublic.get('/product');
        const sortedProducts = response.data.sort((a, b) => b.votes - a.votes);
        setProducts(sortedProducts.slice(0, 6));
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };

    fetchTrendingProducts();
  }, []);

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
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === productId ? { ...product, votes: product.votes + 1 } : product
          )
        );
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductPage/${productId}`);
  };

  return (
    <section className="p-6 bg-black min-h-screen">
      <h2 className="text-4xl font-bold text-white my-8">
        Trending <span className='text-yellow-400'>Products</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-black/40 border border-white/20 rounded-xl overflow-hidden shadow-lg text-white p-4 flex flex-col justify-between gap-4 transition-all duration-300"
            >
              {/* Product Header */}
              <div className="flex justify-between items-center">
                <div onClick={() => handleProductClick(product._id)} className="cursor-pointer">
                  <h3 className="text-xl font-bold text-yellow-400">{product.name}</h3>
                  <p className="text-sm text-white/80">by {product?.brand || "Unknown Brand"}</p>
                </div>
                <a
                  href={product.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-300"
                >
                  Visit
                </a>
              </div>

              {/* Product Image */}
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-2xl border border-white/10"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 line-clamp-2">{product.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Votes */}
              <div className="flex items-center justify-end">
                <button
                  className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300"
                  onClick={() => handleUpvote(product._id, user?.email, product.ownerEmail)}
                  disabled={user?.email === product.ownerEmail}
                >
                  <FaThumbsUp className="text-lg" /> {product.votes}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          className="btn bg-yellow-400 hover:bg-yellow-300 text-black py-2 px-6 rounded shadow"
          onClick={() => navigate('/Products')}
        >
          Show All Products
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;
