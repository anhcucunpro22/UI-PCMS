import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function AddMaterials() {
  // lấy accessToken từ key jwt từ localstorage
  const getJWT = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = getJWT ? getJWT.AccessToken : null;
  console.log(accessToken);

  // state và handle changes cho khối dropdown
  const [choosenServiceGroup, setChoosenServiceGroup] = useState(null);
  const handleChoosenServiceGroupChange = (e) => {
    console.log("material group has been choosen: ", e.target.value);
    setChoosenServiceGroup(e.target.value);
  };
  const [choosenService, setChoosenService] = useState(null);
  // vật tư muốn thêm
  const [vatTuMuonThem, setVatTuMuonThem] = useState("");
  const handleVatTuMuonThemChange = (e) => {
    console.log("Vật tư muốn thêm tên: ", e.target.value);
    setVatTuMuonThem(e.target.value);
  };
  // To use the postData method
  const url = "https://localhost:7038/api/Material";
  const data = {
    groupID: choosenServiceGroup,
    materialName: vatTuMuonThem,
  };
  const token = accessToken;
  // handle post submit button để thêm mới vật tư
  const postMaterial = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(url, data, config);
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
      console.log(
        "vật tư đã chọn: ",
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
  }, [choosenServiceGroup]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono my-2">Thêm mới vật tư</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <label className="block text-sm mb-3 font-medium text-gray-700">
              Chọn khối vật tư để thêm
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
          <div>
            <div className="relative">
              <label className="block text-sm mb-3 font-medium text-gray-700">
                Tên vật tư mới
              </label>
              <input
                type="text"
                className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
                value={vatTuMuonThem}
                onChange={(e) => handleVatTuMuonThemChange(e)}
                name="customerName"
              />
            </div>
          </div>

          <button
            class="bg-blue-600 text-white font-mono py-2 my-3 px-4 w-[310px] rounded"
            onClick={postMaterial}
          >
            Thêm vật tư
          </button>
        </div>
      </div>
    </div>
  );
}
