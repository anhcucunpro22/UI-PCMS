import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryInNhap = () => {
  const storedToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = storedToken ? storedToken.AccessToken : null;
  console.log(accessToken);

  // lấy thông tin của staff để đưa vào created by khi post
  const overallUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  console.log(overallUserInfo.FullName);

  const [selectedMaterialID, setSelectedMaterialID] = useState("");
  const [units, setUnits] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedUnitID, setSelectedUnitID] = useState("");
  const [tienDaDua, setTienDaDua] = useState("");
  const [selectedWarehouseID, setSelectedWarehouseID] = useState("");
  const [selectedSupplierID, setSelectedSupplierID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [percentageDiscount, setPercentageDiscount] = useState("");
  const [percentageTax, setPercentageTax] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Fetch warehouses and suppliers
  useEffect(() => {
    const fetchWarehouses = async () => {
      const response = await axios.get("https://localhost:7038/api/Warehouses");
      console.log("Warehouse đã fetch: ", response.data);
      setWarehouses(response.data);
    };

    const fetchMaterial = async () => {
      const response = await axios.get("https://localhost:7038/api/Material");
      console.log("Materials đã fetch: ", response.data);
      setMaterials(response.data);
    };

    const fetchSuppliers = async () => {
      const response = await axios.get("https://localhost:7038/api/Suppliers");
      console.log("Suppliers đã fetch: ", response.data);
      setSuppliers(response.data);
    };

    const fetchUnitsOfMeasure = async () => {
      const response = await axios.get(
        "https://localhost:7038/api/UnitsOfMeasure"
      );
      console.log("Units of measure đã fetch: ", response.data);
      setUnits(response.data);
    };

    fetchWarehouses();
    fetchMaterial();
    fetchSuppliers();
    fetchUnitsOfMeasure();
  }, []);

  // Handle change
  const handleQuantityChange = (e) => {
    console.log("Số lượng vật tư đã chọn muốn nhập: ", e.target.value);
    setQuantity(e.target.value);
  };

  const handleWarehouseChange = (e) => {
    console.log("Warehouse ID đã chọn: ", e.target.value);
    setSelectedWarehouseID(e.target.value);
  };

  const handlePercentageDiscountChange = (e) => {
    console.log("Phần trăm giảm giá đã nhập: ", e.target.value);
    setPercentageDiscount(e.target.value);
  };

  const handleSupplierChange = (e) => {
    console.log("Supplier ID đã chọn: ", e.target.value);
    setSelectedSupplierID(e.target.value);
  };

  const handleMaterialChange = (e) => {
    console.log("Material ID đã chọn: ", e.target.value);
    setSelectedMaterialID(e.target.value);
  };

  const handleUnitChange = (e) => {
    console.log("Unit ID đã chọn: ", e.target.value);
    setSelectedUnitID(e.target.value);
  };

  const handleTienDaDuaChange = (e) => {
    console.log("Tiền đã đưa: ", e.target.value);
    setTienDaDua(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    console.log("Payment method đã chọn: ", e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handlePercentageTaxChange = (e) => {
    console.log("Phần trăm thuế đã nhập: ", e.target.value);
    setPercentageTax(e.target.value);
  };

  const handleNotesChange = (e) => {
    console.log("Ghi chú đã nhập: ", e.target.value);
    setNotes(e.target.value);
  };

  // fetch chủ warehouse
  const [warehouseInfo, setWarehouseInfo] = useState("");
  const fetchTenThaySon = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7038/api/Warehouses",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Dữ liệu warehouse: ", response.data[0]);
      setWarehouseInfo(response.data[0]);
    } catch (error) {
      console.error("Error fetching dữ liệu warehouse: ", error);
    }
  };
  useEffect(() => {
    fetchTenThaySon();
  }, []);

  const [inventoryInID, setInventoryInID] = useState("");
  useEffect(() => {
    switch (selectedSupplierID) {
      case "1":
        console.log("set 1 7");
        setInventoryInID(7);
        break;
      case "5":
        console.log("set 5 8");
        setInventoryInID(8);
        break;
      case "7":
        console.log("set 7 9");
        setInventoryInID(9);
        break;
      case "11":
        console.log("set 11 10");
        setInventoryInID(10);
        break;
      default:
        console.log("reach default");
    }
  }, [selectedSupplierID]);

  // POST method
  const postData = async () => {
    const data = {
      inventoryInID: inventoryInID,
      materialID: selectedMaterialID,
      unitID: selectedUnitID,
      quanlity: quantity,
      amountReceived: tienDaDua,
      percentageDiscount: percentageDiscount,
      discountAmount: 0,
      percentageTax: percentageTax,
      taxAmount: 0,
      totalAmount: 0,
      paymentMethod: paymentMethod,
      createdBy: warehouseInfo.ManagerNameWh,
      createdDate: new Date().toLocaleDateString(),
      modifiedDate: new Date().toLocaleDateString(),
      description: notes,
    };

    const headers = {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        `https://localhost:7038/api/InventoryInDetail`,
        data,
        { headers }
      );
      console.log(response.data);
      alert("Nhập kho thành công");
    } catch (error) {
      console.error(error);
    }
  };

  // Return JSX
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold font-mono mt-2 mb-3">Nhập kho ở đây</h2>

      {/* chọn vật tư nhập vào */}
      <select value={selectedMaterialID} onChange={handleMaterialChange}>
        <option value="">- Chọn vật tư nhập vào -</option>
        {materials.map((material) => (
          <option key={material.MaterialID} value={material.MaterialID}>
            {material.MaterialName}
          </option>
        ))}
      </select>

      {/* units of measure */}
      <select value={selectedUnitID} onChange={handleUnitChange}>
        <option value="">- Chọn đơn vị tính -</option>
        {units.map((unit) => (
          <option key={unit.UnitID} value={unit.UnitID}>
            {unit.UnitName}
          </option>
        ))}
      </select>

      {/* warehouse */}
      <select value={selectedWarehouseID} onChange={handleWarehouseChange}>
        <option value="">- Chọn kho lưu trữ -</option>
        {warehouses.map((warehouse) => (
          <option key={warehouse.WarehouseID} value={warehouse.WarehouseID}>
            {warehouse.WarehouseName}
          </option>
        ))}
      </select>

      {/* nhà cung cấp */}
      <select value={selectedSupplierID} onChange={handleSupplierChange}>
        <option value="">- Chọn nhà cung cấp -</option>
        {suppliers.map((supplier) => (
          <option key={supplier.SupplierID} value={supplier.SupplierID}>
            {supplier.SupplierName}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700">
        Số lượng
      </label>
      <input
        type="text"
        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
        value={quantity}
        onChange={(e) => handleQuantityChange(e)}
        name="quantity"
      />

      <label className="block text-sm font-medium text-gray-700">
        Phần trăm giảm giá
      </label>
      <input
        type="text"
        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
        value={percentageDiscount}
        onChange={(e) => handlePercentageDiscountChange(e)}
        name="quantity"
      />

      <label className="block text-sm font-medium text-gray-700">
        Phần trăm thuế
      </label>
      <input
        type="text"
        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
        value={percentageTax}
        onChange={(e) => handlePercentageTaxChange(e)}
        name="quantity"
      />

      <label className="block text-sm font-medium text-gray-700">
        Tiền đã đưa
      </label>
      <input
        type="text"
        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
        value={tienDaDua}
        onChange={(e) => handleTienDaDuaChange(e)}
        name="quantity"
      />

      {/* payment method */}
      <select value={paymentMethod} onChange={handlePaymentMethodChange}>
        <option value="">- Chọn phương thức trả -</option>
        <option value="Tiền mặt">Tiền mặt</option>
        <option value="Ngân hàng">Ngân hàng</option>
      </select>

      <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
      <input
        type="text"
        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4"
        value={notes}
        onChange={(e) => handleNotesChange(e)}
        name="quantity"
      />

      <button
        className="bg-blue-600 text-white font-mono py-2 my-3 px-4 w-[310px] rounded"
        onClick={postData}
      >
        Khai nhập kho
      </button>
    </div>
  );
};

export default InventoryInNhap;
