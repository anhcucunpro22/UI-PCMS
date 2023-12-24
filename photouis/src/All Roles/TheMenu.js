import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../custom.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const TheMenu = () => {
  // dẫn tới trang login từ chưa đăng nhập
  const navigate = useNavigate();
  const handleMovetoLogin = () => {
    navigate("/login");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMovetoLogout = () => {
    localStorage.clear();
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

export default TheMenu;
