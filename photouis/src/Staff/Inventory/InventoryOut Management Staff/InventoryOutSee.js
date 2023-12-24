import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryOutSee = () => {
  const storedToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = storedToken ? storedToken.AccessToken : null;
  console.log(accessToken);

  const [totalAmountSum, setTotalAmountSum] = useState(0);

  // lấy thông tin của staff để đưa vào created by khi post
  const overallUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryInID, setInventoryInID] = useState("");

  const [supplierNames, setSupplierNames] = useState([]);

  const getSupplier = (InventoryInID) => {
    const url = `https://localhost:7038/api/InventoryIn/${InventoryInID}`;
    console.log(url);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    setTimeout(async () => {
      try {
        const response = await axios.get(url, { headers });
        // Handle the response data here
        console.log(
          "Nhà cung cấp đã click: ",
          response.data.Supplier.SupplierName
        );
        setSupplierNames([
          ...supplierNames,
          response.data.Supplier.SupplierName,
        ]);
        // return response.data.Supplier.SupplierName;

        // setSupplier(response.data.Supplier.SupplierName);
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    }, 4000);
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7038/api/InventoryOutDetails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Danh sách xuất kho đã fetch: ", response.data);
        setInventoryData(response.data);
        // Calculate the sum of TotalAmount
        // const totalAmountSum = response.data.reduce(
        //   (accumulator, item) => accumulator + item.TotalAmount,
        //   0
        // );
        // setInventoryInID(response.data.InventoryInID);

        // setTotalAmountSum(totalAmountSum);
      } catch (error) {
        console.error("Error fetching inventory data: ", error);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono mt-2 mb-3">
        Quản lý xuất kho
      </h2>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 ml-4">
        Lịch sử xuất kho
      </h3>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              ID xuất kho
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Vật tư xuất kho
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              số lượng xuất
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Giá cho mỗi đơn vị vật tư
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Phần trăm giảm giá
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Số tiền được giảm
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Phần trăm thuế
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Số tiền thuế
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Tổng tiền
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Phương thức vận chuyển
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Người tạo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Ngày tạo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Mô tả
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item, index) => (
            <tr key={item.InventoryOutDeID}>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.InventoryOutDeID}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.Material.MaterialName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.Quantity} {item.Unit.UnitName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.Material.Price} đ
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.PercentageDiscount} %
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.DiscountAmount} đ
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.PercentageTax} %
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.TaxAmount} đ
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.TotalAmount} đ
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.DeliveryMethod}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.CreatedBy}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.CreatedDate).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.Description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-800">
          Tổng số tiền đã chi tiêu để nhập kho:
          <span className="ml-2 text-green-500 text-xl font-bold">
            {totalAmountSum} đ
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default InventoryOutSee;
