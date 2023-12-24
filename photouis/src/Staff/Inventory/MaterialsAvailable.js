import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function MaterialsAvailable() {
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
  const [choosenVatTu, setChoosenVatTu] = useState("");
  const handleChoosenServiceChange = (e) => {
    const dichVuLayDuoc = e.target.value;
    const confirmVatTuLayDuoc = dichVuLayDuoc ? dichVuLayDuoc : null;
    setChoosenVatTu(confirmVatTuLayDuoc);
    console.log("Vật tư đã chọn: ", confirmVatTuLayDuoc);
  };

  // fetch dropdown đầu tiên để chọn
  const [serviceGrp, setSerViceGrp] = useState([]);
  const fetchServiceGroup = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch("https://localhost:7038/api/MaterialGroup", {
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
        `https://localhost:7038/api/Material/GetbyMaterialGr?MaterialGroupID=${choosenServiceGroup}`,
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

  // hàm xóa vật tư
  const [triggerPriceForEach, setTriggerPriceForEach] = useState(false);
  const inventoryInGetInIDMat = (getInventoryInID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(
        `https://localhost:7038/api/InventoryInDetail/ByInventoryInIDAndMaterialID?InventoryInID=${getInventoryInID}&MaterialID=${choosenVatTu}`,
        config
      )
      .then((response) => {
        // Xử lý phản hồi khi yêu cầu DELETE thành công
        // console.log(
        //   "Sau khi nhấn nút tìm số lượng vật tư: ",
        //   response.data[0].InventoryInID
        // );
        const getInfomationPriceForEach = response.data[0].InventoryIn.Quanlity;
        setPriceForEach(getInfomationPriceForEach);
        setTriggerPriceForEach(true);
        console.log(
          "Sau khi nhấn nút tìm số lượng vật tư 2nd fetch: ",
          getInfomationPriceForEach
        );
      })
      .catch((error) => {
        // Xử lý lỗi khi yêu cầu DELETE thất bại
        console.error("Lỗi khi xóa", error);
      });
  };

  const [soLuong, setSoLuong] = useState("");
  const handleDeleteVatTu = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(
        `https://localhost:7038/api/InventoryOutDetails/remainingquantity/${choosenVatTu}`,
        config
      )
      .then((response) => {
        setReload(!reload);
        // Xử lý phản hồi khi yêu cầu DELETE thành công
        // console.log(
        //   "Sau khi nhấn nút tìm số lượng vật tư: ",
        //   response.data[0].InventoryInID
        // );

        const getInventoryInID = response.data.RemainingQuantity;
        console.log("Sau khi nhấn nút tìm số lượng vật tư: ", response.data);
        setSoLuong(getInventoryInID);
      })
      .catch((error) => {
        // Xử lý lỗi khi yêu cầu DELETE thất bại
        setPriceForEach("Không có trong kho");
        console.error("Lỗi khi xóa", error);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono my-2">
        Xem vật tư đang có trong kho
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Khối vật tư
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={choosenServiceGroup}
              onChange={(e) => handleChoosenServiceGroupChange(e)}
            >
              <option value="">- Chọn khối vật tư -</option>
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
                  Vật tư
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={choosenService}
                  onChange={(e) => handleChoosenServiceChange(e)}
                >
                  <option value="">- Chọn vật tư -</option>

                  {services.map((serviceEachOne) => (
                    <option
                      key={serviceEachOne.MaterialID}
                      //   value={JSON.stringify(serviceEachOne)}
                      value={serviceEachOne.MaterialName}
                    >
                      {serviceEachOne.MaterialName}
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
              Đang chờ chọn khối vật tư...
            </p>
          )}

          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Số lượng trong kho của vật tư đã chọn:
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
              value={soLuong}
              name="customerName"
              disabled
            />
          </div>

          <button
            class="bg-blue-600 text-white font-mono py-2 my-3 px-4 w-[310px] rounded"
            onClick={handleDeleteVatTu}
          >
            Xem số lượng vật tư
          </button>
        </div>
      </div>
    </div>
  );
}
