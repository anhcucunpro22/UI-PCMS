import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckOutWhenCustomerOrders from "./CheckOutWhenCustomerOrders";

const TaiLieuGetTuLS = () => {
  const storedToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = storedToken ? storedToken.AccessToken : null;
  console.log(accessToken);

  const getYeuCauInTaiLieuTuLS = JSON.parse(
    localStorage.getItem("yeuCauInTaiLieu")
  );
  const confirmGet = getYeuCauInTaiLieuTuLS ? getYeuCauInTaiLieuTuLS : null;

  const handleFileDownload = () => {
    fetch(`https://localhost:7038/DownloadFile?filename=${confirmGet.filePath}`)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${confirmGet.filePath}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  //   const [isVisible, setIsVisible] = useState(true);

  //   const onClose = () => {
  //     setIsVisible(false);
  //   };

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onOpen = () => {
    setIsOpenDialog(true);
  };

  const onClose = () => {
    setIsOpenDialog(false);
  };

  return (
    <div className="absolute ml-[80%] transform translate-y-[200px] p-4 bg-white shadow-md rounded-md max-w-md mx-auto mt-8">
      <div className="mb-4">
        <p className="text-lg font-semibold">Tên khách hàng</p>
        <p className="text-gray-600">{confirmGet.CustomerName}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">ID dịch vụ</p>
        <p className="text-gray-600">{confirmGet.ServiceID}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Tải file</p>
        <p
          className="text-gray-600 cursor-pointer underline"
          onClick={handleFileDownload}
        >
          Download
        </p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Ghi chú</p>
        <p className="text-gray-600">{confirmGet.notes}</p>
      </div>
      <div>
        <p className="text-lg font-semibold">Số lượng bộ tài liệu</p>
        <p className="text-gray-600">{confirmGet.soLuongBoTaiLieu} bộ</p>
      </div>

      <p
        className="text-gray-500 cursor-pointer text-center text-base font-bold"
        onClick={onOpen}
      >
        &gt;&gt; Tạo đơn &lt;&lt;
      </p>

      {isOpenDialog && (
        <div className="transform translate-x-[-1600px] z-50 mt-[500px] h-[1300px] w-screen">
          <CheckOutWhenCustomerOrders
            onClose={onClose}
            serviceIDLayVao={confirmGet.ServiceID}
            soLuongBoLayVao={confirmGet.soLuongBoTaiLieu}
            ghiChuLayVao={confirmGet.notes}
            CustomerNameLayVao={confirmGet.CustomerName}
          />
        </div>
      )}
    </div>
  );
};

export default TaiLieuGetTuLS;
