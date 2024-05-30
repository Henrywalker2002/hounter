import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../component/footer";
import HeaderAdmin from "./part/Header";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminLayout = () => {
  const [cookies] = useCookies(["jwt"]);
  const cookieData = cookies.jwt;
  
  const location = useLocation();

  // Kiểm tra xem cookie có tồn tại và người dùng có vai trò ADMIN không
  const isAdmin = cookieData && cookieData.roles.includes("ADMIN");

  // Kiểm tra nếu đường dẫn là "/admin/detail" thì không hiển thị footer
  const hideFooter = location.pathname === "/admin/detail" || location.pathname === "/admin/change-password";

  return isAdmin ? (
    <div style={{
      backgroundColor: "#F1F1F1",}}>
      <HeaderAdmin />
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminLayout;
