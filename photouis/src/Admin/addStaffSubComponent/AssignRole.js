import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignRole = () => {
  // lấy access token từ jwt ở localstorage
  const getAccessTokenLocalstorage = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getAccessTokenLocalstorage
    ? getAccessTokenLocalstorage.AccessToken
    : null;

  // lấy userID của nhân viên vừa tạo ở dưới localstorage
  const getNhanVIenID = JSON.parse(localStorage.getItem("staffUserIDJustGet"));
  const nhanVIenID = getNhanVIenID ? getNhanVIenID.data.UserID : null;
  console.log("ID nhân viên vừa tạo ở form kia", nhanVIenID);

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("https://localhost:7038/api/Role", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles: ", error);
      }
    };
    fetchRoles();
  }, []);

  const handleRoleChange = (e) => {
    console.log("RoleID đã chọn: ", e.target.value);
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    const dataGuiDi = {
      userId: nhanVIenID,
      roleIds: [selectedRole],
    };

    axios
      .post("https://localhost:7038/api/Authen/assignrole", dataGuiDi, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        // Handle error response
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Phân vai trò</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="roleID"
          >
            Chọn vai trò
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="roleID"
            name="roleID"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="">- Chọn vai trò -</option>
            {roles.map((role) => (
              <option key={role.RoleID} value={role.RoleID}>
                {role.RoleName}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Phân vai trò cho nhân viên mới tạo
        </button>
      </form>
    </div>
  );
};

export default AssignRole;
