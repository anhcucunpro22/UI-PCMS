import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faCaretDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const UpdateDebt = ({
  isOpen,
  handleSetIsOpenUpdateDebtToggle,
  debtInfoOfLecturer,
}) => {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [status, setStatus] = useState("");
  const [isOpenDropdownPaymentMethod, setIsOpenDropdownPaymentMethod] =
    useState(false);
  const [isOpenDropdownNotes, setIsOpenDropdownNotes] = useState(false);

  // dữ liệu để method put
  const putData = {
    amountPaid: amountPaid,
    paymentMethod: paymentMethod,
    remainingAmount: 0,
    status: status,
    dueDate: new Date().toLocaleDateString(),
  };
  // nút click để update công nợ khi khách trả
  const updateDebt = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7038/api/Debt/debts/${debtInfoOfLecturer.DebtID}`,
        putData,
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );
      const updatedDebt = response.data;
      alert(updatedDebt);
    } catch (error) {
      console.error("Error updating debt", error);
    }
  };

  const handleAmountPaidChange = (e) => {
    console.log("Tiền khách trả lần này: ", e.target.value);

    console.log("Toàn bộ thông tin nợ của giảng viên: ", putData);
    setAmountPaid(e.target.value);
  };

  const handlePaymentMethodChange = (paymentMethod) => {
    // console.log("Phương thức thanh toán: ", e.target.value);

    // console.log("Toàn bộ thông tin nợ của giảng viên: ", putData);
    setIsOpenDropdownPaymentMethod(false);
    setPaymentMethod(paymentMethod);
  };

  const handleStatusChange = (notes) => {
    setIsOpenDropdownNotes(false);
    setStatus(notes);
  };

  return (
    <div className="flex items-end mt-[-460px] justify-center pt-2 px-1 pb-20 text-center sm:block sm:p-0">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form onSubmit={updateDebt}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Cập nhật nợ cho giảng viên: {debtInfoOfLecturer.User.FullName}
                </h3>

                <p className="text-black text-opacity-50 text-sm mt-1 mb-[-3px] font-bold">
                  -- ID nợ: {debtInfoOfLecturer.DebtID}
                </p>

                <div className="mt-2">
                  <div className="mb-4">
                    <label
                      htmlFor="amountPaid"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tiền khách trả lần này (nếu như khách nợ thêm thì đặt giá
                      trị âm):
                    </label>
                    <input
                      type="text"
                      name="amountPaid"
                      id="amountPaid"
                      className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
                      value={amountPaid}
                      onChange={handleAmountPaidChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="paymentMethod"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phương thức thanh toán:
                    </label>

                    <div className="translate-y-[0px] p-2 z-30 w-[420px]">
                      <label className="ml-3 mr-12">
                        <input
                          type="radio"
                          value="Tiền mặt"
                          checked={paymentMethod === "Tiền mặt"}
                          onChange={() => handlePaymentMethodChange("Tiền mặt")}
                          className={`radio-button mr-2 ${
                            paymentMethod === "Tiền mặt" ? "bg-blue-500" : ""
                          }`}
                        />
                        <span
                          className={`radio-button ${
                            paymentMethod === "Tiền mặt"
                              ? "selected bg-blue-500"
                              : ""
                          }`}
                        ></span>
                        Tiền mặt
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Ngân hàng"
                          checked={paymentMethod === "Ngân hàng"}
                          onChange={() =>
                            handlePaymentMethodChange("Ngân hàng")
                          }
                          className={`radio-button mr-2 ${
                            paymentMethod === "Ngân hàng" ? "bg-blue-500" : ""
                          }`}
                        />
                        <span
                          className={`radio-button ${
                            paymentMethod === "Ngân hàng"
                              ? "selected bg-blue-500"
                              : ""
                          }`}
                        ></span>
                        Ngân hàng
                      </label>
                    </div>

                    {/* <input
                      type="text"
                      name="paymentMethod"
                      id="paymentMethod"
                      className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                    /> */}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ghi chú thêm:
                    </label>
                    {/* <input
                      type="text"
                      name="status"
                      id="status"
                      className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
                      value={status}
                      onChange={handleStatusChange}
                    /> */}

                    <div className="translate-y-[0px] w-[420px]">
                      <button
                        type="button"
                        className="inline-flex bg-gray-200 text-gray-700 mt-2 justify-center items-center w-full px-4 py-2  text-base font-medium text-gray-700  hover:bg-gray-200 focus:outline-none  focus:ring-offset-2 focus:ring-blue-300"
                        onClick={() =>
                          setIsOpenDropdownNotes(!isOpenDropdownNotes)
                        }
                      >
                        {status ? (
                          <span>{status}</span>
                        ) : (
                          <span>Tình trạng</span>
                        )}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="ml-2 h-5 w-5 text-gray-700"
                        />
                      </button>

                      {isOpenDropdownNotes && (
                        <div className="absolute mt-2 bg-white">
                          <button
                            type="button"
                            className="block px-6 w-[420px] bg-gray-200 text-gray-700 py-2 text-base text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                            // onClick={() => setPaymentMethod("Tiền mặt")}
                            onClick={() => handleStatusChange("Đang chờ trả")}
                          >
                            Đang chờ trả
                          </button>
                          <button
                            type="button"
                            className="block px-6 w-[420px] py-2 bg-gray-100 text-gray-700 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => handleStatusChange("Đã trả")}
                          >
                            Đã trả
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cập nhật nợ
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSetIsOpenUpdateDebtToggle}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDebt;
