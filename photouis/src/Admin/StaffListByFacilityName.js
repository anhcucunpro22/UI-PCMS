import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffListByFacilityName = () => {
  // lấy access token từ jwt ở localstorage
  const getAccessTokenLocalstorage = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getAccessTokenLocalstorage
    ? getAccessTokenLocalstorage.AccessToken
    : null;

  // lấy userID của nhân viên vừa tạo ở dưới localstorage
  const getNhanVIenID = JSON.parse(localStorage.getItem("staffUserIDJustGet"));
  const nhanVIenID = getNhanVIenID ? getNhanVIenID.data.UserID : null;
  console.log("ID nhân viên vừa tạo ở form kia", nhanVIenID);

  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7038/api/Facilities",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        setFacilities(response.data);
      } catch (error) {
        console.error("Error fetching facilities: ", error);
      }
    };
    fetchData();
  }, []);

  const handleFacilityChange = (e) => {
    console.log("Facility đã chọn: ", e.target.value);
    setSelectedFacility(e.target.value);
  };

  // danh sách staff
  const [staffs, setStaffs] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://localhost:7038/api/Authen/getStaffUsersByFacility?facilityName=${selectedFacility}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Nhân viên được fetch: ", response.data);
        setStaffs(response.data);
      })
      .catch((error) => {
        // Handle error response
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-100 p-4 mt-3 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        Xem danh sách nhân viên từng cơ sở
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="facilityID"
          >
            Chọn cơ sở để xem
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="facilityID"
            name="facilityID"
            value={selectedFacility}
            onChange={handleFacilityChange}
          >
            <option value="">- Chọn cơ sở -</option>
            {facilities.map((facility) => (
              <option key={facility.FacilityID} value={facility.FacilityName}>
                {facility.FacilityName}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Xem
        </button>
      </form>

      {staffs.length > 0 && (
        <table className="w-full border-collapse mt-4 border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300">ID</th>
              <th className="border border-gray-300">Họ & tên</th>
              <th className="border border-gray-300"> Số điện thoại</th>
              <th className="border border-gray-300">Địa chỉ</th>
              <th className="border border-gray-300">Giới tính</th>
              <th className="border border-gray-300">Mã nhân viên</th>
            </tr>
          </thead>
          <tbody>
            {staffs &&
              staffs.map((staff) => (
                <tr key={staff.UserID}>
                  <td className="border text-center border-gray-300">
                    {staff.UserID}
                  </td>
                  <td className="border text-center border-gray-300">
                    {staff.User.FullName}
                  </td>
                  <td className="border text-center border-gray-300">
                    {staff.User.Phone}
                  </td>
                  <td className="border text-center border-gray-300">
                    {staff.User.Address}
                  </td>
                  <td className="border text-center border-gray-300">
                    {staff.User.Gender}
                  </td>
                  <td className="border text-center border-gray-300">
                    {staff.User.CodeUser}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffListByFacilityName;
