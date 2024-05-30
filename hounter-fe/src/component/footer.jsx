import * as React from "react";
import { Box, styled, Grid } from "@mui/material";
import Logo from "../image/logo.png";

const Foot = styled(Box)({
  padding: "20px 100px 5px 80px",
  backgroundColor: '#fff',
  // marginTop: '5vh',
  top: 1000,
  left: 0,
  borderTop: "solid 1px #747474"
});
const Title = styled("div")({
  color: "#1B1C57",
  fontSize: "18px",
  alignItems: "center",
  display: "flex",
  fontWeight: "700",
});
const Image = styled("img")({
  marginRight: "7px",
});
const Aver = styled("div")({
  width: "70%",
  color: "#626687",
  fontSize: "18px",
  fontWeight: "400px",
  lineHeight: '24px',
  marginTop: '10px'
});
const Title2 = styled('div')({
color: '#0E1735',
fontSize: '20px',
fontWeight: '600',
paddingBottom: '10px'
})
const Infor = styled('div')({
    color: "#626687",
    fontSize: "18px",
    fontWeight: "400px",
    padding: '5px 0px 5px 0px'
})
export default function Footer() {
  return (
    <Foot>
      <Grid container spacing={2}>
        <Grid item xs={6} md={5}>
          <Title>
            <Image src={Logo} alt="logo" /> Hounter
          </Title>
          <Aver>
          Khám phá mọi ngóc ngách, giúp bạn tìm một chỗ để an cư, nơi bắt đầu hành trình mới trong cuộc đời bạn.
          </Aver>
        </Grid>
        <Grid item xs={6} md={2}>
            <Title2>Dịch vụ</Title2>
            <Infor>Phòng trọ</Infor>
            <Infor>Homestay</Infor>
            <Infor>Ở ghép</Infor>
        </Grid>
        <Grid item xs={6} md={2}>
            <Title2>Hỗ trợ</Title2>
            <Infor>Hỗ trợ đăng tin</Infor>
            <Infor>Quy tắc đăng tin</Infor>
        </Grid>
        <Grid item xs={6} md={3}>
            <Title2>Liên lạc</Title2>
            <Infor>123 Tạ Quang Bửu, Linh Trung, TP Thủ Đức</Infor>
            <Infor>0312345645</Infor>
            <Infor>info@hounter.com</Infor>
        </Grid>
      </Grid>
    </Foot>
  );
}
