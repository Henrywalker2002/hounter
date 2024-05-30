import React, { useState } from "react";
import { Box, Grid, Typography, styled, Button } from "@mui/material";
import DelAcc from "../AccountList/DelAcc";
import ReDel from "../AccountManage/ReDel"
import { useCookies } from "react-cookie";

const Title = styled(Typography)({
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
});

const CustomBox = styled(Box)({
  marginTop: "10px",
});

const PostAvar = styled("img")({
  borderRadius: "24px",
  width: "100%",
  height: "25vh",
});
const ButtonDel = styled(Button)({
  width: "120px",
  height: "36px",
  color: "white",
  background: "#ff7008",
  borderRadius: "32px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  textTransform: "none",
  "&:hover": {
    background: "#ff7008",
  },
  marginLeft: "10px",
});

export default function UserAccountDetail(props) {
  const { accountDetail } = props;
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["jwt"]);
  const cookieData = cookies.jwt;
  const [openRe, setOpenRe] = useState(false)
  const handleClick = ()=>{
    if(cookieData && cookieData.roles.includes("STAFF"))
      {setOpenRe(true)}
    else{
      setOpen(true)
    }
  }

  return (
    <Box
      style={{
        backgroundColor: "white",
        marginTop: "5px",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{
          color: "#f59e0b",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "700",
          textTransform: "capitalize",
          padding: "0px 0px 10px 0px",
          marginLeft: "20px",
        }}
      >
        {" "}
        Quản lý tài khoản / Xem chi tiết
      </Typography>
      <Grid container sx={{ width: "80%", marginLeft: "10%" }}>
        <Grid item xs={6}>
          <CustomBox>
            <Title display="inline">ID: </Title>
            <Typography display="inline"> {accountDetail.id}</Typography>
          </CustomBox>
          <CustomBox>
            <Title display="inline">Họ và Tên: </Title>
            <Typography display="inline"> {accountDetail.fullName}</Typography>
          </CustomBox>
        </Grid>
        <Grid item xs={6}>
          <CustomBox>
            <Title display="inline">Tên người dùng: </Title>
            <Typography display="inline"> {accountDetail.username}</Typography>
          </CustomBox>
          <CustomBox>
            <Title display="inline">Email: </Title>
            <Typography display="inline"> {accountDetail.email}</Typography>
          </CustomBox>
        </Grid>
        <Grid item xs={6}>
          <CustomBox>
            <Title display="inline">Địa chỉ: </Title>
            <Typography display="inline"> {accountDetail.address}</Typography>
          </CustomBox>
          <CustomBox>
            <Title display="inline">Số điện thoại: </Title>
            <Typography display="inline"> {accountDetail.phone}</Typography>
          </CustomBox>
        </Grid>

        <Grid item xs={12}>
          <Title>Bài viết đã đăng gần đây: </Title>
          {accountDetail.postList && accountDetail.postList.length > 0 ? (
            accountDetail.postList.map((post, index) => (
              <CustomBox
                key={index}
                style={{
                  backgroundColor: "#D1FAE5",
                  borderRadius: 10,
                  padding: "20px 50px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>{post.title}</Typography>
                    <Grid container>
                      <Grid xs={6}>Diện tích: {post.area}</Grid>
                      <Grid xs={6}>Giá tiền: {post.price}</Grid>
                    </Grid>
                    <Typography>Trạng thái: {post.status}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <PostAvar src={post.image} />
                  </Grid>
                </Grid>
              </CustomBox>
            ))
          ) : (
            <Typography>Chưa có bài viết nào</Typography>
          )}
          <Box
          sx={{
            padding: "10px 50px",
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonDel
            onClick={handleClick}
          >
            Khóa tài khoản
          </ButtonDel>
          <DelAcc open={open} setOpen={setOpen} id={accountDetail.id} />
          <ReDel open={openRe} setOpen={setOpenRe} id={accountDetail.id}/>
        </Box>
        </Grid>
        
      </Grid>
      
    </Box>
  );
}
