import React, { useState, useEffect } from "react";
import axios from "axios";

function AddStaff() {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // biến headers để dùng chung accessToken cho các API fetches
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [state, setState] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    codeUser: "",
    gender: "",
    organizationID: "",
    isactive: true,
  });

  const handleChange = (event) => {
    console.log({ ...state, [event.target.name]: event.target.value });
    setState({ ...state, [event.target.name]: event.target.value });
  };

  // data trả về sau khi submit form
  const [responseDataSubmit, setResponseDataSubmit] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost:7038/api/Authen/addStaff", state, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setResponseDataSubmit(response);
        localStorage.setItem("staffUserIDJustGet", JSON.stringify(response));
        if (response.status === 200) {
          alert("Thêm nhân viên thành công, mời bạn phân cơ sở và phân quyền");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7038/api/Organizations", { headers })
      .then((response) => {
        console.log(response.data);
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Thêm mới nhân viên</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="fullName"
          >
            Họ & tên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            name="fullName"
            value={state.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="py-4 bg-gray-100 rounded-lg">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="gender"
          >
            Giới tính
          </label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="female"
              name="gender"
              value="0"
              checked={state.gender === "0"}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-indigo-600 focus:ring-indigo-600 focus:border-indigo-600"
            />
            <label
              htmlFor="female"
              className="ml-2 text-gray-700 font-semibold"
            >
              Nữ
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="gender"
              value="1"
              checked={state.gender === "1"}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-indigo-600 focus:ring-indigo-600 focus:border-indigo-600"
            />
            <label htmlFor="male" className="ml-2 text-gray-700 font-semibold">
              Nam
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="userName"
          >
            Tên đăng nhập
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            name="userName"
            value={state.userName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="address"
          >
            Địa chỉ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            name="address"
            value={state.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Số điện thoại
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            name="phone"
            value={state.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="codeUser"
          >
            Mã nhân viên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="codeUser"
            type="text"
            name="codeUser"
            value={state.codeUser}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="organizationID"
          >
            Làm việc tại chi nhánh
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="organizationID"
            name="organizationID"
            value={state.organizationID}
            onChange={handleChange}
          >
            <option value="">- Chọn chi nhánh -</option>
            {organizations.map((org) => (
              <option key={org.OrganizationID} value={org.OrganizationID}>
                {org.OrganizationName} - {org.School.SchoolName}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Thêm mới nhân viên
        </button>
      </form>
    </div>
  );
}

export default AddStaff;
