import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const AdminStatistics = () => {
  const axiosSecure = UseAxiosSecure();
  const [statistics, setStatistics] = useState(null);

  // Fetch data from APIs
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

  // Prepare data for PieChart
  const data = statistics
    ? [
        { id: 'Accepted Products', value: statistics.products.accepted },
        { id: 'Pending Products', value: statistics.products.pending },
        { id: 'All Products', value: statistics.products.total },
        { id: 'Reviews', value: statistics.reviews },
        { id: 'Users', value: statistics.users },
      ]
    : [];

  return (
    <div className="admin-statistics bg-gray-100 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center  mb-8">Admin <span className='text-[#006dc7]'> Statistics</span></h1>
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '400px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {statistics ? (
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.id}: ${item.value}`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '70%',
                data,
                innerRadius: '50%', // Makes it a donut chart
                outerRadius: '90%',
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
                fontSize: '12px',
                fill: '#333',
              },
            }}
            size={{
              width: 400,
              height: 400,
            }}
          />
        ) : (
          <p className="text-center text-gray-500">Loading statistics...</p>
        )}
      </div>
      {statistics && (
        <div className="mt-6 text-center">
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-5">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-blue-50 p-3 rounded-lg shadow"
              >
                <div
                  className="w-4 h-4 rounded-full mb-2"
                  style={{
                    backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#FFC107', '#9C27B0'][index],
                  }}
                ></div>
                <p className="font-semibold text-gray-800">{item.id}</p>
                <p className="text-gray-600">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStatistics;
