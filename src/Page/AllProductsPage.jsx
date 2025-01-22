import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UseAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import { FaAnglesUp } from 'react-icons/fa6';

const AllProductsPage = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get(`/product?search=${searchTerm}`);
        const sortedProducts = response.data
          .filter(product => product.isFeatured)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setProducts(sortedProducts.slice(0, 9)); // Fetch 9 products, to display 3 rows of 3
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

  return (
    <section className="p-6">
       <h2 className="text-4xl font-bold my-8">All <span className='text-[#006dc7]'>Products</span></h2>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by tags..."
          className="input input-bordered w-full"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
            key={product._id}
            className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
            />
            <div className="p-4">
                <h3
                  className="text-xl font-semibold mb-2 text-gray-800 cursor-pointer hover:text-blue-500"
                  onClick={() => handleProductClick(product._id)}
                >
                  {product.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="badge badge-outline text-sm">{tag}</span>
                  ))}
                </div>
                <p className="text-sm mb-4">{product.description}</p>
                <a href={product.external_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Visit Product
                </a>
                <div className="mt-4">
                  <button
                    className="btn bg-[#006dc7] text-white font-semibold w-full flex items-center"
                    disabled={user?.email === product.ownerEmail} 
                    onClick={() => handleUpvote(product._id, user?.email, product.ownerEmail)} 
                  >
                    <span className="mr-2">
                      <FaAnglesUp></FaAnglesUp>
                      </span>{product.votes} Votes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProductsPage;
