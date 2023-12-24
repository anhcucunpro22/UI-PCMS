import React, { useState } from "react";
import axios from "axios";

const StaffStatistics = () => {
  const [userID, setUserID] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);

  const handleChange = (e) => {
    setUserID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://localhost:7038/api/Receipts/ByReceipts?UserID=${userID}`)
      .then((response) => {
        console.log(response.data);
        setReceipts(response.data);
        const totalAmount = response.data.reduce(
          (acc, curr) => acc + curr.AmountReceived,
          0
        );
        setTotalAmountReceived(totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching receipts: ", error);
      });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        Xem đơn hàng tạo bởi mỗi nhân viên
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="userID"
          >
            ID nhân viên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userID"
            type="text"
            name="userID"
            value={userID}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Xem thống kê
        </button>
      </form>
      {receipts.length > 0 ? (
        <div>
          <p className="my-3">
            Thông tin đơn hàng đã tạo từ nhân viên với ID:{" "}
            <span className="font-bold">{userID}</span>
          </p>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300">ID hóa đơn</th>
                <th className="border border-gray-300">Số hóa đơn</th>
                <th className="border border-gray-300">Tạo bởi nhân viên</th>
                <th className="border border-gray-300">Ngày tạo</th>
                <th className="border border-gray-300">Tiền khách cọc trước</th>
                <th className="border border-gray-300">
                  Tổng giá trị đơn hàng
                </th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt) => (
                <tr key={receipt.ReceiptID}>
                  <td className="border  text-center border-gray-300">
                    {receipt.ReceiptID}
                  </td>
                  <td className="border  text-center border-gray-300">
                    {receipt.ReceiptNumber}
                  </td>
                  <td className="border  text-center border-gray-300">
                    {receipt.CreatedBy}
                  </td>
                  <td className="border  text-center border-gray-300">
                    {receipt.ReceiptDate
                      ? new Date(receipt.ReceiptDate).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : null}
                  </td>
                  <td className="border  text-center border-gray-300">
                    {receipt.DepositPayment} đ
                  </td>
                  <td className="border  text-center border-gray-300">
                    {receipt.AmountReceived} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3">
            Tổng số tiền đã kiếm được từ nhân viên ID{" "}
            <span className="font-bold">{userID}</span>:{" "}
            <span className="font-bold">{totalAmountReceived} đ</span>
          </p>
        </div>
      ) : (
        <p className="my-3">
          Chưa có đơn hàng của nhân viên với ID{" "}
          <span className="font-bold">{userID}</span>
        </p>
      )}
    </div>
  );
};

export default StaffStatistics;
