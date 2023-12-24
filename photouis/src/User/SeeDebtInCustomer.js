import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SeeDebtInCustomer() {
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

  const [debtData, setDebtData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7038/api/Debt/Getbycustomer?UserID=${confirmUserInfoGot.UserID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const getCongNoCaNhan = response.data;
        console.log(
          "Công nợ cá nhân của giảng viên đang đăng nhập: ",
          getCongNoCaNhan
        );
        setDebtData(getCongNoCaNhan);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const remainingAmountTotal = debtData
    ? debtData.reduce((total, debt) => total + debt.RemainingAmount, 0)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Thông tin nợ của giảng viên {confirmUserInfoGot.FullName}
        </h3>
        <p className="text-sm font-medium mb-4 text-gray-500 uppercase mb-2">
          Mã giảng viên: {confirmUserInfoGot.CodeUser}
        </p>

        {debtData ? (
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID nợ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo nợ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tình trạng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền nợ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiền đã trả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiền còn lại
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {debtData.map((debt) => (
                  <tr key={debt.DebtID}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {debt.DebtID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(debt.InvoiceDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {debt.Status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {debt.DebtAmount} đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {debt.AmountPaid} đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {debt.RemainingAmount} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-800">
                Tổng số tiền nợ còn lại:{" "}
                <span className="ml-2 text-green-500 text-xl font-bold">
                  {remainingAmountTotal} đ
                </span>
              </p>
            </div>

            {/* <p className="text-lg font-bold text-gray-800">
              Tổng số tiền nợ còn lại: {remainingAmountTotal} đ
            </p> */}
          </div>
        ) : (
          <p>Giảng viên không có nợ</p>
        )}
      </div>
    </div>
  );
}
