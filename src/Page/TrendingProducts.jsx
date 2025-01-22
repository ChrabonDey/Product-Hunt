import React, { useState, useEffect } from 'react';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import UseAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';

const TrendingProducts = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axiosPublic.get('/product');
        const sortedProducts = response.data
          .sort((a, b) => b.votes - a.votes);

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
    <section className="p-6">
      <h2 className="text-4xl font-bold my-8">Trending <span className='text-[#006dc7]'>Products</span></h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h3 
                  className="text-lg font-semibold mb-2 cursor-pointer hover:underline" 
                  onClick={() => handleProductClick(product._id)}
                >
                  {product.name}
                </h3>
                <p className="text-sm mb-2 text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{tag}</span>
                  ))}
                </div>
                <a href={product.external_link} target="_blank" rel="noopener noreferrer" className="text-[#006dc7] text-sm hover:underline">
                  Visit Product
                </a>
                <div className="mt-4">
                  <button
                    className="btn bg-[#006dc7] text-white font-semibold w-full flex justify-center items-center gap-2 py-2 rounded"
                    disabled={user?.email === product.ownerEmail}
                    onClick={() => handleUpvote(product._id, user?.email, product.ownerEmail)}
                  >
                    <FaThumbsUp />
                    <span>{product.votes} Votes</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          className="btn bg-gray-800 text-white py-2 px-6 rounded"
          onClick={() => navigate('/Products')}
        >
          Show All Products
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;
