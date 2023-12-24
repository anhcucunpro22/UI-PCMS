import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function OrderCreateForm() {
  const storedToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = storedToken ? storedToken.AccessToken : null;
  console.log(accessToken);

  // overall user info
  const overallUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  // overall user info
  const layCoSo = JSON.parse(localStorage.getItem("currentUser"));

  // để làm hóa đơn in sau
  // lấy customer name từ ô input
  const [customerName, setCustomerName] = useState("");

  // số hóa đơn
  const [receiptNumber, setReceiptNumber] = useState("");
  //tiền khách cọc/đưa
  const [deposit, setDeposit] = useState("");
  //số lượng
  const [quantity, setQuantity] = useState(0);
  // phần trăm giảm giá
  const [discountPercentage, setDiscountPercentage] = useState(0);
  // phần trăm thuế
  const [taxPercentage, setTaxPercentage] = useState(10);
  // ghi chú thêm
  const [notes, setNotes] = useState("");
  // lưu file
  const [file, setFile] = useState("");
  // tâm hình bill
  const [billImage, setBillImage] = useState("");

  const handleFileUploadChange = (e) => {
    const getFileTarget = e.target.files[0];

    const formData0 = new FormData();
    formData0.append("file", getFileTarget);
    console.log("formData sau khi đã appended handle change: ", formData0);

    console.log("Handle file upload change: ", getFileTarget);
    console.log("stringify file upload: ", JSON.stringify(getFileTarget));
    setFile(getFileTarget);
  };
  // lưu bill ngân hàng
  const handleBillImageChange = (e) => {
    setBillImage(e.target.files[0]);
  };
  const handleCustomerNameChange = (e) => {
    console.log("Tên khách: ", e.target.value);
    setCustomerName(e.target.value);
  };
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
        `https://localhost:7038/api/Services/GetbyServiceGroupID?ServiceGroupID=${choosenServiceGroup}`,
        {
          headers,
        }
      );
      const services = await response.json();
      console.log("Thông tin dịch vụ đã fetch: ", services);
      setSerVices(services);
    };
    fetchServiceByServiceGroupID();
  }, [choosenServiceGroup]);

  // lấy danh sách máy in dựa trên facilityID lấy từ localstorage
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
  // lấy userID trước để method post bên dưới
  const [fileUploadPath, setFileUploadPath] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // upload file tài liệu
    try {
      const formData = new FormData();
      formData.append("file", file);

      const yeuCauGuiTaiLieu = await axios.post(
        "https://localhost:7038/UploadFile",
        formData
      );

      const filePath = yeuCauGuiTaiLieu.data; // Lấy đường dẫn file từ phản hồi
      console.log("Dữ liệu trả về sau khi submit file tài liệu: ", filePath);

      setFileUploadPath(filePath);

      localStorage.setItem("fileUpload", JSON.stringify(filePath));
      const dataToLocal = {
        CustomerName: getFullName,
        ServiceID: choosenService,
        soLuongBoTaiLieu: Number(quantity),
        notes: notes,
        filePath: filePath,
      };
      localStorage.setItem("yeuCauInTaiLieu", JSON.stringify(dataToLocal));

      // Sử dụng đường dẫn file trong ứng dụng React của bạn
      // ...

      // dữ liệu trả về từ việc upload file tài liệu
      // const uploadFileData = await yeuCauGuiTaiLieu.data;
      // console.log(
      //   "Dữ liệu trả về sau khi submit file tài liệu: ",
      //   uploadFileData
      // );
      alert("Bạn đã yêu cầu tài liệu thành công.");
      //   window.location.href = "/success";
    } catch (error) {
      console.error("Error uploading file trong hàm submit:", error);
    }
  };

  //   Lấy họ tên đầy đủ của user (giảng viên) đang đăng nhập
  const getLoggingInUserInfo = JSON.parse(
    localStorage.getItem("loggedInUserInfo")
  );
  const getFullName = getLoggingInUserInfo
    ? getLoggingInUserInfo.FullName
    : null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono my-2">
        Giảng viên tạo đơn hàng
      </h2>
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Đưa tài liệu lên
        </label>
        <input
          type="file"
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 cursor-pointer"
          onChange={(e) => handleFileUploadChange(e)}
          name="fileUpload"
        />
        <label className="block text-sm font-medium text-gray-700">
          Tên khách
        </label>
        <input
          type="text"
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
          value={getFullName}
          onChange={(e) => handleCustomerNameChange(e)}
          name="customerName"
          disabled
        />

        {/* 2 khối dropdown */}
        <div className="flex gap-4">
          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Chọn phương pháp in
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={choosenServiceGroup}
              onChange={(e) => handleChoosenServiceGroupChange(e)}
            >
              <option value="">- Chọn khối dịch vụ -</option>
              {serviceGrp.map((serviceGroupEachOne) => (
                <option
                  key={serviceGroupEachOne.GroupID}
                  value={serviceGroupEachOne.GroupID}
                >
                  {serviceGroupEachOne.GroupName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none mt-8 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
          {/* dropdown thứ 2 */}
          {services.length > 0 && choosenServiceGroup ? (
            <div>
              <div className="relative">
                <label className="block text-sm mb-3 font-medium text-gray-700">
                  Dịch vụ
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={choosenService}
                  onChange={(e) => handleChoosenServiceChange(e)}
                >
                  <option value="">- Chọn dịch vụ -</option>

                  {services.map((serviceEachOne) => (
                    <option
                      key={serviceEachOne.ServiceID}
                      value={JSON.stringify(serviceEachOne)}
                    >
                      {serviceEachOne.Description}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none mt-8 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-10 italic text-gray-700">
              Đang chờ chọn khối dịch vụ...
            </p>
          )}

          {services.length > 0 && choosenService && (
            <div className="relative">
              <label className="block text-sm mb-3 font-medium text-gray-700">
                Giá tiền cho 1 tờ giấy:
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

        <label className="block text-sm font-medium text-gray-700">
          Số lượng bộ tài liệu
        </label>
        <input
          type="text"
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
          value={quantity}
          onChange={(e) => handleQuantityChange(e)}
          name="quantity"
        />
        {/* <label className="block text-sm font-medium text-gray-700">
          Thành tiền:{" "}
          {priceForEach * quantity * quantity +
            (priceForEach * taxPercentage) / 100 -
            (priceForEach * discountPercentage) / 100}{" "}
          đ
        </label> */}

        {/* <label className="block text-sm font-medium text-gray-700">
          Tải bill ngân hàng
        </label>
        <input
          type="file"
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 cursor-pointer"
          onChange={(e) => handleBillImageChange(e)}
          name="fileBillUpload"
        /> */}

        <label className="block text-sm font-medium text-gray-700">
          Ghi chú (số phòng cho cở sở bạn đang ở là{" "}
          <span className="text-green-600">{layCoSo.FacilityName}</span>)
        </label>
        <input
          type="text"
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
          value={notes}
          onChange={(e) => handleNotesChange(e)}
          name="notes"
        />

        {/* <label className="block text-sm font-medium text-gray-700">
          Cọc ít nhất: {(priceForEach * quantity) / 2} đ
        </label> */}
        <button
          class="bg-blue-600 text-white font-mono py-2 px-4 w-[280px] rounded"
          onClick={handleSubmit}
        >
          Yêu cầu đơn đặt hàng
        </button>
      </div>
    </div>
  );
}
