import React, { useState, useEffect } from "react";
import axios from "axios";

const SeeOrders = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // biến headers để dùng chung accessToken cho các API fetches
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7038/api/Receipts");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
    fetchData();
  }, []);

  const totalAmount = orders.reduce((acc, order) => acc + order.TotalAmount, 0);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Thống kê đơn hàng</h1>

      <p className="block text-base font-medium text-gray-700 mt-[-10px] mb-[4px]">
        Tổng số lượng đơn hàng toàn thời gian:{" "}
        <span className="font-bold text-black">{orders.length} đơn hàng</span>
      </p>
      <p className="block text-base font-medium text-gray-700 mb-[10px]">
        Doanh thu toàn thời gian:{" "}
        <span className="font-bold text-green-600">{totalAmount} đ</span>
      </p>

      <table className="min-w-full mx-auto border-collapse overflow-x-scroll">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID hóa đơn</th>
            <th className="border border-gray-300 px-4 py-2">Số hóa đơn</th>
            <th className="border border-gray-300 px-4 py-2">Tạo bởi</th>
            <th className="border border-gray-300 px-4 py-2">Ngày tạo</th>
            <th className="border border-gray-300 px-4 py-2">
              Phần trăm giảm giá
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Phần trăm thuế tính vào
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Tiền thuế tính thêm
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Khách trả trước
            </th>
            <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
            <th className="border border-gray-300 px-4 py-2">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.ReceiptID}>
              <td className="border border-gray-300 px-4 py-2">
                {order.ReceiptID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.ReceiptNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.CreatedBy}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.ReceiptDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.PercentageDiscount}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.PercentageTax}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.TaxAmount} đ
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span className="font-bold">{order.DepositPayment}</span> đ
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span className="font-bold">{order.TotalAmount}</span> đ
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.Description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeOrders;
