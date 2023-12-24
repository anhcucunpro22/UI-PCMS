import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function UpdateDocPrice() {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // state và handle changes cho khối dropdown
  const [choosenServiceGroup, setChoosenServiceGroup] = useState(null);
  const handleChoosenServiceGroupChange = (e) => {
    console.log("service group has been choosen: ", e.target.value);
    setChoosenServiceGroup(e.target.value);
  };
  const [choosenService, setChoosenService] = useState(null);
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const handleServicePriceChange = (e) => {
    console.log("Giá dịch vụ muốn đặt: ", e.target.value);
    setServicePrice(e.target.value);
  };
  const handleServiceDescriptionChange = (e) => {
    console.log("Mô tả dịch vụ: ", e.target.value);
    setServiceDescription(e.target.value);
  };
  // dịch vụ muốn thêm
  const [dichVuMuonThem, setDichVuMuonThem] = useState("");
  const handleDichVuMuonThemChange = (e) => {
    console.log("Dịch vụ muốn thêm tên: ", e.target.value);
    setDichVuMuonThem(e.target.value);
  };

  // handle post submit button để thêm mới vật tư
  const putService = async () => {
    // To use the postData method
    const url = `https://localhost:7038/api/Services?id=${priceForEach.ServiceID}`;
    const data = {
      ServiceID: priceForEach.ServiceID,
      groupID: priceForEach.GroupID,
      serviceName: priceForEach.ServiceName,
      quantity: 1,
      price: servicePrice,
      description: priceForEach.Description,
    };
    const token = accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(url, data, config);
      alert(response.data);
    } catch (error) {
      // Handle the error
      console.error("Error:", error);
      throw error;
    }
  };

  //   postMaterial(url, data, token)
  //     .then((response) => {
  //       console.log(response);
  //       // Handle the response
  //     })
  //     .catch((error) => {
  //       // Handle the error
  //       console.error(error);
  //     });

  // lấy giá tiền cho mỗi tài liệu dựa theo loại giấy
  const [priceForEach, setPriceForEach] = useState(0);
  const handleChoosenServiceChange = (e) => {
    const dichVuLayDuoc = e.target.value;
    const confirm = dichVuLayDuoc ? dichVuLayDuoc : null;

    // stringify hóa
    const stringifyHoa = JSON.parse(confirm);

    setTimeout(() => {
      console.log("Dịch vụ đã chọn: ", confirm ? Array(stringifyHoa)[0] : null);
      setPriceForEach(Array(stringifyHoa)[0]);
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono my-2">
        Chỉnh sửa giá dịch vụ
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Chọn khối dịch vụ để chỉnh sửa giá
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
                      //   value={serviceEachOne.ServiceID}
                    >
                      {serviceEachOne.ServiceName}
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

          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Tên dịch vụ
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={priceForEach.ServiceName}
              //   onChange={(e) => handleDichVuMuonThemChange(e)}
              name="customerName"
              disabled
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Giá dịch vụ ban đầu
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={priceForEach.Price + " đ"}
              //   onChange={(e) => handleServicePriceChange(e)}
              name="customerName"
              disabled
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Giá dịch vụ muốn thay đổi
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={servicePrice}
              onChange={(e) => handleServicePriceChange(e)}
              name="customerName"
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Mô tả dịch vụ
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={priceForEach.Description}
              //   onChange={(e) => handleServiceDescriptionChange(e)}
              name="customerName"
              disabled
            />
          </div>

          <button
            class="bg-yellow-500 text-white font-mono py-2 my-3 px-4 w-[310px] rounded"
            onClick={putService}
          >
            Chỉnh sửa dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}
