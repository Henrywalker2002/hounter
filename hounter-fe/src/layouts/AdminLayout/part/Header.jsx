import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Typography,
  Grid,
  styled,
  Button,
  Avatar,
  Menu,
  MenuItem
} from "@mui/material";
import Logo from "../../../image/logo.png";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import handleContentNotification from "../../helper";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import AdminMenu from "../../menuForAdmin";
// import { useState } from "react";


const Title = styled(Typography)({
  color: "#1B1C57",
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: "normal",
  textTransform: "capitalize",
  marginLeft: "10px",
});

const ButtonNavbar = styled(Button)({
  padding: "5px 10px 5px 10px",
  color: "white",
  background: "#10B981",
  borderRadius: "32px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  textDecoration: "none",
  "&.active": {
    border: "3px solid #ffffff",
    fontWeight: "bold",
      textDecoration: "underline", // Đổi kiểu viền khi nút được chọn
  }
});


const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    pageSize: "10",
    pageNo: "1",
  });
  const [noti, setNoti] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const [anchorElMen, setAnchorElMen] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorElMen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMen(null);
  };
  
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if(user.isLogin==false){
      return
    }
    const fetchProductList = async (page) => {
      await axiosBaseUrl
        .get(`/notify`, {
          params: params,
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          // setNoti(response.data);
          const results = response.data;
          setNoti(
          results.map((notification) =>
            handleContentNotification(notification)
          )
          
        );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchProductList(1);
  }, [loading, user, params]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNotificationClick = async(notification) => {    
    await axiosBaseUrl
        .patch(`/notify/${notification.id}`,{}, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          navigate(notification.redirect_url)
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <AppBar
      style={{
        width: "100%",
        height: "64px",
        backgroundColor: "rgba(16,185,129)",
        paddingTop: "14px",
        paddingLeft: "60px",
        paddingRight: "60px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img
              src={Logo}
              alt="akn"
              style={{ height: "36px", width: "36px" }}
            />
            <Title>Hounter Admin</Title>
          </div>
        </Grid>
        <Grid item lg={2}></Grid>
        <Grid item lg={4} style={{display:"flex", justifyContent: "space-between",alignItems: "center",}}>
          <Link to={"/admin/accounts"}>
            <ButtonNavbar className={location.pathname === "/admin/accounts" ? "active" : ""}>Tài Khoản</ButtonNavbar>
          </Link>
          <Link to={"/admin/posts"}>
            <ButtonNavbar className={location.pathname === "/admin/posts" ? "active" : ""}>Tin Đăng</ButtonNavbar>
          </Link>
          <Link to={"/admin/feedbacks"}>
            <ButtonNavbar className={location.pathname === "/admin/feedbacks" ? "active" : ""}>Báo Cáo</ButtonNavbar>
          </Link>
          <Link to={"/admin/payment"}>
            <ButtonNavbar className={location.pathname === "/admin/payment" ? "active" : ""}>Thanh toán</ButtonNavbar>
          </Link>
        </Grid>
        <Grid item lg={1}></Grid>
        <Grid item lg={1} style={{display:"flex", justifyContent: "space-around",alignItems: "center"}}>
          <Link to={"/admin/posts"} style={{ color: "white", textDecoration: "none" }}>
            {" "}
            <ChatIcon />{" "}
          </Link>
          {/* <Link style={{ color: "white", textDecoration: "none" }}>
            {" "}
            <NotificationsIcon />{" "}
          </Link> */}
          <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ padding: 0, minWidth: 0 }}
              >
                <NotificationsIcon
                  style={{ color: "white", height: "40px", width: "30px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {Array.isArray(noti) ? (
                  noti.map((notification) => (
                    
                    <MenuItem
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      style={{
                        width: "300px",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        borderBottom: "2px solid #e0e0e0"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          textAlign: "left",
                          width: "99%",
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{
                            fontWeight: notification.isRead ? "200" : "600",
                            width: "70%",
                          }}
                        >
                          {notification.title}
                        </Typography>
                        <Typography
                          style={{ width: "30%", textAlign: "right",fontSize: "13px", display: "flex", alignItems: 'center' }}
                        >
                          {notification.timestamp}
                        </Typography>
                      </div>

                      <div style={{ width: "100%" }}>
                        <Typography
                          style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}
                        >
                          {notification.message}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>Không có thông báo</MenuItem>
                )}
              </Menu>
          <Button
            onClick={handleMenuOpen}
            style={{ textDecoration: "none"}}
          >
            <Avatar sx={{ width: 36, height: 36 }}><PersonIcon/> </Avatar>
          </Button>
          <AdminMenu anchorEl={anchorElMen} handleClose={handleMenuClose} />
        </Grid>
      </Grid>
    </AppBar>
  );
};
export default AdminHeader;
