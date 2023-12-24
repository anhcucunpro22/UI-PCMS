import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import TheMenu from "./All Roles/TheMenu";
import WelcomeNonAuthen from "./All Roles/WelcomeNonAuthen";
import Login from "./Authentication/Login";
// import WelcomeDidAuthen from "./All Roles/Welcomes/WelcomeDidAuthenUser";
import SignUp from "./Authentication/SignUp";
import CheckOutWhenCustomerComeIn from "./Staff/CheckOutWhenCustomerComeIn";
import { jwtDecode } from "jwt-decode";
import Logout from "./All Roles/Logout";
import UserManagement from "./Admin/UserManagement";
import AdminMenu from "./All Roles/Menu for Admin/AdminMenu";
import UserMenu from "./All Roles/Menu for User/UserMenu";
import StaffMenu from "./All Roles/Menu for Staff/StaffMenu";
import OrderCreateForm from "./User/OrderCreateForm";
import SuccessNotification from "./User/Báo Thành Công/SuccessNotification";
import StaffManagement from "./Admin/StaffManagement";
import SeeOrders from "./Admin/SeeOrders";
import Suppliers from "./Admin/Suppliers/Suppliers";
import Printers from "./Admin/Printers";
import SeeServices from "./Staff/SeeServices";
import DebtManagementStaff from "./Staff/Debt Management for Staff/DebtManagementStaff";
import SeeDebtInCustomer from "./User/SeeDebtInCustomer";
import OrdersInThePast from "./User/OrdersInThePast";
import PersonalStatisticsStaff from "./Staff/PersonalStatisticsStaff";
import ReportProblemStaff from "./Staff/ReportProblemStaff";
import SeeMaterials from "./Admin/Materials/SeeMaterials";
import ServiceManagement from "./Admin/Services/ServiceManagement";
import InventoryManagementAdmin from "./Admin/Inventory Management/InventoryManagementAdmin";
import InventoryInManagementStaff from "./Staff/Inventory/InventoryIn Management Staff/InventoryInManagementStaff";
import MaterialsAvailable from "./Staff/Inventory/MaterialsAvailable";
import InventoryOutManagementStaff from "./Staff/Inventory/InventoryOut Management Staff/InventoryOutManagementStaff";
import PersonalInformationForAll from "./All Roles/PersonalInformationForAll";
import InventoryOutSee from "./Staff/Inventory/InventoryOut Management Staff/InventoryOutSee";
import CheckOutWhenCustomerOrders from "./Staff/CheckOutWhenCustomerOrders";
import WelcomeDidAuthenUser from "./All Roles/Welcomes/WelcomeDidAuthenUser";

