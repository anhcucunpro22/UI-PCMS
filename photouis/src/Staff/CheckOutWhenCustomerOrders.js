import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import InvoiceCustomerCheckIn from "./InvoiceCustomerCheckIn";

export default function CheckOutWhenCustomerOrders({
  onClose,
  serviceIDLayVao,
  soLuongBoLayVao,
  ghiChuLayVao,
  CustomerNameLayVao,
}) {
  const storedToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = storedToken ? storedToken.AccessToken : null;
  console.log(accessToken);

  // overall user info
  const overallUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  // để làm hóa đơn in sau
  // lấy customer name từ ô input
  // const [customerName, setCustomerName] = useState("");
  // lấy tên nhân viên từ localstorage
  const nhanVienInfoLocalStorage = JSON.parse(
    localStorage.getItem("loggedInUserInfo")
  );
  const tenNhanVienPhucVu = nhanVienInfoLocalStorage
    ? nhanVienInfoLocalStorage.FullName
    : null;
  console.log(tenNhanVienPhucVu);

  // số hóa đơn
  const [receiptNumber, setReceiptNumber] = useState("");
  //tiền khách cọc/đưa
  const [deposit, setDeposit] = useState("");
  // số lượng bộ
  const [soLuongBo, setSoLuongBo] = useState("");
  //số lượng
  const [quantity, setQuantity] = useState(0);
  // phần trăm giảm giá
  const [discountPercentage, setDiscountPercentage] = useState(0);
  // phần trăm thuế
  const [taxPercentage, setTaxPercentage] = useState(0);
  // ghi chú thêm
  const [notes, setNotes] = useState("");

  // const handleCustomerNameChange = (e) => {
  //   console.log("Tên khách: ", e.target.value);
  //   setCustomerName(e.target.value);
  // };
  // số hóa đơn
  const handleReceiptNumberChange = (e) => {
    console.log("Số hóa đơn: ", e.target.value);
    setReceiptNumber(e.target.value);
  };
  //tiền khách cọc/đưa
  const handleDepositChange = (e) => {
    console.log("Tiền khách đưa trước: ", e.target.value);
    setDeposit(e.target.value);
  };
  //số lượng
  const handleQuantityChange = (e) => {
    console.log("Số lượng tài liệu: ", e.target.value);
    setQuantity(e.target.value);
  };
  // phần trăm giảm giá
  const handleDiscountPercentageChange = (e) => {
    console.log("Phần trăm giảm giá: ", e.target.value);
    setDiscountPercentage(e.target.value);
  };
  // phần trăm thuế
  const handleTaxPercentageChange = (e) => {
    console.log("Phần trăm thuế: ", e.target.value);
    setTaxPercentage(e.target.value);
  };
  const handleNotesChange = (e) => {
    console.log("Ghi chú thêm: ", e.target.value);
    setNotes(e.target.value);
  };
  // số lượng bộ handle change
  const handleSoLuongBoChange = (e) => {
    console.log("Số lượng bộ: ", e.target.value);
    setSoLuongBo(e.target.value);
  };

  // state và handle changes cho khối dropdown
  const [choosenServiceGroup, setChoosenServiceGroup] = useState(null);
  const handleChoosenServiceGroupChange = (e) => {
    console.log("ServiceGroup has been choosen: ", e.target.value);
    setChoosenServiceGroup(e.target.value);
  };
  const [choosenService, setChoosenService] = useState(null);
  // lấy giá tiền cho mỗi tài liệu dựa theo loại giấy
  const [priceForEach, setPriceForEach] = useState(0);
  const handleChoosenServiceChange = (e) => {
    const dichVuLayDuoc = e.target.value;
    const confirm = dichVuLayDuoc ? dichVuLayDuoc : null;

    // stringify hóa
    const stringifyHoa = JSON.parse(confirm);

    setTimeout(() => {
      console.log(
        "Dịch vụ đã chọn để lưu vào fetch method post: ",
        confirm ? Array(stringifyHoa)[0].Price : null
      );
      setPriceForEach(Array(stringifyHoa)[0].Price);
      console.log(
        "ServiceID để gắn vào link: ",
        confirm ? Array(stringifyHoa)[0].ServiceID : null
      );
      setChoosenService(Array(stringifyHoa)[0].ServiceID);
    }, 1000);
  };

  // fetch dropdown đầu tiên để chọn
  const [serviceGrp, setSerViceGrp] = useState([]);
  const fetchServiceGroup = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch("https://localhost:7038/api/ServiceGroup", {
      headers,
    });
    const servGrp = await response.json();
    console.log(servGrp);
    setSerViceGrp(servGrp);
  };
  // fetch dropdown thứ 2
  useEffect(() => {
    // fetch serviceGroup để thằng khách hắn chọn mục dropdown đầu tiên
    fetchServiceGroup();
  }, []);

  //xử lý nội dung dropdown thứ 2 sau khi chọn cái thứ nhất
  // khai biến để chứa dữ liệu cho dropdown thứ 2
  const [services, setSerVices] = useState([]);
  useEffect(() => {
    const fetchServiceByServiceGroupID = async () => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `https://localhost:7038/api/Services/${serviceIDLayVao}`,
        {
          headers,
        }
      );
      const services = await response.json();
      console.log("Thông tin dịch vụ đã fetch: ", services);
      setSerVices(services);
    };
    fetchServiceByServiceGroupID();
  }, []);

  // lấy danh sách máy in dựa trên facilityID của staff đang đăng nhập (đã đc admin phân
  // cơ sở) lấy từ localstorage
  const getFacilityID = JSON.parse(localStorage.getItem("facilityID"));
  const confirmGetFacilityID = getFacilityID ? getFacilityID : null;
  const [printersList, setPrintersList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7038/api/Photocopier/Getbyfacilities?FacilityID=${confirmGetFacilityID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setPrintersList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // chọn từng máy in đơn độc
  const [choosenPrinterID, setChoosenPrinterID] = useState("");
  const handleChoosenPrinterChange = (e) => {
    console.log("máy in đã chọn: ", e.target.value);
    setChoosenPrinterID(e.target.value);
  };

  // cho submit
  const [chonTenGiangVien, setChonTenGiangVien] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        // `https://localhost:7038/api/Receipts?photocopierID=${choosenPrinterID}&serviceID=${choosenService}`,
        `https://localhost:7038/api/ReceiptDetail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            // userID: selectedGiangVienID,
            // receiptDate: new Date().toLocaleDateString(),
            // receiptNumber: 0,
            // amountReceived: priceForEach * quantity * soLuongBo,
            // percentageDiscount: discountPercentage,
            // discountAmount: 0,
            // depositPayment: deposit,
            // percentageTax: taxPercentage,
            // taxAmount: 0,
            // totalAmount: 0,
            // createdBy: tenNhanVienPhucVu,
            // createdDate: new Date().toLocaleDateString(),
            // modifiedDate: new Date().toLocaleDateString(),
            // description: notes,

            receiptID: 0,
            serviceID: serviceIDLayVao,
            photocopierID: choosenPrinterID,
            quantity: quantity,
            quantitySets: soLuongBoLayVao,
            percentageDiscount: discountPercentage,
            discountAmount: 0,
            depositPayment:
              services.Price * quantity * soLuongBoLayVao +
              (services.Price * taxPercentage) / 100 -
              (services.Price * discountPercentage) / 100,
            percentageTax: 10,
            taxAmount: 0,
            finalPrice: 0,
            createdBy: tenNhanVienPhucVu,
            createdDate: new Date().toLocaleDateString(),
            modifiedDate: new Date().toLocaleDateString(),
            description: ghiChuLayVao,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      localStorage.setItem("layHoaDonKhiCoKhach", JSON.stringify(result));
      alert(result.message);

      setChonTenGiangVien(!chonTenGiangVien);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // open/close modal
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [giangVien, setGiangVien] = useState([]);
  const [selectedGiangVienID, setSelectedGiangVienID] = useState(null);
  const [customerIDRetrieved, setCustomerIDRetrieved] = useState("");
  const handleSelectedGiangVienIDChange = (event) => {
    console.log("selected user giảng viên ID: ", event.target.value);
    setSelectedGiangVienID(event.target.value);
  };
  useEffect(() => {
    const fetchGiangVien = async () => {
      const result = await axios.get(
        "https://localhost:7038/api/Authen/getCustomerUsers",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      setGiangVien(result.data);
    };
    fetchGiangVien();

    const fetchCustomerName = async () => {
      const result = await axios.get(
        `https://localhost:7038/api/Users/search?name=${CustomerNameLayVao}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      console.log("Customer infor with name: ", result.data);
      setCustomerIDRetrieved(result.data);
    };
    fetchCustomerName();
  }, []);

  const [showInvoiceButton, setShowInvoiceButton] = useState(false);
  const luuThongTinGiangVienMua = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.put(
        `https://localhost:7038/api/Receipts/${confirmLayHoaDonTuLS.data.ReceiptID}`,
        {
          userID: customerIDRetrieved[0].UserID,
        },
        { headers }
      );
      console.log("Sau khi put ID giảng viên: ", response.data);

      localStorage.setItem(
        "selectedGiangVienMua",
        JSON.stringify(response.data.UserID)
      );

      alert("Đã nhập thành công tên giảng viên vào hóa đơn");
      setShowInvoiceButton(!showInvoiceButton);
    } catch (error) {
      console.error(error);
    }
  };

  // xuất hóa đơn
  const [hoaDon, setHoaDon] = useState("");
  const layHoaDonTuLS = JSON.parse(localStorage.getItem("layHoaDonKhiCoKhach"));
  const confirmLayHoaDonTuLS = layHoaDonTuLS ? layHoaDonTuLS : null;
  const xuatHoaDon = async () => {
    const result = await axios.get(
      `https://localhost:7038/api/ReceiptDetail/${confirmLayHoaDonTuLS.data.ReceiptDetailID}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setShowModalInvoice(!showModalInvoice);
    console.log("Hóa đơn gồm: ", result.data);
    localStorage.removeItem("yeuCauInTaiLieu");

    setHoaDon(result.data);
  };
  const [customerName, setCustomerName] = useState("");
  useEffect(() => {
    if (confirmLayHoaDonTuLS) {
      xuatHoaDon();

      const layCustomerName = JSON.parse(
        localStorage.getItem("selectedGiangVienMua")
      );
      const layTenCustomer = async () => {
        const result = await axios.get(
          `https://localhost:7038/api/Users/${layCustomerName}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        console.log("Thông tin customer name: ", result.data.FullName);
        setCustomerName(result.data.FullName);
      };

      layTenCustomer();
    }
  }, []);

  return (
    <div className="flex items-end justify-center pt-2 px-1 pb-20 text-center sm:block sm:p-0">
      <div
        className="fixed inset-0 mt-[-150px]  bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="p-4">
          <div className="flex">
            <h2 className="text-2xl font-bold font-mono my-2">
              Tính tiền cho khách đặt hàng
            </h2>

            <FontAwesomeIcon
              icon={faTimes}
              className=" transform translate-x-[87px] mt-[9px] text-3xl cursor-pointer"
              onClick={onClose}
            />
          </div>

          <div className="flex flex-col gap-4">
            {/* 2 khối dropdown */}
            <div className="flex gap-4">
              {/* dropdown thứ 2 */}
              <div>
                <div className="relative">
                  <label className="block text-sm mb-3 font-medium text-gray-700">
                    Dịch vụ
                  </label>
                  <input
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={services.ServiceName}
                    disabled
                  />
                </div>
              </div>

              {services.length > 0 && choosenService && (
                <div className="relative">
                  <label className="block text-sm mb-3 font-medium text-gray-700">
                    Giá tiền cho 1 trang giấy:
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
                    value={priceForEach + " đ"}
                    name="customerName"
                    disabled
                  />
                </div>
              )}
            </div>

            {/* chọn máy in phục vụ */}
            <div className="flex gap-4">
              <div className="relative">
                <label className="block text-sm mb-3 font-medium text-gray-700">
                  Chọn máy in phục vụ
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={choosenPrinterID}
                  onChange={(e) => handleChoosenPrinterChange(e)}
                >
                  <option value="">- Chọn máy in -</option>
                  {printersList &&
                    printersList.map((printer) => (
                      <option
                        key={printer.PhotocopierID}
                        value={printer.PhotocopierID}
                      >
                        {printer.PhotocopierName}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none mt-8 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700">
              Số trang
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={quantity}
              onChange={(e) => handleQuantityChange(e)}
              name="quantity"
            />

            <label className="block text-sm font-medium text-gray-700">
              Số lượng bộ tài liệu
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={soLuongBoLayVao}
              name="quantity"
              disabled
            />

            {/* 
        <label className="block text-sm font-medium text-gray-700">
          Tiền khách đưa (nên là:{" "}
          {priceForEach * quantity * soLuongBo +
            (priceForEach * taxPercentage) / 100 -
            (priceForEach * discountPercentage) / 100}
          đ)
        </label>
        <input
          type="text"
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
          value={deposit}
          onChange={(e) => handleDepositChange(e)}
          name="deposit"
        /> */}

            <label className="block text-sm font-medium text-gray-700">
              Phần trăm giảm giá
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={discountPercentage}
              onChange={(e) => handleDiscountPercentageChange(e)}
              name="discountPercentage"
            />
            <label className="block text-sm font-medium text-gray-700">
              Phần trăm thuế
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={taxPercentage}
              onChange={(e) => handleTaxPercentageChange(e)}
              name="taxPercentage"
            />

            <label className="block text-sm font-medium text-gray-700">
              Tiền khách thanh toán (Tổng cộng hóa đơn:{" "}
              {services.Price * quantity * soLuongBoLayVao +
                (services.Price * taxPercentage) / 100 -
                (services.Price * discountPercentage) / 100}
              đ)
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={
                services.Price * quantity * soLuongBoLayVao +
                (services.Price * taxPercentage) / 100 -
                (services.Price * discountPercentage) / 100
              }
              name="deposit"
            />

            <label className="block text-sm font-medium text-gray-700">
              Ghi chú thêm
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={ghiChuLayVao}
              name="notes"
              disabled
            />

            <button
              class="bg-blue-600 text-white font-mono py-2 px-4 w-full rounded"
              onClick={handleSubmit}
            >
              Hoàn thành
            </button>

            {chonTenGiangVien && (
              <div>
                {/* <label
                  htmlFor="teacher"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chọn tên giảng viên mua tài liệu
                </label>
                <select
                  id="teacher"
                  name="teacher"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedGiangVienID}
                  onChange={handleSelectedGiangVienIDChange}
                >
                  {giangVien.map((teacher) => (
                    <option key={teacher.UserID} value={teacher.UserID}>
                      {teacher.FullName}
                    </option>
                  ))}
                </select> */}

                <button
                  className="bg-blue-600 text-white font-mono py-2 my-3 px-4 w-full rounded"
                  onClick={luuThongTinGiangVienMua}
                >
                  Lưu thông tin giảng viên mua tài liệu
                </button>
              </div>
            )}
          </div>

          {showInvoiceButton && (
            <button
              className="bg-yellow-500 text-white font-mono py-2 my-3 px-4 w-full rounded"
              onClick={xuatHoaDon}
            >
              Xuất ra hóa đơn
            </button>
          )}
          {showModalInvoice && chonTenGiangVien && (
            <InvoiceCustomerCheckIn
              ReceiptDeID={hoaDon.ReceiptDeID}
              ServiceName={hoaDon.Service.ServiceName}
              Dvt={hoaDon.Service.Dvt}
              ReceiptNumber={hoaDon.Receipt.ReceiptNumber}
              CustomerName={CustomerNameLayVao}
              PhotocopierName={hoaDon.Photocopier.PhotocopierName}
              Location={hoaDon.Photocopier.Location}
              Quantity={hoaDon.Quantity}
              QuantitySets={hoaDon.QuantitySets}
              PercentageDiscount={hoaDon.PercentageDiscount}
              DiscountAmount={hoaDon.DiscountAmount}
              DepositPayment={hoaDon.DepositPayment}
              PercentageTax={hoaDon.PercentageTax}
              TaxAmount={hoaDon.TaxAmount}
              FinalPrice={hoaDon.FinalPrice}
              CreatedBy={hoaDon.CreatedBy}
              CreatedDate={new Date(hoaDon.CreatedDate).toLocaleDateString(
                "vi-VN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
