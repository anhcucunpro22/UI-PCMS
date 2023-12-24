import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AddService from "./AddService";
import AddGroupService from "./AddGroupService";
import UpdateDocPrice from "./UpdateDocPrice";

export default function ServiceManagement() {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // reload lại component
  const [reload, setReload] = useState(false);

  // state và handle changes cho khối dropdown
  const [choosenServiceGroup, setChoosenServiceGroup] = useState(null);
  const handleChoosenServiceGroupChange = (e) => {
    console.log("material group has been choosen: ", e.target.value);
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
    console.log(Array(stringifyHoa)[0].Price);
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
  }, [reload]);

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
      console.log("Thông tin vật tư đã fetch: ", services);
      setSerVices(services);
    };
    fetchServiceByServiceGroupID();
  }, [choosenServiceGroup, reload]);

  // hàm xóa dịch vụ
  const handleDeleteDichVu = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .delete(`https://localhost:7038/api/Services/${choosenService}`, config)
      .then((response) => {
        setReload(!reload);
        // Xử lý phản hồi khi yêu cầu DELETE thành công
        alert(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi khi yêu cầu DELETE thất bại
        console.error("Lỗi khi xóa", error);
      });
  };

  // lấy thông tin toàn bộ của dịch vụ với choosenService
  const [toanBoDichVuFetch, setToanBoDichVuFetch] = useState([]);
  useEffect(() => {
    const layDichVuThongTinTuServiceID = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .get(`https://localhost:7038/api/Services/${choosenService}`, config)
        .then((response) => {
          // Xử lý phản hồi khi yêu cầu DELETE thành công
          console.log(
            "lấy thông tin toàn bộ của dịch vụ với choosenService: ",
            response.data
          );
          setToanBoDichVuFetch(response.data);
        })
        .catch((error) => {
          // Xử lý lỗi khi yêu cầu DELETE thất bại
          console.error("Lỗi khi xóa", error);
        });
    };

    layDichVuThongTinTuServiceID();

    console.log("Toàn bộ dịch vụ fetch: ", toanBoDichVuFetch);
  }, [choosenService]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono my-2">Xem dịch vụ đang có</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Khối dịch vụ
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

          {services.length > 0 && choosenService && (
            <div className="relative">
              <label className="block text-sm mb-3 font-medium text-gray-700">
                Giá tiền cho 1 tài liệu:
              </label>
              <input
                type="text"
                className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
                value={priceForEach}
                name="customerName"
                disabled
              />
            </div>
          )}

          <button
            class="bg-red-600 text-white font-mono py-2 my-3 px-4 w-[310px] rounded"
            onClick={handleDeleteDichVu}
          >
            Xóa dịch vụ
          </button>
        </div>
      </div>

      <AddGroupService />

      <AddService />

      <UpdateDocPrice />
    </div>
  );
}
