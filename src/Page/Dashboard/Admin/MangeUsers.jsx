import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);

  // Fetch all users
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

  // Make a user Admin
  const handleMakeAdmin = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}/role`, { role: 'admin' });
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: 'admin' } : user
          )
        );
        Swal.fire('Success', 'User has been made Admin!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to make user Admin.', 'error');
    }
  };

  // Make a user Moderator
  const handleMakeModerator = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}/role`, { role: 'moderator' });
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: 'moderator' } : user
          )
        );
        Swal.fire('Success', 'User has been made Moderator!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to make user Moderator.', 'error');
    }
  };

  return (
    <div className="manage-users-page bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center  mb-8">Manage <span className='text-[#006dc7]'>Users</span></h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">User Name</th>
              <th className="px-6 py-3 text-sm font-semibold">User Email</th>
              <th className="px-6 py-3 text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-sm font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-6 py-4 text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-gray-800 capitalize">{user.role}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-full hover:bg-yellow-600 transition"
                      onClick={() => handleMakeModerator(user._id)}
                      disabled={user.role === 'moderator' || user.role === 'admin'}
                    >
                      Make Moderator
                    </button>
                    <button
                      className="px-4 py-2 bg-[#006dc7]   text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition"
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={user.role === 'admin'}
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
