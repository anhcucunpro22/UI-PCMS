import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function ReportProblemStaff() {
  // lấy token access từ jwt trong localstorage
  const storedToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = storedToken ? storedToken.AccessToken : null;
  console.log(accessToken);

  // lấy userID từ biến loggedInUserInfo ở localstorage
  const getUserIDFromLocalstorage = JSON.parse(
    localStorage.getItem("loggedInUserInfo")
  );
  const confirmUserInfo = getUserIDFromLocalstorage
    ? getUserIDFromLocalstorage
    : null;
  console.log(confirmUserInfo);

  // lấy danh sách máy in dựa trên facilityID của staff đang đăng nhập (đã đc admin phân
  // cơ sở) lấy từ localstorage
  const getFacilityID = JSON.parse(localStorage.getItem("facilityID"));
  const confirmGetFacilityID = getFacilityID ? getFacilityID : null;
  console.log(confirmGetFacilityID);

  const [printersList, setPrintersList] = useState(null);
  const [updateAgain, setUpdateAgain] = useState(false);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch(
          `https://localhost:7038/api/Photocopier/Getbyfacilities?FacilityID=${confirmGetFacilityID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Máy in được fetch từ cơ sở của nhân viên: ", result);
        setPrintersList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPrinters();
  }, [updateAgain]);

  const [notesBaoHong, setNotesBaoHong] = useState("");
  const handleNotesBaoHongChange = (e) => {
    console.log("Notes báo hỏng: ", e.target.value);
    setNotesBaoHong(e.target.value);
  };
  const [openNotesBaoHong, setOpenNotesBaoHong] = useState(false);
  // hàm báo hỏng máy in
  const baoHong = async (thongTinMayIn) => {
    const mayInLayDuoc = thongTinMayIn;
    const confirmMayInLayDuoc = mayInLayDuoc ? mayInLayDuoc : null;

    // JSON parse
    const jsonParseMayIn = JSON.parse(confirmMayInLayDuoc);
    console.log(jsonParseMayIn);
    // triggers state nhập input cái notes báo hỏng máy in ở đây
    setOpenNotesBaoHong(true);

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
            Notes: notesBaoHong,
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
            IsActive: true,
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
      {/* chọn máy in phục vụ */}
      <h1 className="text-2xl font-bold my-4">
        {/* Danh sách máy in ở cơ sở được phân ({confirmUserInfo.Facilities}): */}
      </h1>
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
              Tình trạng hư hỏng (nếu có)
            </th>
          </tr>
        </thead>
        <tbody>
          {printersList &&
            printersList.map((printer) => (
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
                    <p className="">Máy in bị hỏng</p>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {printer.Notes}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {openNotesBaoHong ? (
        <div>
          <label className="block text-sm font-medium mt-2 mb-1 text-gray-700">
            Nhập tình trạng máy in hỏng tại đây
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={notesBaoHong}
            onChange={(e) => handleNotesBaoHongChange(e)}
            name="customerName"
          />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
