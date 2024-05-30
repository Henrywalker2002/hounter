import * as React from "react";
import { useState, useEffect } from "react";
import { Typography, Box, styled, Grid, Paper, Button } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import NewMotel from "../component/newMotel";
import Footer from "../component/footer";
import HCM from "../image/HCM.jpg";
import HN from "../image/HN.jpg";
import DN from "../image/DN.jpg";
import axiosBaseUrl from "../api/axiosBaseUrl";
import Post4Motel from "../component/Post4Motel";
import News from "../component/news"

const CustomInput = styled("input")({
  border: "none",
  width: "70%",
  marginRight: "2.5%",
  fontSize: "16px",
  "&:focus": {
    outline: "none",
  },
});
const Contain = styled(Box)({
  marginTop: "84px",
  position: "fixed",
  overflowY: "scroll",
  height: "90vh",
});
const Title = styled(Typography)({
  color: "#1B1C57",
  fontSize: "32px",
  fontWeight: "700",
  lineHeight: "normal",
});
const Title2 = styled(Typography)({
  color: "#1B1C57",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "normal",
});
const Item = styled(Paper)({
  backgroundColor: "rgb(255,255,255, 0%)",
  width: "496px",
});
const BoxSearch = styled(Box)({
  marginTop: "24px",
  border: "2px solid #E0E3EB",
  borderRadius: "32px",
  width: "90%",
  padding: "4px 4px 4px 7%",
  alignItems: "center",
  display: "flex",
  backgroundColor: "#fff",
});
const IconPlace = styled(FmdGoodIcon)({
  width: "8%",
  height: "8%",
  flexShrink: 0,
  color: "#F59E0B",
  marginRight: "2.5%",
});
const SearchBut = styled(Button)({
  display: "flex",
  width: "20%",
  padding: "12px 16px",
  alignItems: "center",
  gap: "4px",
  flexShrink: 0,
  borderRadius: "32px",
  background: "rgba(16, 185, 129, 0.41)",
  color: "#FFF",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "22px",
  textTransform: "capitalize",
  "&:hover": {
    background: "rgba(16, 185, 129, 0.41)",
  },
});
const PostBut = styled(Button)({
  display: "flex",
  padding: "16px 24px",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "32px",
  gap: 16,
  background: "rgba(16, 185, 129, 0.41)",
  color: "#FFF",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "22px",
  width: "80%",
  marginLeft: "20%",
  textTransform: "capitalize",
  "&:hover": {
    background: "rgba(16, 185, 129, 0.41)",
  },
});
const BoxCity = styled(Grid)({
  marginTop: "15px",
  marginLeft: 0,
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "400",
  color: "#0E1735",
  lineHeight: "normal",
  alignItems: "center",
});
const Image = styled("img")({
  borderRadius: "24px",
  width: "90%",
  height: "225px",
});
const BoxAdver = styled(Grid)({
  marginTop: "2vh",
});
const BoxShow = styled(Grid)({
  backgroundColor: "#fff",
  borderRadius: "32px",
  display: "flex",
  padding: "5px",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "24px",
  color: "#1B1C57",
  alignItems: "center",
  marginTop: '2vh'
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
  marginBottom: "15px",
});
const FindByPos = styled(Grid)({
  display: "flex",
  alignItems: "center",
});
const TitleShow = styled(Grid)({
  color: "#0E1735",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "500",
  padding: "12px",
});
const Tab = styled(Grid)({
  color: "#888B97",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "500",
});
const TabLink = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "5px",
});
const IconArr= styled(ArrowForwardIosIcon)({
    width: '20px',
    height: '20px'
})

export default function Homestay() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [coordinates, setCoordinates] = useState({  });
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    const data = {
      pageNo: 1,
      pageSize: 10,
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    };
    fetchPost(data);

  };
  
  const fetchPost = async (data) => {
    await axiosBaseUrl
      .get("posts/search-on-map", {
        params: {
          pageNo: data.pageNo,
          pageSize: data.pageSize,
          longitude: data.longitude,
          latitude: data.latitude,
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
  return (
    <Contain>
      <Grid container spacing={2} style={{ width: "90%", marginLeft: "5%" }}>
        <Grid item xs={6} md={6}>
          <Grid item xs={6} md={11}>
            <Item elevation={0}>
              <Title>Homestay</Title>
            </Item>
            <BoxSearch>
              <IconPlace />
              <CustomInput type="text" placeholder="Tìm kiếm" />
              <SearchBut>
                Tìm <ArrowForwardIosIcon />{" "}
              </SearchBut>
            </BoxSearch>
            <BoxCity container>
              <Grid item xs={6} md={12} style={{ display: "flex" }}>
                <Line />
                <Title1>Bản Tin</Title1>
              </Grid>
              <Grid item xs={6} md={4}>
                <Image src={HCM} />
                TP Hồ Chí Minh
              </Grid>
              <Grid item xs={6} md={4}>
                <Image src={DN} />
                TP Đà Nẵng
              </Grid>
              <Grid item xs={6} md={4}>
                <Image src={HN} />
                TP Hà Nội
              </Grid>
            </BoxCity>
            <FindByPos container>
              <Grid item xs={6} md={12} style={{ display: "flex", marginTop: '15px' }}>
                <Line />
                <Title1>Tìm Kiếm Theo Vị trí</Title1>
              </Grid>
              <Grid item xs={6} md={8}>
                <Title2>Tìm Kiếm Dựa Trên Vị trí Hiện Tại Của Bạn</Title2>
              </Grid>
              <Grid item xs={4}>
                <PostBut onClick={getLocation}>Tìm Kiếm</PostBut>
              </Grid>
            </FindByPos>
          </Grid>
        </Grid>
        <Grid item xs={6} md={1} />
        <BoxAdver md={5}>
          <BoxShow container sx={{marginTop:"43vh"}}>
            <TitleShow item  md={12}>
              Có thể bạn quan tâm
            </TitleShow>
            <Tab item md={12}>
              <TabLink>
                <IconArr />
                Mẫu hợp đồng cho thuê phòng trọ
              </TabLink>
              <TabLink>
                <IconArr />
                Cẩn thận lừa đảo khi thuê phòng trọ
              </TabLink>
              <TabLink>
                <IconArr />
                Kinh nghiệm thuê phòng trọ cho sinh viên
              </TabLink>
            </Tab>
          </BoxShow>
        </BoxAdver>
      </Grid>
      <Box style={{ marginTop: "10px", backgroundColor: "#fff"}}>
      <Title style={{ marginLeft: "5%"}}>Kết quả tìm kiếm</Title>
        <Grid container style={{width: "70%", marginLeft: '15%', marginTop: "10px"}}>
          {posts?.map((item, index) => (
              <Post4Motel data={item} key={index} />
          ))}
        </Grid>
      </Box>
      <News/>
      <Footer />
    </Contain>
  );
}
