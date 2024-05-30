import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../../image/logo.png";
import {
  styled,
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../redux/Reducers/User";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import {useCookies} from "react-cookie";
import handleContentNotification from "../../helper";
import MainMenu from "../../menuForUser";

const Title = styled(Typography)({
  color: "#1B1C57",
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "normal",
  textTransform: "capitalize",
  marginLeft: "15px",
});
const But = styled(Button)({
  padding: "8px 16px 8px 16px",
  borderRadius: "32px",
  color: "#F0F3FD",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "normal",
  textTransform: "capitalize",
  background: "rgba(255, 255, 255, 0.10)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  textDecoration: "none",
  "&.active": {
    border: "3px solid #ffffff",
    fontWeight: "bold",
      textDecoration: "underline", // Đổi kiểu viền khi nút được chọn
  }
});
const But2 = styled(Button)({
  padding: "12px 24px 12px 24px",
  borderRadius: "32px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "normal",
  textTransform: "capitalize",
  background: "#10b981",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  textDecoration: "none",
});
const But3 = styled(Button)({
  padding: "12px",
  alignItems: "center",
  textAlign: "center",
  fontWeight: "600",
  lineHeight: "normal",
  color: "#FF7008",
  fontSize: "16px",
  textTransform: "capitalize",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  "&:hover": {
    background: "#fff",
  },
  borderRadius: "32px",
  marginLeft: "10px",
  border: "1px solid #FF7008",
});

export default function 
DenseAppBar() {
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
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [open, setOpen] = useState(false);
  // const fetchProductList = async (page) => {
  //   console.log(user);
  //   await axiosBaseUrl
  //     .get(`/notify`, {
  //       params: params,
  //       headers: {
  //         Authorization: "Bearer " + user.token,
  //       },
  //     })
  //     .then((response) => {
  //       // setNoti(response.data);
  //       const results = response.data.results;
  //       setNoti(
  //         results.map((notification) =>
  //           handleContentNotification(notification)
  //         )
  //       );
  //       setLoading(false);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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

  const handleLogout = () => {
    dispatch(LOGOUT());
    removeCookie('jwt', {path: '/'});
    navigateToHome();
  }

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgb(255,255,255, 0%)",
        padding: "24px 0px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={0.7}></Grid>
        <Grid item xs={5.2}>
          <Box style={{ display: "flex" }} onClick={navigateToHome}>
            <img
              src={image}
              alt="akn"
              style={{ height: "36px", width: "36px" }}
            />
            <Title variant="h6">Hounter</Title>
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            padding: "16px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Link to={"/"}>
            <But className={location.pathname === "/" ? "active" : ""}>Trang chủ</But>
          </Link>
          <Link to={"/motel"}>
            <But className={location.pathname === "/motel" ? "active" : ""}>Nhà trọ</But>
          </Link>
          <Link to={"/homestay"}>
            <But className={location.pathname === "/homestay" ? "active" : ""}>Homestay</But>
          </Link>
        </Grid>
        {user.isLogin === true ? (
          <>
            <Grid item xs={0.3} />
            <Grid
              item
              xs={0.5}
              style={{
                padding: "16px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
                {" "}
                <ChatIcon />{" "}
              </Link>
              {/* <Link to={"/admin"} style={{ color: "white", textDecoration: "none" }}>
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
              <Link
                to={"/user/favorite-post"}
                style={{ color: "white", textDecoration: "none" }}
              >
                {" "}
                <FavoriteBorderIcon />{" "}
              </Link>
            </Grid>
            <Grid
              item
              xs={1.9}
              style={{
                padding: "16px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Button
                 onClick={handleMenuOpen}
                style={{ textDecoration: "none", margin: "0 20px" }}
              >
                <Avatar sx={{ width: 36, height: 36 }}>TT</Avatar>
              </Button>
              <MainMenu anchorEl={anchorElMen} handleClose={handleMenuClose} />
              <Link to={"/user/create-post"}>
                <But2>Đăng tin</But2>
              </Link>
              {/* <But3 onClick={handleLogout}>Đăng xuất</But3> */}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={0.6}></Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                alignItems: "center",
                padding: 0,
                justifyContent: "space-around",
              }}
            >
              <Link to={"/register"}>
                <But2>Đăng ký</But2>
              </Link>
              <Link to={"/login"}>
                <But2 >Đăng nhập</But2>
              </Link>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
