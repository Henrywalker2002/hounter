import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, styled, Grid, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VillaIcon from "@mui/icons-material/Villa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axiosBaseUrl from "../api/axiosBaseUrl";
import PostItem from "./PostItem";

const News = styled(Box)({
  padding: "20px 0px 30px 0px",
  alignItems: "center",
  backgroundColor: "#fff",
});
const Bar = styled("Box")({
  display: "flex",
  padding: "0px 30px 0px 30px",
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
const Title2 = styled(Typography)({
  color: "#1B1C57",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "700",
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
  padding: "0px 80px 0px 60px",
});

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    
    setCurrentPage(currentPage + 1); // Tăng trang lên 1
  };
  const handlePrePage = () => {
    setCurrentPage(currentPage - 1); // Tăng trang lên 1
  };
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
    console.log(page)
    setLoading(true);
    await axiosBaseUrl
      .get("posts", {
        params: {
          pageNo: page,
          pageSize: 10
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost(currentPage); // Sử dụng currentPage để fetch bài viết với trang hiện tại
  }, [currentPage]);

  return (
    <News>
      <Bar>
        <Grid container spacing={2}>
          <Grid item xs={6} md={12} style={{ display: "flex" }}>
            <Line />
            <Title1>Bản Tin</Title1>
          </Grid>
          <Grid item xs={6} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3} style={{ paddingLeft: "50px" }}>
                <Title2>Feature House</Title2>
              </Grid>
              <Grid item xs={6} md={2} />
              <Grid item xs={6} md={5}>
                {/* <ButBar
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
                </ButBar> */}
              </Grid>
              <Grid item xs={6} md={2}>
                <ButNext onClick={handlePrePage}>
                  <ArrowBackIosNewIcon />
                </ButNext>
                <ButNext onClick={handleNextPage}>
                  <ArrowForwardIosIcon  />
                </ButNext>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Bar>
      <NewBox>
        <Grid container spacing={2}>
          {posts?.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <PostItem data={item} />
            </Grid>
          ))}
        </Grid>
      </NewBox>
    </News>
  );
}
