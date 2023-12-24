import React from "react";

const InvoiceCustomerCheckIn = ({
  ReceiptDeID,
  ServiceName,
  Dvt,
  PhotocopierName,
  ReceiptNumber,
  CustomerName,
  Quantity,
  QuantitySets,
  Location,
  PercentageDiscount,
  DiscountAmount,
  DepositPayment,
  PercentageTax,
  TaxAmount,
  FinalPrice,
  CreatedBy,
  CreatedDate,
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Hóa đơn in ấn</h1>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Số hóa đơn:</p>
        <p className="text-sm font-medium text-gray-700">{ReceiptNumber}</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Tên khách:</p>
        <p className="text-sm font-medium text-gray-700">{CustomerName}</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Dịch vụ:</p>
        <p className="text-sm font-medium text-gray-700">
          {ServiceName} - Số trang: {Quantity} {Dvt} - Số lượng bộ:{" "}
          {QuantitySets}
        </p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Máy in phục vụ:</p>
        <p className="text-sm font-medium text-gray-700">
          {PhotocopierName} - {Location}
        </p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Phần trăm giảm giá:</p>
        <p className="text-sm font-medium text-gray-700">
          {PercentageDiscount} %
        </p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Số tiền được giảm:</p>
        <p className="text-sm font-medium text-gray-700">{DiscountAmount} đ</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">VAT:</p>
        <p className="text-sm font-medium text-gray-700">{PercentageTax} %</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Tiền thuế:</p>
        <p className="text-sm font-medium text-gray-700">{TaxAmount} đ</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Tiền đã thanh toán:</p>
        <p className="text-sm font-medium text-gray-700">{DepositPayment} đ</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Thành tiền còn lại:</p>
        <p className="text-sm font-medium text-gray-700">{FinalPrice} đ</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Người tạo:</p>
        <p className="text-sm font-medium text-gray-700">{CreatedBy}</p>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Ngày xuất hóa đơn:</p>
        <p className="text-sm font-medium text-gray-700">{CreatedDate}</p>
      </div>
      <div className="pt-4">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          In hóa đơn
        </button>
      </div>
    </div>
  );
};

export default InvoiceCustomerCheckIn;
