import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const MyProductStatistics = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get(`/product?email=${user?.email}`);
        setProducts(response.data);
      } catch (error) {
        Swal.fire("Error", "Failed to load products.", "error");
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [user, axiosPublic]);

  // Data for charts
  const votesData = products.map(p => ({
    name: p.name.length > 10 ? p.name.slice(0, 10) + '...' : p.name,
    votes: p.votes || 0
  }));

  const timelineData = products.map(p => ({
    date: dayjs(p.createdAt).format('MMM D'),
    count: 1
  }));

  const productSummary = {
    total: products.length,
    upvoted: products.filter(p => p.votes > 0).length,
    pending: products.filter(p => p.status !== 'Accepted').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 rounded-3xl min-h-screen"
      style={{
        background: 'linear-gradient(145deg, rgba(0,0,0,0.7), rgba(20,20,20,0.85))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 0 30px rgba(0,0,0,0.4)',
        color: 'white',
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        My <span className="text-yellow-400">Product Statistics</span>
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Products', value: productSummary.total, color: '#00BCD4' },
          { label: 'Upvoted Products', value: productSummary.upvoted, color: '#8BC34A' },
          { label: 'Pending Status', value: productSummary.pending, color: '#FFC107' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl p-4 text-center border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${item.color}22, #111)`,
            }}
          >
            <div className="text-lg font-bold">{item.label}</div>
            <div className="text-2xl">{item.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Bar Chart - Votes */}
        <div className="bg-white/5 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 border border-white/10">
          <h2 className="text-xl mb-4 text-cyan-400 font-semibold">Votes Per Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={votesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="votes" fill="#00e5ff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Timeline */}
        <div className="bg-white/5 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 border border-white/10">
          <h2 className="text-xl mb-4 text-green-400 font-semibold">Products Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis allowDecimals={false} stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProductStatistics;
