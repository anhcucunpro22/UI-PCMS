import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faCaretDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../custom.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const AdminMenu = () => {
  // dẫn tới trang login từ chưa đăng nhập
  const navigate = useNavigate();
  const handleMovetoLogin = () => {
    navigate("/login");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenDropdownNhanSu, setIsOpenDropdownNhanSu] = useState(false);
  const [isOpenDropdownVatTu, setIsOpenDropdownVatTu] = useState(false);
  const [isOpenDropdownDonHang, setIsOpenDropdownDonHang] = useState(false);
  const [isOpenDropdownQuanLyDichVu, setIsOpenDropdownQuanLyDichVu] =
    useState(false);

  const handleMovetoLogout = () => {
    // localStorage.clear();
    // for (let i = 0; i < localStorage.length; i++) {
    //   if (localStorage.key(i) !== "fileUpload") {
    //     localStorage.removeItem(localStorage.key(i));
    //   }
    // }
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedInUserInfo");
    localStorage.removeItem("facilityID");
    localStorage.removeItem("currentUser");

    window.location.href = "/logout";
  };

  useEffect(() => {
    // Check if the user is logged in, e.g., by checking the presence of a JWT token in localStorage
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
    }
    console.log(isLoggedIn);
  }, []);

  //   Lấy user ID
  const getLoggingInUserInfo =
    JSON.parse(localStorage.getItem("loggedInUserInfo")) || null;
  const getUsername = getLoggingInUserInfo
    ? getLoggingInUserInfo.UserName
    : null;

  return (
    <div className="bg-white flex flex-col justify-center sm:py-0 z-10">
      <div className="w-full w-screen mx-auto flex bg-white shadow-lg p-4">
        <nav className="space-y-4 flex w-full">
          <div
            className="flex mt-2 text-4xl px-4 cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <div className="mr-2 text-blue-500">
              <FontAwesomeIcon icon={faPrint} />
            </div>
            <p className="font-bold font-serif">DTU</p>
          </div>

          <a className="ml-2 translate-y-[4px] font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300">
            Chào mừng quản trị viên {getUsername}
          </a>

          <a
            className="ml-2 font-semibold translate-y-[4px] px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/personalInformation";
            }}
          >
            Thông tin cá nhân
          </a>

          <div className="translate-y-[-12px]">
            <button
              type="button"
              className="inline-flex mt-2 justify-center items-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 focus:ring-blue-300"
              onClick={() => setIsOpenDropdownNhanSu(!isOpenDropdownNhanSu)}
            >
              Quản lý nhân sự
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-2 h-5 w-5 text-gray-700"
              />
            </button>

            {isOpenDropdownNhanSu && (
              <div className="absolute z-10 mt-2 bg-white">
                <button
                  type="button"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/userManagement")}
                >
                  Quản lý người dùng
                </button>
                <button
                  type="button"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/staffManagement")}
                >
                  Quản lý nhân viên
                </button>
              </div>
            )}
          </div>

          <div className="translate-y-[-12px] w-[200px]">
            <button
              type="button"
              className="inline-flex mt-2 justify-center items-center w-full px-4 py-2  text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 focus:ring-blue-300"
              onClick={() => setIsOpenDropdownDonHang(!isOpenDropdownDonHang)}
            >
              Quản lý đơn hàng
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-2 h-5 w-5 text-gray-700"
              />
            </button>

            {isOpenDropdownDonHang && (
              <div className="absolute z-10 mt-2 bg-white">
                <button
                  type="button"
                  className="block px-6 w-[197px] py-2  text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/seeOrders")}
                >
                  Thống kê đơn hàng
                </button>
                <button
                  type="button"
                  className="block px-6 w-[197px] py-2  text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "")}
                >
                  (ReceiptDetails)
                </button>
              </div>
            )}
          </div>

          <div className="translate-y-[-12px] w-[150px]">
            <button
              type="button"
              className="inline-flex mt-2 justify-center items-center w-full px-4 py-2  text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 focus:ring-blue-300"
              onClick={() => setIsOpenDropdownVatTu(!isOpenDropdownVatTu)}
            >
              Vật tư
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-2 h-5 w-5 text-gray-700"
              />
            </button>

            {isOpenDropdownVatTu && (
              <div className="absolute z-10 mt-2  w-[200px] bg-white">
                <button
                  type="button"
                  className="block px-4 py-2  text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/suppliers")}
                >
                  Nhà cung cấp
                </button>
                <button
                  type="button"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/printers")}
                >
                  Máy in
                </button>
                <button
                  type="button"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/seeMaterials")}
                >
                  Quản lý vật tư
                </button>
                <button
                  type="button"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() =>
                    (window.location.href = "/inventoryInManagementAdmin")
                  }
                >
                  Quản lý nhập kho
                </button>
                <button
                  type="button"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() =>
                    (window.location.href = "/inventoryOutManagementAdmin")
                  }
                >
                  Quản lý xuất kho
                </button>
              </div>
            )}
          </div>

          <a
            className="ml-2 translate-y-[4px] font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => (window.location.href = "/serviceAdminManagement")}
          >
            Quản lý dịch vụ
          </a>
        </nav>

        {isLoggedIn ? (
          <button
            onClick={handleMovetoLogout}
            className="mt-2 w-36 border-4 text-lg font-semibold border-blue-600 bg-white text-blue-600 px-0 py-1 rounded-sm hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            Đăng xuất
          </button>
        ) : (
          <button
            onClick={handleMovetoLogin}
            className="mt-2 w-36 border-4 text-lg font-semibold border-blue-600 bg-white text-blue-600 px-0 py-1 rounded-sm hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
