import * as React from "react";
import { useState, useEffect } from "react";
import { Typography, Box, styled, Grid, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VillaIcon from "@mui/icons-material/Villa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Post4Motel from "./Post4Motel";
import HCM from "../image/HCM.jpg";
import PaidIcon from "@mui/icons-material/Paid";
import CropIcon from "@mui/icons-material/Crop";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ContactPhoneIcon from "../image/phone.svg";
import MessageIcon from "../image/message-circle-outline.svg";
import axiosBaseUrl from "../api/axiosBaseUrl";
import { useNavigate } from "react-router-dom";
import { formatter } from "../helpers/helper";

const News = styled(Box)({
  padding: "10px 10vh 30px 10vh",
  alignItems: "center",
  backgroundColor: "#fff",
  marginTop: "4vh ",
});
const Bar = styled("Box")({
  display: "flex",
});
const Line = styled("div")({
  borderTop: "1px solid #F59E0B",
  margin: "5px 5px 0px 0px",
  width: "36px",
});
const Title1 = styled("div")({
  color: "#F59E0B",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  textTransform: "capitalize",
});
const ButBar = styled(Button)(({ isSelected }) => ({
  marginLeft: "20px",
  padding: "12px 12px 12px 12px",
  alignItems: "center",
  gap: "8px",
  borderRadius: "32px",
  border: "1px solid",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "28px",
  textTransform: "capitalize",
  color: isSelected ? "#10B981" : "#888B97",
  backgroundColor: isSelected ? "#D1FAE5" : "#fff",
  borderColor: isSelected ? "#fff" : "#E0E3EB",
}));
const ButNext = styled(Button)({
  padding: "12px 16px",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  backgroundColor: "rgba(16, 185, 129, 0.41)",
  "&:hover": {
    background: "rgba(16, 185, 129, 0.41)",
  },
  borderRadius: "32px",
  marginLeft: "10px",
  height: "48px",
  width: "48px",
});
const NewBox = styled(Box)({
  padding: "30px 80px 0px 60px",
});
const Image = styled("img")({
  borderRadius: "24px",
  width: "90%",
  height: "25vh",
});
const ImgAvar = styled("img")({
  borderRadius: "56px",
  width: "55px",
  height: "55px",
  position: "absolute",
  border: "3px solid #FFF",
});
const Name = styled(Grid)({
  color: "#0E1735",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "20px",
  marginTop: "5px",
});
const UserName = styled("div")({
  color: "#0E1735",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "24px",
});
const Address = styled("div")({
  color: "#888B97",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "22px",
  alignItems: "center",
  display: "flex",
  marginTop: "10px",
});
const Com = styled(Grid)({
  color: "#888B97",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "22px",
  alignItems: "center",
  display: "flex",
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

export default function NewMotel() {
  const [isNewlyPostedSelected, setNewlyPostedSelected] = useState(true);
  const [isPopularSelected, setPopularSelected] = useState(false);
  const [isLovedSelected, setLovedSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const handleButBar = (type) => {
    if (type === "newlyPosted") {
      setNewlyPostedSelected(true);
      setPopularSelected(false);
      setLovedSelected(false);
    } else if (type === "popular") {
      setNewlyPostedSelected(false);
      setPopularSelected(true);
      setLovedSelected(false);
    } else if (type === "loved") {
      setNewlyPostedSelected(false);
      setPopularSelected(false);
      setLovedSelected(true);
    }
  };

  const fetchPost = async (page) => {
    await axiosBaseUrl
      .get("posts", {
        params: {
          pageNo: page,
        },
      })
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost(1);
  }, [loading]);

  return (
    <News>
      <Bar>
        <Grid
          container
          spacing={2}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={6} md={2} style={{ display: "flex" }}>
            <Line />
            <Title1>Bản Tin Nhà Trọ</Title1>
          </Grid>
          <Grid item xs={6} md={10}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3} />
              <Grid item xs={6} md={6}>
                <ButBar
                  isSelected={isNewlyPostedSelected}
                  onClick={() => handleButBar("newlyPosted")}
                >
                  <BookmarkIcon />
                  Mới đăng
                </ButBar>
                <ButBar
                  isSelected={isPopularSelected}
                  onClick={() => handleButBar("popular")}
                >
                  <VillaIcon />
                  Phổ biến
                </ButBar>
                <ButBar
                  isSelected={isLovedSelected}
                  onClick={() => handleButBar("loved")}
                >
                  <FavoriteIcon />
                  Được yêu thích
                </ButBar>
              </Grid>
              <Grid item xs={6} md={3}>
                <ButNext>
                  <ArrowBackIosNewIcon />
                </ButNext>
                <ButNext>
                  <ArrowForwardIosIcon />
                </ButNext>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Bar>
      <NewBox>

      <Grid container >
          {posts?.map((item, index) => (
              <Post4Motel data={item} key={index} />
          ))}
        </Grid>

      </NewBox>
    </News>
  );
}
