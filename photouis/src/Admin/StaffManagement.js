import React, { useEffect, useState } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import StaffStatistics from "../Staff/StaffStatistics";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import AddStaff from "./addStaffSubComponent/AddStaff";
import AssignFacility from "./addStaffSubComponent/AssignFacility";
import AssignRole from "./addStaffSubComponent/AssignRole";
import StaffListByFacilityName from "./StaffListByFacilityName";

const StaffManagement = () => {
  // Replace this with your actual list of users
  const [users, setUsers] = useState([]);

  const fetchStaff = () => {
    axios
      .get("https://localhost:7038/api/Authen/getStaffUsers")
      .then((response) => {
        console.log(response.data);
        // Handle the response data here
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });
  };
  useEffect(() => {
    fetchStaff();
  }, []);

  const handleEdit = (user) => {
    // Add your edit logic here
    console.log("Edit user with ID:", JSON.parse(user));
  };

  // toggle off
  const tat = (user) => {
    // json parse thì mới tiếp cận dữ liệu được
    const getUser = JSON.parse(user);
    console.log(getUser);
    console.log("Deactivate user with ID:", JSON.parse(user).FullName);
  };
  // toggle on
  const bat = (user) => {
    console.log("Activate user with ID:", JSON.parse(user));
  };

  return (
    <div className="flex justify-center mt-[960px] items-center h-screen bg-light-blue mt-[734px]">
      <div className="w-full max-w-7xl mx-auto px-4 mt-64">
        <h1 className="text-3xl font-bold text-center mb-8">
          Quản lý{" "}
          <span className="text-blue-500 hover:text-blue-700 mr-2">
            nhân viên
          </span>
        </h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID nhân viên</th>
              <th className="border border-gray-300 px-4 py-2">Họ & Tên</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mật khẩu</th>
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
                  {user.Isactive ? (
                    <span
                      className="cursor-pointer mr-2"
                      onClick={() => tat(JSON.stringify(user))}
                    >
                      <FontAwesomeIcon icon={faToggleOn} />
                    </span>
                  ) : (
                    <span
                      className="cursor-pointer mr-2"
                      onClick={() => bat(JSON.stringify(user))}
                    >
                      <FontAwesomeIcon icon={faToggleOff} />
                    </span>
                  )}

                  <button
                    onClick={() => handleEdit(JSON.stringify(user))}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <StaffListByFacilityName />

        {/* form thêm mới nhân viên */}
        <div className="mt-28">
          <AddStaff />

          <AssignFacility />

          <AssignRole />
        </div>

        {/* xem staff làm ăn được gì */}
        <div className="mt-[130px] mb-32">
          <StaffStatistics />
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
