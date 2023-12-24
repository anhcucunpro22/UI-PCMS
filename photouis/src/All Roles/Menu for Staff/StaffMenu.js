import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faBell,
  faChevronDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../custom.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import TaiLieuGetTuLS from "../../Staff/TaiLieuGetTuLS";

const StaffMenu = () => {
  // dẫn tới trang login từ chưa đăng nhập
  const navigate = useNavigate();
  const handleMovetoLogin = () => {
    navigate("/login");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenDropdownKho, setIsOpenDropdownKho] = useState(false);
  const [isOpenShowTaiLieuGetTuLS, setIsOpenShowTaiLieuGetTuLS] =
    useState(false);

  const yeuCauInTaiLieu = JSON.parse(localStorage.getItem("yeuCauInTaiLieu"));
  const confirmYeuCauInTaiLieu = yeuCauInTaiLieu ? yeuCauInTaiLieu : null;

  const handleMovetoLogout = () => {
    // for (let i = 0; i < localStorage.length; i++) {
    //   if (localStorage.key(i) !== "fileUpload") {
    // localStorage.removeItem(localStorage.key(i));
    //   }
    // }
    // localStorage.clear();
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedInUserInfo");
    localStorage.removeItem("facilityID");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("layHoaDonKhiCoKhach");

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
  const getLoggingInUserInfo = JSON.parse(
    localStorage.getItem("loggedInUserInfo")
  );
  const getUsername = getLoggingInUserInfo
    ? getLoggingInUserInfo.UserName
    : null;

  return (
    <div className="bg-white flex flex-col justify-center sm:py-0">
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

          <a className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300">
            Chào mừng nhân viên {getUsername}
          </a>

          <a
            className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/personalInformation";
            }}
          >
            Thông tin cá nhân
          </a>

          <a
            className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/checkOutCashier";
            }}
          >
            Tạo đơn
          </a>

          <div className="translate-y-[-16px] w-[100px]">
            <button
              type="button"
              className="inline-flex mt-2 justify-center items-center w-full px-4 py-2  text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 focus:ring-blue-300"
              onClick={() => setIsOpenDropdownKho(!isOpenDropdownKho)}
            >
              Kho
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-2 h-5 w-5 text-gray-700"
              />
            </button>

            {isOpenDropdownKho && (
              <div className="absolute z-10 mt-2 bg-white">
                <button
                  type="button"
                  className="block px-6 w-[200px] py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/staffCheckTrongKho")}
                >
                  Xem vật tư trong kho
                </button>
                <button
                  type="button"
                  className="block px-6 w-[200px] py-2  text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/nhapKhoStaff")}
                >
                  Quản lý nhập kho
                </button>
                <button
                  type="button"
                  className="block px-6 w-[200px] py-2  text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => (window.location.href = "/xuatKhoStaff")}
                >
                  Quản lý xuất kho
                </button>
              </div>
            )}
          </div>

          <a
            className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/seeServices";
            }}
          >
            Xem giá dịch vụ
          </a>

          <a
            className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/debtManagement";
            }}
          >
            Quản lý công nợ
          </a>

          <a
            className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/userManagement";
            }}
          >
            Quản lý người dùng
          </a>

          <a
            className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/statisticsStaff";
            }}
          >
            Thống kê cá nhân
          </a>

          <a
            className="ml-2 font-semibold px-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/reportStaff";
            }}
          >
            Báo cáo hư hỏng
          </a>
        </nav>

        {isLoggedIn ? (
          <div className="flex">
            {confirmYeuCauInTaiLieu && (
              <div
                onClick={() =>
                  setIsOpenShowTaiLieuGetTuLS(!isOpenShowTaiLieuGetTuLS)
                }
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="transform translate-y-4 text-4xl cursor-pointer mr-[17px]"
                />
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-red-600 transform translate-y-[-26px] cursor-pointer ml-[20px]"
                />
              </div>
            )}

            <button
              onClick={handleMovetoLogout}
              className="mt-2 w-36 border-4 text-lg font-semibold border-blue-600 bg-white text-blue-600 px-0 py-1 rounded-sm hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <button
            onClick={handleMovetoLogin}
            className="mt-2 w-36 border-4 text-lg font-semibold border-blue-600 bg-white text-blue-600 px-0 py-1 rounded-sm hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            Đăng nhập
          </button>
        )}
      </div>

      {isOpenShowTaiLieuGetTuLS && <TaiLieuGetTuLS />}
    </div>
  );
};

export default StaffMenu;
