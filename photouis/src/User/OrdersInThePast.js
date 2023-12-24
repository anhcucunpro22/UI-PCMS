import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

const OrdersInThePast = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // lấy userID từ biến loggedInUserInfo ở localstorage
  const getUserIDFromLocalstorage = JSON.parse(
    localStorage.getItem("loggedInUserInfo")
  );
  const confirmUserInfo = getUserIDFromLocalstorage
    ? getUserIDFromLocalstorage
    : null;
  console.log(confirmUserInfo);

  const [receipts, setReceipts] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7038/api/Receipts/ByCustomer?UserID=${confirmUserInfo.UserID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setReceipts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReceipts();
  }, []);

  useEffect(() => {
    setTotalOrders(receipts.length);
    setTotalAmountPaid(
      receipts.reduce((total, receipt) => total + receipt.TotalAmount, 0)
    );
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold font-mono mt-2 mb-3">
        Lịch sử mua hàng của {confirmUserInfo.FullName}
      </h2>
      <table className="table-auto border-collapse ">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID đơn hàng</th>
            <th className="px-4 py-2">Số hóa đơn</th>
            {/* <th className="px-4 py-2">Phần trăm giảm giá</th>
            <th className="px-4 py-2">Số tiền được giảm</th>
            <th className="px-4 py-2">Đã cọc trước</th>
            <th className="px-4 py-2">Phần trăm thuế</th>
            <th className="px-4 py-2">Số tiền thuế tính thêm</th> */}
            <th className="px-4 py-2">Thành tiền</th>
            {/* <th className="px-4 py-2">Nhân viên tạo đơn</th> */}
            <th className="px-4 py-2">Ngày tạo đơn</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt.ReceiptID} className="border border-gray-200">
              <td className="px-4 py-2">{receipt.ReceiptID}</td>
              <td className="px-4 py-2">{receipt.ReceiptNumber}</td>
              {/* <td className="px-4 py-2">{receipt.PercentageDiscount}%</td>
              <td className="px-4 py-2">{receipt.DiscountAmount}</td>
              <td className="px-4 py-2">{receipt.DepositPayment}</td>
              <td className="px-4 py-2">{receipt.PercentageTax}</td>
              <td className="px-4 py-2">{receipt.TaxAmount}</td> */}
              <td className="px-4 py-2">{receipt.TotalAmount} đ</td>
              {/* <td className="px-4 py-2">{receipt.CreatedBy}</td> */}
              <td className="px-4 py-2">
                {new Date(receipt.ReceiptDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="block text-gray-700 font-bold mt-4">
        Tổng số đơn hàng đã tạo:{" "}
        <span className="font-bold text-black text-xl">
          {totalOrders} đơn hàng
        </span>
      </p>
      <p className="block text-gray-700 font-bold">
        Tổng số tiền đã thanh toán cho tất cả đơn hàng:{" "}
        <span className="font-bold text-black text-xl">
          {totalAmountPaid.toLocaleString("vi-VN")} đ
        </span>
      </p>
      {/* <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-800">
          Tổng số tiền đã thanh toán cho tất cả đơn hàng:{" "}
          <span className="ml-2 text-green-500 text-xl font-bold">
            {totalAmountPaid} đ
          </span>
        </p>
      </div> */}
      <p className="">
        <span className="transition-colors text-gray-700 duration-300">
          Bạn muốn xem tổng số nợ của bạn?{" "}
          <FontAwesomeIcon icon={faHandPointRight} />
        </span>
        <a
          className="cursor-pointer text-xl font-bold ml-1 text-blue-800 hover:text-blue-800 transition-colors duration-300"
          onClick={() => {
            window.location.href = "/customerDebt";
          }}
        >
          Xem nợ
        </a>
      </p>
    </div>
  );
};

export default OrdersInThePast;
