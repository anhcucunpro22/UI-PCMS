import React, { useEffect, useState } from "react";
import axios from "axios";

const AddDebtStaff = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  const [debtAmount, setDebtAmount] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("");

  const handleDebtAmountChange = (e) => {
    console.log("Tổng nợ: ", e.target.value);
    setDebtAmount(e.target.value);
  };

  const handleAmountPaidChange = (e) => {
    console.log("TIền khách trả: ", e.target.value);
    setAmountPaid(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    console.log("Payment method nhận được: ", e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleStatusChange = (e) => {
    console.log("Ghi chú nhận được: ", e.target.value);
    setStatus(e.target.value);
  };

  const handleAddMoreDebtLecturer = async (e) => {
    try {
      const response = await axios.post(
        "https://localhost:7038/api/Debt",
        {
          userID: selectedGiangVienID,
          invoiceDate: new Date().toDateString(),
          collectionDate: new Date().toDateString(),
          debtAmount: debtAmount,
          amountPaid: amountPaid,
          paymentMethod: paymentMethod,
          remainingAmount: 0,
          status: status,
          dueDate: new Date().toDateString(),
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      alert(response.data);
    } catch (error) {
      console.error("Error adding debt", error);
    }
  };

  // lấy userID từ tên giảng viên chọn từ dropdown list để method post công nợ mới
  const [selectedGiangVienID, setSelectedGiangVienID] = useState("");
  // handle change lấy ID giảng viên từ tên giảng viên xổ xuống dropdown
  const handleDropdownChange = (e) => {
    console.log("ID giảng viên đã chọn: ", e.target.value);
    setSelectedGiangVienID(e.target.value);
  };
  // state lấy tất cả danh sách giảng viên, customers
  const [danhSachGiangVien, setDanhSachGiangVien] = useState([]);
  useEffect(() => {
    const getCustomerUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7038/api/Authen/getCustomerUsers",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(
          "Danh sách giảng viên/ khách hàng nhận được: ",
          response.data
        );
        setDanhSachGiangVien(response.data);
      } catch (error) {
        console.error("Error fetching customer users", error);
      }
    };

    getCustomerUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono my-2">Thêm công nợ</h2>
      <label className="block text-sm font-medium text-black mb-2">
        --- Nếu tên giảng viên nợ đã có trên danh sách nợ ở trên thì chỉ ấn nút
        Chỉnh sửa, chứ không được thêm mới
      </label>
      <form onSubmit={handleAddMoreDebtLecturer}>
        <div className="flex flex-col gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Tên giảng viên nợ
          </label>
          {/* để lấy ID */}
          <div className="w-64">
            <select
              value={selectedGiangVienID}
              onChange={handleDropdownChange}
              className="block w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Chọn giảng viên</option>
              {danhSachGiangVien.map((giangVien) => (
                <option key={giangVien.UserID} value={giangVien.UserID}>
                  {giangVien.FullName}
                </option>
              ))}
            </select>
          </div>
          <label className="block text-sm font-medium text-gray-700">
            Tổng số tiền nợ
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={debtAmount}
            onChange={handleDebtAmountChange}
          />
          <label className="block text-sm font-medium text-gray-700">
            Số tiền đã trả
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={amountPaid}
            onChange={handleAmountPaidChange}
          />
          <label className="block text-sm font-medium text-gray-700">
            Phương thức trả
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          />
          <label className="block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
            value={status}
            onChange={handleStatusChange}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thêm mới nợ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDebtStaff;
