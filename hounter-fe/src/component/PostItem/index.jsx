import React from "react";
import { Grid, styled, Button, Box,Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CropIcon from "@mui/icons-material/Crop";
import HCM from "../../image/HCM.jpg";
import { useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
const Image = styled("img")({
  borderRadius: "24px",
  width: "100%",
  height: "250px",
});
const ImgAvar = styled("img")({
  borderRadius: "56px",
  width: "45px",
  height: "45px",
  position: "absolute",
  border: "3px solid #FFF",
});
const Name = styled(Grid)({
  color: "#0E1735",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "32px",
  marginTop: "5px",
});
const UserName = styled("div")({
  color: "#0E1735",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "24px",
  textAlign: "left"
});
const Address = styled("div")({
  color: "#888B97",
  fontSize: "13px",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  textTransform: "none"
});
const Com = styled(Grid)({
  color: "#888B97",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "22px",
  alignItems: "center",
  display: "flex",
});
const Title2 = styled(Typography)({
    color: "#1B1C57",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    textTransform: "capitalize",
    textAlign: "left",
    marginTop: "10px"
  });
const PostItem = (props) => {
  const postItem = props.data;
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/detail/${postItem.id}`);
  };
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });
  return (
    <Button onClick={navigateToDetail} style={{ flexDirection: "column" }}>
      {/* <Image src={postItem.image} />
      <Box style={{marginTop: "5px"}}>
        <Title2>{postItem.title}</Title2>
        <Grid container spacing={0} style={{marginBottom: "5px"}}>
          <Grid item xs={12} lg={6}>
            <Com>
              <AttachMoneyIcon style={{ marginRight: "2px" }} />
              {formatter.format(postItem.price)}
            </Com>
          </Grid>
          <Grid item xs={0} lg={2}></Grid>
          <Grid item xs={12} lg={4}>
            <Com>
              <CropIcon style={{ marginRight: "2px" }} />
              {`${postItem.area}m2`}
            </Com>
          </Grid>
        </Grid>
        <Address>{postItem.address}</Address>
      </Box> */}
      <Grid container spacing={2}>
        <Grid item xs={2} md={12}>
        <Image src={postItem.image} />
        <Title2>{postItem.title}</Title2>
          <Grid container spacing={2}>
            <Com item xs={6} md={6}>
              <AttachMoneyIcon style={{ marginRight: "2px" }} />
              {formatter.format(postItem.price)}
            </Com>
            <Com item xs={6} md={6}>
              <CropIcon style={{ marginRight: "5px" }} />
              {`${postItem.area}m2`}
            </Com>
          </Grid>
          <Address> <PlaceOutlinedIcon style={{ marginRight: "5px" }}/> {postItem.address} </Address>
        </Grid>
        <Grid item xs={2} md={12}>
          <Grid
            container
            spacing={2}
            style={{ alignItems: "center", display: "flex" }}
          >
            <Grid
              item
              xs={2}
              md={2}
              style={{ display: "flex", alignItems: "center" }}
            >
              <ImgAvar src={postItem.owner.avatar || HCM} />
            </Grid>
            <Grid
              item
              xs={2}
              md={9}
              style={{ alignItems: "center", marginLeft: "10px" }}
            >
              <UserName>{postItem.owner.fullName}</UserName>
              <Address>Sđt:{postItem.phone}</Address>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
};
export default PostItem;