function App() {
  const storedToken = JSON.parse(localStorage.getItem("jwt"));
  const accessToken = storedToken ? storedToken.AccessToken : null;

  console.log(accessToken);
  // dịch thông tin của access token và lưu xuống localstorage để dùng sau này
  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      console.log("JWT giải mã ở App:", decoded);
      localStorage.setItem("currentUser", JSON.stringify(decoded));
    }
  }, [accessToken]);

  console.log(accessToken);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // lấy thông tin nhân viên từ decoded jwt
  useEffect(() => {
    let layTenNhanVien;
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      layTenNhanVien = decoded.Id;
      console.log("lay ten nhan vien: ", layTenNhanVien);

      const tenNhanVienDangPhucVuFetch = async () => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(
          `https://localhost:7038/api/Users/${layTenNhanVien}`,
          {
            headers,
          }
        );
        const userInfo = await response.json();
        console.log("Thông tin user:", userInfo);
        localStorage.setItem("loggedInUserInfo", JSON.stringify(userInfo));
      };
      tenNhanVienDangPhucVuFetch();
    }
  }, []);

  useEffect(() => {
    // Check if the user is logged in, e.g., by checking the presence of a JWT token in localStorage
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const confirmJWTfromLocalstorage = jwt ? jwt.AccessToken : null;
    if (confirmJWTfromLocalstorage) {
      setIsLoggedIn(true);
      console.log("Đã đăng nhập");
    }
    console.log("Trạng thái đăng nhập: ", isLoggedIn);

    // lấy thông tin user đang đăng nhập từ jwt
  }, []);

  // lấy facilityID từ tên facilityName trả về sau đăng nhập
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const confirmCurrentUsersFacilityName = currentUser
    ? currentUser.FacilityName
    : null;
  useEffect(() => {
    // hàm đẩy giá trị của facilityID xuống localstorage
    const determineFacilityID = () => {
      let facilityID;
      if (confirmCurrentUsersFacilityName === "Cơ sở Nguyễn Văn Linh") {
        facilityID = 1;
      } else if (confirmCurrentUsersFacilityName === "Cơ sở Quang Trung") {
        facilityID = 2;
      } else if (confirmCurrentUsersFacilityName === "Cơ sở Hoàng Minh Thảo") {
        facilityID = 3;
      } else {
        facilityID = 1;
      }
      localStorage.setItem("facilityID", facilityID);
    };

    determineFacilityID();
  }, [currentUser]);

  let roleValue;
  // lấy role từ link microsoft
  if (currentUser) {
    roleValue =
      currentUser[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    console.log(roleValue);
  } else {
    // Handle the case when currentUser is null
    roleValue = null;
    console.log(roleValue);
    console.log("No user logged in found in local storage");
  }

  return (
    <Router>
      <div>
        {/* menu phân quyền  */}
        {roleValue === null && <TheMenu />}
        {roleValue === "Customer" && <UserMenu />}
        {roleValue === "Staff" && <StaffMenu />}
        {roleValue === "Admin" && <AdminMenu />}
        {/*  */}

        {/* các trang được truy cập khi */}
        {!isLoggedIn ? (
          <Routes>
            {/* trên này là chưa đăng nhập*/}
            <Route path="/" element={<WelcomeNonAuthen />} />
            <Route path="/logout" element={<WelcomeNonAuthen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/welcome" element={<WelcomeNonAuthen />} />
            <Route path="/homepage" element={<WelcomeNonAuthen />} />
          </Routes>
        ) : (
          <Routes>
            {/* dưới này là đăng nhập thành công */}
            <Route path="/" element={<WelcomeDidAuthenUser />} />
            <Route path="/login" element={<WelcomeNonAuthen />} />
            <Route path="/signup" element={<WelcomeNonAuthen />} />
            <Route path="/homepage" element={<WelcomeDidAuthenUser />} />
            <Route path="/userManagement" element={<UserManagement />} />
            <Route
              path="/checkOutCashier"
              element={<CheckOutWhenCustomerComeIn />}
            />
            <Route path="/makeOrder" element={<OrderCreateForm />} />
            <Route path="/success" element={<SuccessNotification />} />
            <Route path="/staffManagement" element={<StaffManagement />} />
            <Route path="/seeOrders" element={<SeeOrders />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/printers" element={<Printers />} />
            <Route path="/seeServices" element={<SeeServices />} />
            <Route path="/debtManagement" element={<DebtManagementStaff />} />
            <Route path="/customerDebt" element={<SeeDebtInCustomer />} />
            <Route path="/pastOrdersUser" element={<OrdersInThePast />} />
            <Route
              path="/statisticsStaff"
              element={<PersonalStatisticsStaff />}
            />
            <Route path="/reportStaff" element={<ReportProblemStaff />} />
            <Route path="/seeMaterials" element={<SeeMaterials />} />
            <Route
              path="/serviceAdminManagement"
              element={<ServiceManagement />}
            />
            {/* quản lý toàn kho cả xuất lẫn nhập ở phía admin */}
            <Route
              path="/inventoryInManagementAdmin"
              element={<InventoryManagementAdmin />}
            />
            <Route
              path="/inventoryOutManagementAdmin"
              element={<InventoryOutSee />}
            />
            {/* quản lý kho nhập ở phía staff */}
            <Route
              path="/nhapKhoStaff"
              element={<InventoryInManagementStaff />}
            />
            {/* xem vật tư có sẵn số lượng bao nhiêu trong kho ở phía staff */}
            <Route
              path="/staffCheckTrongKho"
              element={<MaterialsAvailable />}
            />
            {/* quản lý kho xuất ở phía staff */}
            <Route
              path="/xuatKhoStaff"
              element={<InventoryOutManagementStaff />}
            />
            {/* xem thông tin cá nhân của all roles */}
            <Route
              path="/personalInformation"
              element={<PersonalInformationForAll />}
            />
            <Route
              path="/checkOutForRequest"
              element={<CheckOutWhenCustomerOrders />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
