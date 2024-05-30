import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../component/footer";
import StaffHeader from "./part/Header";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const StaffLayout = () => {
  const [cookies] = useCookies(["jwt"]);
  const cookieData = cookies.jwt;
  const isStaff = cookieData && cookieData.roles.includes("STAFF");

  // Kiểm tra nếu đường dẫn là "/admin/detail" thì không hiển thị footer
  const hideFooter = location.pathname === "/admin/detail" || location.pathname === "/admin/change-password";
  return isStaff ? (
    <div style={{
      backgroundColor: "#F1F1F1",}}>
      <StaffHeader />
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
  ): (
    <Navigate to="/login"/>
  );
};

export default StaffLayout;
