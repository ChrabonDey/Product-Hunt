import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadialBarChart, RadialBar, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const AdminStatistics = () => {
  const axiosSecure = UseAxiosSecure();
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, reviewsRes, usersRes] = await Promise.all([
          axiosSecure.get('/products/count'),
          axiosSecure.get('/reviews/count'),
          axiosSecure.get('/users/count'),
        ]);

        setStatistics({
          products: productsRes.data,
          reviews: reviewsRes.data.count,
          users: usersRes.data.count,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const productData = statistics
    ? [
        { name: 'Accepted', value: statistics.products.accepted },
        { name: 'Pending', value: statistics.products.pending },
        { name: 'Total', value: statistics.products.total },
      ]
    : [];

  const radialData = statistics
    ? [
        { name: 'Reviews', uv: statistics.reviews, fill: '#00bcd4' },
        { name: 'Users', uv: statistics.users, fill: '#ff9800' },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 rounded-3xl"
      style={{
        background: 'linear-gradient(145deg, rgba(0,0,0,0.7), rgba(20,20,20,0.85))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 0 30px rgba(0,0,0,0.4)',
        color: 'white',
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Admin <span className="text-cyan-400">Dashboard</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-12 mb-10">
        {/* Bar Chart */}
        <div className="bg-white/5 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 border border-white/10">
          <h2 className="text-xl mb-4 text-yellow-400 font-semibold">Product Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#00e5ff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Chart */}
        <div className="bg-white/5 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 border border-white/10">
          <h2 className="text-xl mb-4 text-purple-400 font-semibold">User & Review Insights</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="90%"
              barSize={20}
              data={radialData}
            >
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Highlight Boxes */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          {[
            { label: 'Accepted', value: statistics.products.accepted, color: '#4CAF50' },
            { label: 'Pending', value: statistics.products.pending, color: '#FFC107' },
            { label: 'Total Products', value: statistics.products.total, color: '#2196F3' },
            { label: 'Reviews', value: statistics.reviews, color: '#00BCD4' },
            { label: 'Users', value: statistics.users, color: '#9C27B0' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl p-4 text-center text-white border border-white/10"
              style={{
                background: `linear-gradient(135deg, ${item.color}20, #00000033)`,
              }}
            >
              <div className="text-lg font-bold">{item.label}</div>
              <div className="text-2xl">{item.value}</div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AdminStatistics;
