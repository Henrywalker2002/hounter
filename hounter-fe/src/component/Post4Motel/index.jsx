import React from "react";
import { Grid, styled, Button, Box, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CropIcon from "@mui/icons-material/Crop";
import HCM from "../../image/HCM.jpg";
import { useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PaidIcon from "@mui/icons-material/Paid";


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
  textAlign: "left",
});
const UserName = styled("div")({
  color: "#0E1735",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "24px",
  textAlign: "left",
});
const Address = styled("div")({
  color: "#888B97",
  fontSize: "14px",
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
  marginBottom: "10px",
  marginTop: "10px",
});
const ContactBut = styled(Button)({
  padding: "12px 16px",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  fontSize: "14px",
  textTransform: "capitalize",
  backgroundColor: "rgba(16, 185, 129, 0.41)",
  "&:hover": {
    background: "rgba(16, 185, 129, 0.41)",
  },
  borderRadius: "32px",
});
const Post4Motel = (props) => {
  console.log(props)
  const postItem = props?.data;
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/detail/${postItem.id}`);
  };
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });
  return (
    <Button onClick={navigateToDetail} style={{ width: "100vh" }}>
      <Grid item md={6}>
        <Name>{postItem.title}</Name>
        <Address>
          <PlaceOutlinedIcon style={{ marginRight: "5px" }} />
          {postItem.address}
        </Address>
        <Grid container>
          <Com item md={6}>
            <CropIcon style={{ marginRight: "5px" }} /> {`${postItem.area}m2`}
          </Com>
          <Com item md={6}>
            <PaidIcon style={{ marginRight: "5px" }} />{" "}
            {formatter.format(postItem.price)}
          </Com>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{ alignItems: "center", display: "flex", paddingTop: "10px" }}
        >
          <Grid
            item
            xs={2}
            md={1}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ImgAvar src={postItem.owner?.avatar}/>
          </Grid>
          <Grid item xs={2} md={10} style={{ alignItems: "center", marginLeft: "3vh" }}>
            <UserName>{postItem.owner?.fullName}</UserName>
            <Address style={{ display: "flex", textAlign: "center" }}>
              {/* <ContactPhoneIcon
                width="24"
                height="24"
                style={{ marginRight: "5px" }}
              /> */}
              Sđt: {postItem.phone}
            </Address>
          </Grid>
          
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Image src={postItem.image} />
      </Grid>
    </Button>
  );
};
export default Post4Motel;
