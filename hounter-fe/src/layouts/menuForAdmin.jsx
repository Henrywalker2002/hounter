import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { LOGOUT } from "../redux/Reducers/User";
import { useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';

const AdminMenu = ({ anchorEl, handleClose }) => {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const cookieData = cookies.jwt;
    const isAdmin = cookieData && cookieData.roles.includes("ADMIN");
    const isStaff = cookieData && cookieData.roles.includes("STAFF");

    const handleLogout = () => {
        dispatch(LOGOUT());
        removeCookie('jwt');
        console.log('logged out');
    };

    const menuItems = [];

    if (isAdmin) {
        menuItems.push(
            // <MenuItem key="admin-profile" component={Link} to="/admin/detail" onClick={handleClose}>
            //     Thông tin cá nhân
            // </MenuItem>,
            <MenuItem key="admin-change-password" component={Link} to="/admin/change-password" onClick={handleClose}>
                Đổi mật khẩu
            </MenuItem>
        );
    }

    if (isStaff) {
        menuItems.push(
            // <MenuItem key="staff-profile" component={Link} to="/staff/detail" onClick={handleClose}>
            //     Thông tin cá nhân
            // </MenuItem>,
            <MenuItem key="staff-change-password" component={Link} to="/staff/change-password" onClick={handleClose}>
                Đổi mật khẩu
            </MenuItem>
        );
    }

    menuItems.push(
        <MenuItem key="logout" component={Link} onClick={handleLogout}>
            Đăng xuất
        </MenuItem>
    );

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {menuItems}
        </Menu>
    );
}

export default AdminMenu;
