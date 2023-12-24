import React, { useEffect, useState } from "react";
import "../custom.css";
import {
  faUser,
  faLock,
  faSignInAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGender, setSelectedGender] = useState("1");
  const [codeUser, setCodeUser] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [codeUserFocus, setCodeUserFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isOpenDropdownSchools, setIsOpenDropdownSchools] = useState(false);
  const [isOpenDropdownKhoas, setIsOpenDropdownKhoas] = useState(false);

  // uncomment khi cần, nhưng chắc không bao giờ cần ở đây
  // const accessToken = JSON.parse(localStorage.getItem("jwt")).AccessToken;
  // console.log(accessToken);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e) => {
    console.log(e.target.value);
    setSelectedGender(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCodeUserChange = (e) => {
    console.log(e.target.value);
    setCodeUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };

  const handleNameFocus = () => {
    setNameFocus(true);
  };

  const handleCodeUserFocus = () => {
    setCodeUserFocus(true);
  };

  const handleEmailFocus = () => {
    setEmailFocus(true);
  };

  const handleUsernameFocus = () => {
    setUsernameFocus(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handleAddressFocus = () => {
    setAddressFocus(true);
  };

  const handlePhoneFocus = () => {
    setPhoneFocus(true);
  };

  const handleNameBlur = () => {
    setNameFocus(false);
  };

  const handleEmailBlur = () => {
    setEmailFocus(false);
  };

  const handleUsernameBlur = () => {
    setUsernameFocus(false);
  };

  const handleAddressBlur = () => {
    setAddressFocus(false);
  };

  const handlePhoneBlur = () => {
    setPhoneFocus(false);
  };

  const handleCodeUserBlur = () => {
    setCodeUserFocus(false);
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
  };

  // lấy danh sách cơ sở từ hệ thống và lưu vào đây
  const [getFacilities, setGetFacilities] = useState([]);
  // for dropdown cơ sở
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // đây chính là cái tên cơ sở sẽ được lưu vào link
  const [selectedDropdownFacility, setSelectedDropdownFacility] = useState("");

  // đây chính là cái tên trường sẽ được lưu vào link post
  const [selectedDropdownSchool, setSelectedDropdownSchool] = useState("");

  // đây chính là cái tên khoa sẽ được lưu vào link post
  const [selectedDropdownKhoa, setSelectedDropdownKhoa] = useState("");

  function handleChoosenFacility(option) {
    console.log(option);
    setSelectedDropdownFacility(option);
    setIsOpenDropdown(false);
  }

  function handleChoosenSchool(option) {
    console.log(option);
    setSelectedDropdownSchool(option);
    setIsOpenDropdownSchools(false);
  }

  function handleChoosenKhoa(option) {
    console.log(option);
    setSelectedDropdownKhoa(option);
    setIsOpenDropdownKhoas(false);
  }

  // lấy danh sách cơ sở từ server
  const facilitiesFetch = async () => {
    const response = await fetch("https://localhost:7038/api/Facilities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    setGetFacilities(data);
  };

  // lấy danh sách trường từ server
  const [getSchools, setGetSchools] = useState([]);
  const schoolsFetch = async () => {
    const response = await fetch("https://localhost:7038/api/Schools", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const schools = await response.json();
    console.log(schools);
    setGetSchools(schools);
  };

  // lấy danh sách khoa từ server
  const [getKhoas, setGetKhoas] = useState([]);
  const khoasFetch = async () => {
    const response = await fetch(" https://localhost:7038/api/Organizations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const khoas = await response.json();
    console.log(khoas);
    setGetKhoas(khoas);
  };

  useEffect(() => {
    schoolsFetch();
    khoasFetch();
    facilitiesFetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://localhost:7038/api/Authen/register?facilityName=${selectedDropdownFacility}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: name,
        userName: username,
        email: email,
        password: password,
        address: address,
        phone: phone,
        codeUser: codeUser,
        gender: selectedGender,
        organizationID: selectedDropdownKhoa,
        isactive: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        alert("Đăng ký thành công, đang tới trang đăng nhập");
        window.location.href = "/login";
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };

  const movetoLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light-blue mb-96">
      <div className="w-[720px] p-8 bg-white shadow-2xl rounded-lg">
        <div className="text-center mb-8">
          <FontAwesomeIcon icon={faUser} size="4x" className="text-blue-300" />
        </div>
        <form className="w-full flex space-x-18" onSubmit={handleSubmit}>
          <div className="w-1/2">
            <div className="mb-4 w-full">
              <label htmlFor="name" className="block text-gray-700">
                Họ & Tên
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                onFocus={handleNameFocus}
                onBlur={handleNameBlur}
                color="blue-gray"
                size="lg"
                className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                  nameFocus ? "focused-input" : ""
                }`}
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                color="blue-gray"
                size="lg"
                className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                  emailFocus ? "focused-input" : ""
                }`}
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                onFocus={handleUsernameFocus}
                onBlur={handleUsernameBlur}
                color="blue-gray"
                size="lg"
                className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                  usernameFocus ? "focused-input" : ""
                }`}
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
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                color="blue-gray"
                size="lg"
                className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                  passwordFocus ? "focused-input" : ""
                }`}
              />
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="password" className="block text-gray-700">
                Giới tính
              </label>

              <div className="flex items-center space-x-4">
                <label
                  htmlFor="male"
                  className="flex items-center space-x-2 cursor-pointer mt-2"
                >
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="1"
                    checked={selectedGender === "1"}
                    onChange={handleGenderChange}
                    className="appearance-none border border-gray-300 rounded-full w-3 h-3 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                  />
                  <span className="block text-gray-700">Nam</span>
                </label>
                <label
                  htmlFor="female"
                  className="flex items-center space-x-2 cursor-pointer mt-2"
                >
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="0"
                    checked={selectedGender === "0"}
                    onChange={handleGenderChange}
                    className="appearance-none border border-gray-300 rounded-full w-3 h-3 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                  />
                  <span className="block text-gray-700">Nữ</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 w-full">
              <label htmlFor="address" className="block text-gray-700">
                Địa chỉ
              </label>
              <input
                type="address"
                id="address"
                value={address}
                onChange={handleAddressChange}
                onFocus={handleAddressFocus}
                onBlur={handleAddressBlur}
                color="blue-gray"
                size="lg"
                className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                  addressFocus ? "focused-input" : ""
                }`}
              />
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="phone" className="block text-gray-700">
                Số điện thoại
              </label>
              <input
                type="phone"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onBlur={handlePhoneBlur}
                color="blue-gray"
                size="lg"
                className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                  phoneFocus ? "focused-input" : ""
                }`}
              />
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="codeUser" className="block text-gray-700">
                Mã giảng viên/học viên
              </label>
              <input
                type="codeUser"
                id="codeUser"
                value={codeUser}
                onChange={handleCodeUserChange}
                onFocus={handleCodeUserFocus}
                onBlur={handleCodeUserBlur}
                color="blue-gray"
                size="lg"
                className={`w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-300 p-2 ${
                  codeUserFocus ? "focused-input" : ""
                }`}
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Chọn cơ sở
              </label>

              <button
                type="button"
                className="inline-flex mt-2 border-b-2 border-gray-300 justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              >
                {selectedDropdownFacility || "Chọn một cơ sở"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ml-2 h-5 w-5 text-gray-500"
                />
              </button>
              {isOpenDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white shadow-lg">
                  {getFacilities.map((option) => (
                    <button
                      key={option.FacilityID}
                      type="button"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => handleChoosenFacility(option.FacilityName)}
                    >
                      {option.FacilityName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative mb-4 flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="username" className="block text-gray-700">
                  Chọn trường
                </label>

                <button
                  type="button"
                  className="inline-flex mt-2 border-b-2 border-gray-300 justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                  onClick={() =>
                    setIsOpenDropdownSchools(!isOpenDropdownSchools)
                  }
                >
                  {selectedDropdownSchool || "Chọn trường"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 h-5 w-5 text-gray-500"
                  />
                </button>
                {isOpenDropdownSchools && (
                  <div className="absolute z-10 w-full mt-2 bg-white shadow-lg">
                    {getSchools.map((option) => (
                      <button
                        key={option.SchoolID}
                        type="button"
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => handleChoosenSchool(option.SchoolName)}
                      >
                        {option.SchoolName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="username" className="block text-gray-700">
                  Chọn khoa
                </label>

                <button
                  type="button"
                  className="inline-flex mt-2 border-b-2 border-gray-300 justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                  onClick={() => setIsOpenDropdownKhoas(!isOpenDropdownKhoas)}
                >
                  {selectedDropdownKhoa || "Chọn khoa"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 h-5 w-5 text-gray-500"
                  />
                </button>
                {isOpenDropdownKhoas && (
                  <div className="absolute z-10 w-full mt-2 bg-white shadow-lg">
                    {getKhoas.map((option) => (
                      <button
                        key={option.OrganizationID}
                        type="button"
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => handleChoosenKhoa(option.OrganizationID)}
                      >
                        {option.OrganizationName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              color="blue"
              size="lg"
              ripple="light"
              className="w-full translate-x-[-160px] bg-blue-300 text-white p-2 rounded-md border hover:bg-blue-500 border-blue-300"
            >
              Đăng ký
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-5 cursor-pointer">
          <p className="text-sm underline" onClick={movetoLogin}>
            Đã có tài khoản? Đăng nhập.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
