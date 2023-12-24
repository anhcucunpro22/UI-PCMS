import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignFacility = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataGuiDi = {
      userId: nhanVIenID,
      userFaci: [selectedFacility],
    };

    axios
      .post("https://localhost:7038/api/Authen/assignfacilities", dataGuiDi, {
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
      <h1 className="text-2xl font-bold mb-4">Phân cơ sở</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="facilityID"
          >
            Làm việc tại cơ sở
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
              <option key={facility.FacilityID} value={facility.FacilityID}>
                {facility.FacilityName}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Phân cơ sở cho nhân viên mới tạo
        </button>
      </form>
    </div>
  );
};

export default AssignFacility;
