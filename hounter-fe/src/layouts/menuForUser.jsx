import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { LOGOUT } from "../redux/Reducers/User";
import {  useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';



const MainMenu = ({ anchorEl, handleClose }) => {
    const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const handleLogout = () => {
        dispatch(LOGOUT());
        removeCookie('jwt');
        console.log('logged out');
      };
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem component={Link} to="/user/detail" onClick={handleClose}>
        Thông tin cá nhân
      </MenuItem>
      <MenuItem component={Link} to="/user/payment-history" onClick={handleClose}>
        Lịch sử giao dịch
      </MenuItem>
      <MenuItem component={Link} to="/user/create-post" onClick={handleClose}>
        Đăng tin mới
      </MenuItem>
      <MenuItem component={Link} to="/user/posts" onClick={handleClose}>
        Quản lý tin đã đăng
      </MenuItem>
      <MenuItem component={Link} to="/user/change-password" onClick={handleClose}>
        Đổi mật khẩu
      </MenuItem>
      <MenuItem component={Link} to="/" onClick={handleLogout}>
        Đăng xuất
      </MenuItem>
    </Menu>
  );
}

export default MainMenu;
