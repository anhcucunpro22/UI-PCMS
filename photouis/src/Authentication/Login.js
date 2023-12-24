import React, { useState } from "react";
import "../custom.css";
import { faUser, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleUsernameChange = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleUsernameFocus = () => {
    setUsernameFocus(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocus(false);
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
  };

  const movetoSignUp = () => {
    window.location.href = "/signup";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://localhost:7038/api/Authen/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the JWT is in the response body
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", JSON.stringify(data));
        if (data.UserMessage === "Login Success") {
          alert("Đăng nhập thành công");
          window.location.href = "/homepage";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light-blue">
      <div className="w-96 p-8 bg-white shadow-2xl rounded-lg">
        <div className="text-center mb-8">
          <FontAwesomeIcon
            icon={faSignInAlt}
            size="4x"
            className="text-blue-300"
          />
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4 w-full">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                usernameFocus ? "focused-input" : ""
              }`}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                passwordFocus ? "focused-input" : ""
              }`}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-300 text-white p-2 rounded-md border border-blue-300"
          >
            Đăng nhập
          </button>
        </form>

        <div className="flex justify-center mt-5 cursor-pointer">
          <p className="text-lg underline" onClick={movetoSignUp}>
            Chưa có tài khoản? Đăng ký.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
