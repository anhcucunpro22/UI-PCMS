import React, { useEffect, useState } from "react";
import axios from "axios";

const PersonalStatisticsStaff = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // lấy userID từ biến loggedInUserInfo ở localstorage
  const getUserIDFromLocalstorage = JSON.parse(
    localStorage.getItem("loggedInUserInfo")
  );
  const confirmUserInfoGot = getUserIDFromLocalstorage
    ? getUserIDFromLocalstorage
    : null;
  console.log(confirmUserInfoGot);

  const [userID, setUserID] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);
  // số hóa đơn truy vấn
  const [receiptNumber, setReceiptNumber] = useState(null);
  // đếm số data entries đến table
  const [countEntries, setCountEntries] = useState(0);

  const handleChange = (e) => {
    setUserID(e.target.value);
  };

  const [luuTruReceiptID, setLuuTruReceiptID] = useState([]);
  const [luuReceiptNumber, setLuuReceiptNumber] = useState([]);
  const handleStaffStatistics = (e) => {
    axios
      .get(
        // `https://localhost:7038/api/Receipts/ByReceipts?UserID=${confirmUserInfoGot.UserID}`
        `https://localhost:7038/api/ReceiptDetail/users/${confirmUserInfoGot.FullName}/receipts`
      )
      .then((response) => {
        console.log("receipts đã fetch: ", response.data);

        // for (let i = 0; i < response.data.Receipts.length; i++) {
        //   console.log(
        //     "receipts đã fetch trong hàm for: ",
        //     response.data.Receipts
        //   );

        //   setLuuReceiptNumber([
        //     ...luuReceiptNumber,
        //     response.data.Receipts[i].ReceiptID,
        //   ]);
        // }

        setReceipts(response.data);
        const totalAmount = response.data.ReceiptList.reduce(
          (acc, curr) => acc + curr.ReceiptDetail.FinalPrice,
          0
        );
        setTotalAmountReceived(totalAmount.toLocaleString("vi-VN"));
      })
      .catch((error) => {
        console.error("Error fetching receipts: ", error);
      });
  };

  useEffect(() => {
    handleStaffStatistics();
  }, []);

  // const truyRaSoHoaDon = (ReceiptID) => {
  //   axios
  //     .get(`https://localhost:7038/api/Receipts/receipts/${ReceiptID}`)
  //     .then((response) => {
  //       console.log("Số hóa đơn truy ra: ", response.data.ReceiptNumber);
  //       setReceiptNumber([...receiptNumber, response.data.ReceiptNumber]);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching receipts: ", error);
  //     });
  // };

  // useEffect(() => {
  //   console.log(luuReceiptNumber);
  //   truyRaSoHoaDon(luuReceiptNumber[0]);
  // }, [receipts]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        Xem đơn hàng tạo bởi nhân viên
      </h1>

      {receipts.ReceiptCount > 0 ? (
        <div>
          <p className="my-3 block text-gray-700">
            Thông tin đơn hàng đã tạo từ nhân viên:{" "}
            <span className="font-bold text-black">
              {confirmUserInfoGot.FullName}
            </span>
          </p>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300">ID hóa đơn</th>
                <th className="border border-gray-300">Số hóa đơn</th>
                <th className="border border-gray-300">Tạo bởi nhân viên</th>
                <th className="border border-gray-300">Ngày tạo</th>
                <th className="border border-gray-300">Số lượng trang</th>
                <th className="border border-gray-300">Số lượng bộ</th>
                <th className="border border-gray-300">Phần trăm giảm giá</th>
                <th className="border border-gray-300">Số tiền được giảm</th>
                <th className="border border-gray-300">Phần trăm thuế</th>
                <th className="border border-gray-300">Tiền thuế</th>
                <th className="border border-gray-300">Tiền khách cọc trước</th>
                <th className="border border-gray-300">Thành tiền</th>
                <th className="border border-gray-300">Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {receipts.ReceiptList.map((receipt) => (
                <tr key={receipt.ReceiptDetail.ReceiptDeID}>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.ReceiptDeID}
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptNumber}
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.CreatedBy}
                  </td>
                  <td className="border border-gray-300">
                    {new Date(
                      receipt.ReceiptDetail.CreatedDate
                    ).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.Quantity}
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.QuantitySets}
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.PercentageDiscount} %
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.DiscountAmount} đ
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.PercentageTax} %
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.TaxAmount} đ
                  </td>

                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.DepositPayment} đ
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.FinalPrice} đ
                  </td>
                  <td className="border border-gray-300">
                    {receipt.ReceiptDetail.Description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="my-3 block text-gray-700">
            Tổng doanh thu từ nhân viên{" "}
            <span className="text-black">{confirmUserInfoGot.FullName}</span>:{" "}
            <span className="font-bold text-xl">{totalAmountReceived} đ</span>
          </p>

          <p className="my-3 block text-gray-700">
            Tổng số đơn hàng đã tạo:{" "}
            <span className="font-bold text-xl text-black">
              {receipts.ReceiptCount} đơn hàng
            </span>
          </p>
        </div>
      ) : (
        <p className="my-3 block text-gray-700">
          Chưa có đơn hàng của nhân viên{" "}
          <span className="text-black font-bold">
            {confirmUserInfoGot.FullName}
          </span>
        </p>
      )}
    </div>
  );
};

export default PersonalStatisticsStaff;
