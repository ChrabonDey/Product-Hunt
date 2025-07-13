import React, { useState, useEffect } from 'react';
import UseAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import { FaThumbsUp } from 'react-icons/fa';

const AllProductsPage = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uniqueTags, setUniqueTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get(`/product?search=${searchTerm}`);
        const sortedProducts = response.data
          .filter(product => product.isFeatured)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setProducts(sortedProducts.slice(0, 9));

        const tags = new Set();
        response.data.forEach(product => {
          product.tags.forEach(tag => tags.add(tag));
        });
        setUniqueTags([...tags]);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

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

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  return (
    <section className="p-6 min-h-screen bg-black text-white my-12">
      <h2 className="text-4xl font-bold my-8 text-white">
        All <span className="text-yellow-400">Products</span>
      </h2>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by tags..."
          className="w-full h-12 px-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full placeholder-white/70 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Glassy Tag Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {uniqueTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className="px-3 py-1 text-sm rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 shadow-md hover:shadow-yellow-200/40"
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-black/40 border border-white/20 rounded-xl overflow-hidden shadow-lg text-white p-4 flex flex-col justify-between gap-4 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Product Header */}
              <div className="flex justify-between items-center">
                <div
                  onClick={() => handleProductClick(product._id)}
                  className="cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-yellow-400">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    by {product?.brand || "Unknown Brand"}
                  </p>
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
                  className="rounded-2xl w-full h-52  object-cover border border-white/10"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 line-clamp-2">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Votes */}
              <div className="flex items-center justify-end">
                <button
                  className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300"
                  onClick={() =>
                    handleUpvote(product._id, user?.email, product.ownerEmail)
                  }
                  disabled={user?.email === product.ownerEmail}
                >
                  <FaThumbsUp className="text-lg" /> {product.votes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProductsPage;
