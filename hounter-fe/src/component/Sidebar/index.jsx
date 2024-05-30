import React from "react";
import { Typography, styled } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/Reducers/User";
import { useCookies } from 'react-cookie';
import avatar from "../../image/avatar.png"

const Element = styled("div")({
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const NavLink = styled(Link)(({ active }) => ({
  textDecoration: "none",
  color: active ? "white" : "black",
  backgroundColor: active ? "#10b981" : "transparent",
  display: "block",
  padding: "10px",
  borderRadius: "4px",
}));

export default function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const cookieData = cookies.jwt;
  const isAdmin = cookieData && cookieData.roles.includes("ADMIN");
  const isStaff = cookieData && cookieData.roles.includes("STAFF");
  const isUser = cookieData && cookieData.roles.includes("USER");

  const handleLogout = () => {
    dispatch(LOGOUT());
    removeCookie('jwt');
  };
  console.log(user.avatar)

  return (
    <div style={{ backgroundColor: "white", border: "1px solid #e0e0e0" }}>
      <div style={{ padding: "10px 0px", borderBottom: "1px solid #e0e0e0" }}>
        <img
          src={user.avatar ? user.avatar : avatar}
          alt="Avatar"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "2px solid #e0e0e0",
            display: "block",
            margin: "auto",
          }}
        />
        <Typography
          align="center"
          gutterBottom
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {user.fullName}
        </Typography>
        <Typography
          align="center"
          gutterBottom
          style={{
            color: "#9EA1B1",
            fontSize: 14,
          }}
        >
          {user.email}
        </Typography>
      </div>
      {isUser &&(
        <>
         <Element>
        <NavLink to="/user/detail" active={location.pathname === "/user/detail"}>
          <div>Thông tin cá nhân</div>
        </NavLink>
      </Element>

      <Element>
        <NavLink to="/user/payment-history" active={location.pathname === "/user/payment-history"}>
          <div>Lịch sử giao dịch</div>
        </NavLink>
      </Element>

      <Element>
        <NavLink to="/user/create-post" active={location.pathname === "/user/create-post"}>
          <div>Đăng tin mới</div>
        </NavLink>
      </Element>

      <Element>
        <NavLink to="/user/posts" active={location.pathname === "/user/posts"}>
          <div>Quản lý tin đã đăng</div>
        </NavLink>
      </Element>

      <Element>
        <NavLink to="/user/change-password" active={location.pathname === "/user/change-password"}>
          <div>Đổi mật khẩu</div>
        </NavLink>
      </Element>
        </>
      )}
      {isAdmin &&(
        <>
         {/* <Element>
        <NavLink to="/admin/detail" active={location.pathname === "/user/detail"}>
          <div>Thông tin cá nhân</div>
        </NavLink>
      </Element> */}

      <Element>
        <NavLink to="/admin/change-password" active={location.pathname === "/user/change-password"}>
          <div>Đổi mật khẩu</div>
        </NavLink>
      </Element>
        </>
      )}
      {isStaff &&(
        <>
         {/* <Element>
        <NavLink to="/staff/detail" active={location.pathname === "/user/detail"}>
          <div>Thông tin cá nhân</div>
        </NavLink>
      </Element> */}
      <Element>
        <NavLink to="/staff/change-password" active={location.pathname === "/user/change-password"}>
          <div>Đổi mật khẩu</div>
        </NavLink>
      </Element>
        </>
      )}
      
     

      <Element>
        <NavLink to="/" onClick={handleLogout} active={false} style={{ color: "red" }}>
          <div>Đăng xuất</div>
        </NavLink>
      </Element>
    </div>
  );
}
