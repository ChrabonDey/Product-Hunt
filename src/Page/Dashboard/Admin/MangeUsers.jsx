import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaUserShield, FaUserCog } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleMakeAdmin = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}/role`, { role: 'admin' });
      if (response.status === 200) {
        setUsers(prev =>
          prev.map(user =>
            user._id === userId ? { ...user, role: 'admin' } : user
          )
        );
        Swal.fire('Success', 'User has been made Admin!', 'success');
      }
    } catch {
      Swal.fire('Error', 'Failed to make user Admin.', 'error');
    }
  };

  const handleMakeModerator = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}/role`, { role: 'moderator' });
      if (response.status === 200) {
        setUsers(prev =>
          prev.map(user =>
            user._id === userId ? { ...user, role: 'moderator' } : user
          )
        );
        Swal.fire('Success', 'User has been made Moderator!', 'success');
      }
    } catch {
      Swal.fire('Error', 'Failed to make user Moderator.', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white rounded-xl"
    >
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Manage <span className="text-blue-500">Users</span>
      </h1>

      <div className="overflow-x-auto backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-blue-900/80 text-white">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <motion.tr
                key={user._id}
                className={`transition-all ${idx % 2 === 0 ? 'bg-black/20' : 'bg-white/10'}`}
                whileHover={{ scale: 1.02 }}
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize text-blue-300">{user.role}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMakeModerator(user._id)}
                      disabled={user.role === 'moderator' || user.role === 'admin'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        user.role === 'moderator' || user.role === 'admin'
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-yellow-500 hover:bg-yellow-600'
                      }`}
                    >
                      <FaUserCog /> Moderator
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={user.role === 'admin'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        user.role === 'admin'
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      <FaUserShield /> Admin
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageUsers;
