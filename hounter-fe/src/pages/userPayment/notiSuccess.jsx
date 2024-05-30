import React from "react";
import { Container, Typography, Button, Box, styled } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const But = styled(Button)({
    display: "flex",
    padding: "8px 12px",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
    borderRadius: "24px",
    background: "#10B981",
    color: "#FFF",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "12px",
    textTransform: "capitalize",
    "&:hover": {
      background: "rgba(16, 185, 129, 0.41)",
    },
  });

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  console.log(query);
  const handleGoBack = () => {
    navigate("/user/posts"); // Quay lại trang trước đó
  };

  return (
    <Box
    position="absolute"
    top="20%"
    left="35%"
    transform="translate(-50%, -50%)"
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="40vh"
    width="65vh"
      sx={{border: "1px solid gray", borderRadius: "20px"}}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom color={"#10B981"}>
          Thanh toán thành công
        </Typography>
        <Box sx={{marginLeft: "70px"}}>
            {/* <Typography>Mã đơn hàng: {query.get("post_id")}</Typography>
            <Typography>Mã giao dịch: {query.get("vnp_TransactionNo")}</Typography>
            <Typography>Số tiền: {query.get("vnp_Amount")}</Typography>
            <Typography>Ngày thanh toán: {query.get("vnp_PayDate")}</Typography> */}

            <Typography>Mã đơn hàng: 142</Typography>
            <Typography>Mã giao dịch: 3256821</Typography>
            <Typography>Số tiền: 15000</Typography>
            <Typography>Ngày thanh toán: 15/05/2024</Typography>
        </Box>
        <Typography variant="body1" align="center" gutterBottom style={{marginTop: "10px"}}>
          Cảm ơn bạn đã thanh toán đơn hàng của mình. Đơn hàng của bạn đã được xác nhận và được đăng trên website.
        </Typography>
        <Box mt={2} align="center" >
          <But variant="contained" color="primary" onClick={handleGoBack}>
            Quay lại trang quản lý tin đăng
          </But>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentSuccessPage;
