import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCircle,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserManagement = () => {
  const getToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getToken ? getToken : null;

  // Replace this with your actual list of users

  // fetch get users
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const fetchUsers = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "https://localhost:7038/api/Authen/getCustomerUsers",
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, [reload]);

  const handleEdit = (userId) => {
    // Add your edit logic here
    console.log("Edit user with ID:", userId);
  };

  const handleIsActive = async (userId, Isactive) => {
    if (window.confirm("Bạn có chắc muốn chuyển trạng thái người dùng này?")) {
      console.log("Isactive turn off user with ID:", userId);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      let data;

      switch (Isactive.toString()) {
        case "true":
          data = {
            isactive: false,
          };
          console.log(data);
          break;
        case "false":
          data = {
            isactive: true,
          };
          console.log(data);
          break;
        default:
          console.log("reach default");
      }

      try {
        const response = await axios.put(
          `https://localhost:7038/api/Users/users/${userId}`,
          data,
          { headers }
        );
        // Handle the response data or errors if needed
        console.log(response);
        alert("Đã chuyển thành công");
        setReload(!reload);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center mt-[-60px] items-center h-screen bg-light-blue">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Quản lý{" "}
          <span className="text-blue-500 hover:text-blue-700 mr-2">
            người dùng
          </span>
        </h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                ID người dùng
              </th>
              <th className="border border-gray-300 px-4 py-2">Họ & Tên</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mật khẩu</th>
              <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
              <th className="border border-gray-300 px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UserID}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.UserID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.FullName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.UserName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.Email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.Password}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={
                      user.Isactive ? "text-green-500" : "text-red-500"
                    }
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleIsActive(user.UserID, user.Isactive)}
                    className={`${user.Isactive}
    ? "text-green-500"
    : "text-red-500"`}
                  >
                    <FontAwesomeIcon
                      icon={user.Isactive ? faToggleOn : faToggleOff}
                      style={{
                        color: user.Isactive
                          ? "text-green-500"
                          : "text-red-500",
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
