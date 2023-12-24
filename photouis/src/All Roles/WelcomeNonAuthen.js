import React from "react";

const WelcomeNonAuthen = () => {
  return (
    <div className="p-4 text-center mt-40">
      <h1 className="text-5xl font-mono font-bold">
        In ấn giờ tiện lợi hơn bao giờ hết
      </h1>
      <button
        className="bg-blue-500  my-4 text-white px-4 py-2 hover:bg-blue-600"
        onClick={() => {
          window.location.href = "/signup";
        }}
      >
        Đăng ký tài khoản giảng viên
      </button>
      <p
        className="text-lg underline cursor-pointer"
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Đã có tài khoản? Đăng nhập.
      </p>
    </div>
  );
};

export default WelcomeNonAuthen;
