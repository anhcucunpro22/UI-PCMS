import React, { useState } from "react";
import axios from "axios";

const AddMoreSupplier = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // biến headers để dùng chung accessToken cho các API fetches
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [supplierName, setSupplierName] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSupplierNameChange = (e) => {
    setSupplierName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleContactNameChange = (e) => {
    setContactName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7038/api/Suppliers",
        {
          SupplierName: supplierName,
          Address: address,
          ContactName: contactName,
          Phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Update the state to remove the deleted supplier
      alert(response.data);
      // Add your logic to add a new supplier here
    } catch (error) {
      console.error("Error adding supplier: ", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono my-2">
        Thêm nhà cung cấp mới
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Tên nhà cung cấp
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={supplierName}
            onChange={handleSupplierNameChange}
          />
          <label className="block text-sm font-medium text-gray-700">
            Địa chỉ
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={address}
            onChange={handleAddressChange}
          />
          <label className="block text-sm font-medium text-gray-700">
            Người liên hệ
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={contactName}
            onChange={handleContactNameChange}
          />
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={phone}
            onChange={handlePhoneChange}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thêm nhà cung cấp
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoreSupplier;
