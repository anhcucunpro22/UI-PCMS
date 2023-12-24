import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import AddDebtStaff from "./addDebtStaffSubComponent/AddDebtStaff";
import UpdateDebt from "./UpdateDebt";

const DebtManagementStaff = () => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  const [reloadTheFetch, setReloadTheFetch] = useState(false);
  console.log(accessToken);

  const [data, setData] = useState([]);
  // modal thêm mới công nợ giảng viên
  const [isOpen, setIsOpen] = useState(false);
  // modal cập nhật công nợ giảng viên
  const [isOpenUpdateDebt, setIsOpenUpdateDebt] = useState(false);
  const handleSetIsOpenUpdateDebtToggle = () => {
    setIsOpenUpdateDebt(!isOpenUpdateDebt);
  };

  // đưa toàn bộ thông tin nợ của khách với ID nào đó vào form modal Update Debt
  const [updateDebt, setUpdateDebt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:7038/api/Debt", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("công nợ: ", result.data);
      setData(result.data);
    };
    fetchData();
  }, [reloadTheFetch]);

  // xử lý modal thêm công nợ
  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdateCongNo = (debt) => {
    const getDebt = JSON.parse(debt);
    const confirmDebt = getDebt ? getDebt : null;
    console.log(confirmDebt);

    // set để truyền thông tin nợ của giảng viên vào một biến để truyền qua form update
    setUpdateDebt(confirmDebt);
    setIsOpenUpdateDebt(!isOpenUpdateDebt);
  };

  const handleDeleteCongNo = async (debt) => {
    const getDebt = JSON.parse(debt);
    const confirmDebt = getDebt ? getDebt : null;
    console.log(confirmDebt.DebtID);

    if (window.confirm("Bạn có chắc là muốn xóa công nợ này?")) {
      try {
        const response = await axios.delete(
          `https://localhost:7038/api/Debt/${confirmDebt.DebtID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // If the delete is successful, show the system message in a prompt alert
        alert(response.data);
        setReloadTheFetch(!reloadTheFetch);
      } catch (error) {
        // Handle any errors here
        console.error("Error deleting the debt", error);
      }
    }
  };

  const [tongSoLuongNo, setTongSoLuongNo] = useState(0);
  const [tongNoFullTime, setTongNoFullTime] = useState(0);
  useEffect(() => {
    setTongSoLuongNo(data.length);
    setTongNoFullTime(
      data.reduce((total, debt) => total + debt.RemainingAmount, 0)
    );
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono mt-2 mb-3">
        Quản lý công nợ
      </h2>
      <table className="table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID nợ</th>
            <th className="px-4 py-2">ID người dùng</th>
            <th className="px-4 py-2">Tên khách hàng nợ</th>
            <th className="px-4 py-2">Ngày tạo công nợ</th>
            <th className="px-4 py-2">Tình trạng</th>
            <th className="px-4 py-2">Ngày hạn trả</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Địa chỉ</th>
            <th className="px-4 py-2">Số điện thoại</th>
            <th className="px-4 py-2">Mã giảng viên</th>
            <th className="px-4 py-2">Số tiền nợ</th>
            <th className="px-4 py-2">Tiền đã trả</th>
            <th className="px-4 py-2 text-green-500">Tiền còn lại</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((debt) => (
            <tr key={debt.DebtID} className="border border-gray-200">
              <td className="px-4 py-2">{debt.DebtID}</td>
              <td className="px-4 py-2">{debt.UserID}</td>
              <td className="px-4 py-2">{debt.User.FullName}</td>
              <td className="px-4 py-2">
                {new Date(debt.InvoiceDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-2">{debt.Status}</td>
              <td className="px-4 py-2">
                {new Date(debt.DueDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-2">{debt.User.Email}</td>
              <td className="px-4 py-2">{debt.User.Address}</td>
              <td className="px-4 py-2">{debt.User.Phone}</td>
              <td className="px-4 py-2">{debt.User.CodeUser}</td>
              <td className="px-4 py-2">{debt.DebtAmount} đ</td>
              <td className="px-4 py-2">{debt.AmountPaid} đ</td>
              <td className="px-4 py-2">{debt.RemainingAmount} đ</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleUpdateCongNo(JSON.stringify(debt))}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteCongNo(JSON.stringify(debt))}
                  className="text-gray-800 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-800">
          Tổng số tiền các giảng viên đang nợ:
          <span className="ml-2 text-green-500 text-xl font-bold">
            {tongNoFullTime} đ
          </span>
        </p>

        <p className="text-lg font-semibold text-gray-800">
          Tổng ghi nhận công nợ:
          <span className="ml-2 text-gray-800 text-xl font-bold">
            {tongSoLuongNo} công nợ
          </span>
        </p>
      </div>

      {isOpenUpdateDebt && (
        <div className="">
          <UpdateDebt
            debtInfoOfLecturer={updateDebt}
            handleSetIsOpenUpdateDebtToggle={handleSetIsOpenUpdateDebtToggle}
          />
        </div>
      )}

      <div className="flex">
        <button
          onClick={handleToggleModal}
          className="mt-4 bg-blue-600 text-white px-0.9 py-0.6 rounded-md transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faPlusSquare} className="fa-3x" />
        </button>

        <span className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-opacity duration-300">
          Thêm mới nợ
        </span>
      </div>

      {isOpen && (
        <div className="">
          <AddDebtStaff />
        </div>
      )}
    </div>
  );
};

export default DebtManagementStaff;
