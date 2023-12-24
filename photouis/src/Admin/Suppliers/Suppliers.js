import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import AddMoreSupplier from "./AddMoreSupplier";

const Suppliers = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // biến headers để dùng chung accessToken cho các API fetches
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [trackDelete, setTrackDelete] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7038/api/Suppliers",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers: ", error);
      }
    };
    fetchSuppliers();
  }, [trackDelete]);

  const handleDelete = async (supplierID) => {
    if (window.confirm("Bạn có chắc muốn xóa nhà cung cấp này không?")) {
      try {
        const response = await axios.delete(
          `https://localhost:7038/api/Suppliers/${supplierID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.SupplierID !== supplierID)
        );
        setTrackDelete(!trackDelete);
        alert(response.data);
      } catch (error) {
        console.error("Error deleting supplier: ", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Nhà cung cấp vật tư</h1>
      <table className="min-w-full mx-auto border-collapse overflow-x-scroll">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">
              ID nhà cung cấp
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Tên nhà cung cấp
            </th>
            <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
            <th className="border border-gray-300 px-4 py-2">Người liên hệ</th>
            <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.SupplierID}>
              <td className="border border-gray-300 px-4 py-2">
                {supplier.SupplierID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {supplier.SupplierName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {supplier.Address}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {supplier.ContactName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {supplier.Phone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(supplier.SupplierID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex">
        <button
          onClick={handleToggleModal}
          className="mt-4 bg-blue-600 text-gray-100 px-0.9 py-0.6 rounded-md transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faPlusSquare} className="fa-3x" />
        </button>

        <span className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-opacity duration-300">
          Thêm mới nhà cung cấp
        </span>
      </div>

      {isOpen && (
        <div className="">
          <AddMoreSupplier />
        </div>
      )}
    </div>
  );
};

export default Suppliers;
