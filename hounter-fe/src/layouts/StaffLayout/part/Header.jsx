import React from "react";
import {
  AppBar,
  Typography,
  Grid,
  styled,
  Button,
  Avatar,
} from "@mui/material";
import Logo from "../../../image/logo.png";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminMenu from "../../menuForAdmin";

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

const StaffHeader = () => {
  const [anchorElMen, setAnchorElMen] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorElMen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMen(null);
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
            <Title>Hounter Staff</Title>
          </div>
        </Grid>
        <Grid item lg={2}></Grid>
        <Grid item lg={4} style={{display:"flex", justifyContent: "space-between",alignItems: "center",}}>
          <Link to={"/staff/accounts"}>
            <ButtonNavbar className={location.pathname === "/admin/accounts" ? "active" : ""}>Tài Khoản</ButtonNavbar>
          </Link>
          <Link to={"/staff/posts"}>
            <ButtonNavbar className={location.pathname === "/admin/posts" ? "active" : ""}>Tin Đăng</ButtonNavbar>
          </Link>
          <Link to={"/staff/feedbacks"}>
            <ButtonNavbar className={location.pathname === "/admin/feedbacks" ? "active" : ""}>Báo Cáo</ButtonNavbar>
          </Link>
          <Link to={"/staff/payment"}>
            <ButtonNavbar className={location.pathname === "/admin/payment" ? "active" : ""}>Thanh toán</ButtonNavbar>
          </Link>
        </Grid>
        <Grid item lg={1}></Grid>
        <Grid item lg={1} style={{display:"flex", justifyContent: "space-around",alignItems: "center"}}>
          <Link to={"/staff/posts"} style={{ color: "white", textDecoration: "none" }}>
            {" "}
            <ChatIcon />{" "}
          </Link>
          <Link to={"/staff/posts"} style={{ color: "white", textDecoration: "none" }}>
            {" "}
            <NotificationsIcon />{" "}
          </Link>
          <Button
            onClick={handleMenuOpen}
            style={{ textDecoration: "none"}}
          >
            <Avatar sx={{ width: 36, height: 36 }}>TT</Avatar>
          </Button>
          <AdminMenu anchorEl={anchorElMen} handleClose={handleMenuClose} />
        </Grid>
      </Grid>
    </AppBar>
  );
};
export default StaffHeader;
