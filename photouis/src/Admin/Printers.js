import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Printers = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  const [printers, setPrinters] = useState([]);
  const [updateAgain, setUpdateAgain] = useState(true);

  useEffect(() => {
    // lấy tất cả máy in
    const fetchPrinters = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7038/api/Photocopier",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPrinters(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPrinters();
  }, [updateAgain]);

  // hàm báo hỏng máy in
  const baoHong = async (thongTinMayIn) => {
    const mayInLayDuoc = thongTinMayIn;
    const confirmMayInLayDuoc = mayInLayDuoc ? mayInLayDuoc : null;

    // JSON parse
    const jsonParseMayIn = JSON.parse(confirmMayInLayDuoc);
    console.log(jsonParseMayIn);
    if (window.confirm("Xác nhận báo hỏng máy in?")) {
      try {
        const response = await axios.put(
          `https://localhost:7038/api/Photocopier?id=${jsonParseMayIn.PhotocopierID}`,
          {
            PhotocopierID: jsonParseMayIn.PhotocopierID,
            FacilityID: jsonParseMayIn.FacilityID,
            PhotocopierName: jsonParseMayIn.PhotocopierName,
            Description: jsonParseMayIn.Description,
            SerialNumber: jsonParseMayIn.SerialNumber,
            Location: jsonParseMayIn.Location,
            IsActive: false,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert(response.data);
        setUpdateAgain(!updateAgain);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // hàm báo sửa máy in
  const baoSua = async (thongTinMayIn) => {
    const mayInLayDuoc = thongTinMayIn;
    const confirmMayInLayDuoc = mayInLayDuoc ? mayInLayDuoc : null;

    // JSON parse
    const jsonParseMayIn = JSON.parse(confirmMayInLayDuoc);
    console.log(jsonParseMayIn);
    if (window.confirm("Xác nhận máy in đã sửa?")) {
      try {
        const response = await axios.put(
          `https://localhost:7038/api/Photocopier?id=${jsonParseMayIn.PhotocopierID}`,
          {
            PhotocopierID: jsonParseMayIn.PhotocopierID,
            FacilityID: jsonParseMayIn.FacilityID,
            PhotocopierName: jsonParseMayIn.PhotocopierName,
            Description: jsonParseMayIn.Description,
            SerialNumber: jsonParseMayIn.SerialNumber,
            Location: jsonParseMayIn.Location,
            IsActive: true,
            Notes: "",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert(response.data);
        setUpdateAgain(!updateAgain);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold my-4">Danh sách máy in</h1>
      <table className="min-w-full mx-auto border-collapse overflow-x-scroll">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID máy in</th>
            <th className="border border-gray-300 px-4 py-2">Tên máy in</th>
            <th className="border border-gray-300 px-4 py-2">Mô tả</th>
            <th className="border border-gray-300 px-4 py-2">Cơ sở</th>
            <th className="border border-gray-300 px-4 py-2">Số serial</th>
            <th className="border border-gray-300 px-4 py-2">Thứ tự</th>
            <th className="border border-gray-300 px-4 py-2">Tình trạng</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
            <th className="border border-gray-300 px-4 py-2">
              Ghi chú hư hỏng
            </th>
          </tr>
        </thead>
        <tbody>
          {printers.map((printer) => (
            <tr key={printer.PhotocopierID}>
              <td className="border border-gray-300 px-4 py-2">
                {printer.PhotocopierID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.PhotocopierName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.Description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.Facility.FacilityName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.SerialNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.Location}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.IsActive ? "Hoạt động" : "Bị hỏng"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.IsActive ? (
                  <p
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => baoHong(JSON.stringify(printer))}
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Báo hỏng
                  </p>
                ) : (
                  <p
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => baoSua(JSON.stringify(printer))}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} /> Báo đã sửa
                  </p>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {printer.Notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Printers;
