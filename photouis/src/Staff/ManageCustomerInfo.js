// thêm, chỉnh sửa, và xóa thông tin khách hàng
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faUserPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ForAddingNewCustomerInfo from './forAddingNewCustomerInfo';

const ManageCustomerInfo = () => {
  // Replace this with your actual list of users
  const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
    // Add more users as needed
  ];

  const handleEdit = (userId) => {
    // Add your edit logic here
    console.log('Edit user with ID:', userId);
  };

  const handleDelete = (userId) => {
    // Add your delete logic here
    console.log('Delete user with ID:', userId);
  };

  const [showAddNew, setShowAddNew] = useState(false);

  const handleShowAddNew = () => {
    setShowAddNew(!showAddNew); // Toggle the value of showAddNew when the button is clicked (true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light-blue">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Quản lý người dùng là  <span className="text-blue-500 hover:text-blue-700 mr-2">khách hàng</span>dành cho nhân viên</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID khách hàng</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mật khẩu</th>
              <th className="border border-gray-300 px-4 py-2">Hành động</th>
            </tr>
          </thead>
          
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleShowAddNew}
          className="text-blue-500 hover:text-blue-700 mt-4 flex items-center"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Thêm khách hàng mới
        </button>
        {showAddNew && <ForAddingNewCustomerInfo />}
      </div>
    </div>
  );
};

export default ManageCustomerInfo;