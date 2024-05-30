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
    background: "#ff7008",
    color: "#FFF",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "12px",
    textTransform: "capitalize",
    "&:hover": {
      background: "rgba(16, 185, 129, 0.41)",
    },
  });

const PaymentFailurePage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
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
    height="35vh"
    width="70vh"
      sx={{border: "1px solid gray", borderRadius: "20px"}}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom color={"#ff7008"}>
          Thanh toán không thành công
        </Typography>
        <Box sx={{marginLeft: "70px"}}>
            <Typography>Mã đơn hàng: 42</Typography>
            {/* <Typography>Mã giao dịch:</Typography> */}
            <Typography>Số tiền: 25000</Typography>
        </Box>
        <Typography variant="body1" align="center" gutterBottom style={{marginTop: "10px"}}>
          Đã có lỗi xảy ra khi thanh toán, vui lòng thử lại. Hoặc liên hệ với chúng tôi để được giúp đỡ.
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

export default PaymentFailurePage;
