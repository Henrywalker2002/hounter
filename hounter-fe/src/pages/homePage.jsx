import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Box, styled, Grid, Paper, Button } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import News from "../component/news";
import Footer from "../component/footer";

import HCM from "../image/HCM.jpg";
import HN from "../image/HN.jpg";
import DN from "../image/DN.jpg";
import axiosBaseUrl from "../api/axiosBaseUrl";
import Post4Motel from "../component/Post4Motel";


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
  fontSize: "44px",
  fontWeight: "700",
  lineHeight: "normal",
});
const Title1 = styled("div")({
  color: "#1B1C57",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "700",
  textTransform: "capitalize",
  padding: "15px 0px 0px 30px",
});
const Title2 = styled(Typography)({
  color: "#1B1C57",
  fontSize: "20px",
  fontWeight: "400",
  lineHeight: "normal",
  marginTop: "24px",
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
const BoxFil = styled(Grid)({
  marginTop: 0,
  color: "#000",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "normal",
  textTransform: "capitalize",
  alignItems: "center",
});
const Selection = styled("select")({
  border: "none",
  background: "#1B1C57",
  color: "#FFF",
  borderRadius: "32px",
  padding: "4px 8px",
  fontSize: "18px",
  marginTop: "5px",
  "&:focus": {
    outline: "none",
  },
  width: "150px",
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
  marginTop: "550px",
});
const BoxShow = styled(Grid)({
  backgroundColor: "#fff",
  borderRadius: "32px",
  display: "flex",
  padding: "12px",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "24px",
  color: "#1B1C57",
  alignItems: "center",
  height: "80px",
});
const ImgAvar = styled("img")({
  borderRadius: "56px",
  width: "45px",
  height: "45px",
  position: "absolute",
  border: "3px solid #FFF",
});

export default function HomePage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [city, setCity] = useState("Chọn Tỉnh/Thành phố"); // Lưu thành phố đã chọn
  const [district, setDistrict] = useState("Chọn Quận/Huyện"); // Lưu quận/huyện đã chọn
  const [ward, setWard] = useState("Chọn Phường/Xã"); // Lưu phường/xã đã chọn
  const [wardSelected, setWardSelected] = useState();
  const [category, setCategory] = useState(1);
  const [filterData, setFilterData] = useState({
    wardId: 26734,
    upperPrice: null,
    lowerPrice: null,
    category: category,
    status: "active",
  });
  const [searchValue, setSearchValue] = useState("");
  const handleChangePrice = (event) => {
    let upperPrice = null;
    let lowerPrice = null;
    const priceRange = event.target.value;
  
    // Set giá trị upper và lower tùy thuộc vào khoảng giá được chọn
    switch (priceRange) {
      case "p0":
        lowerPrice = null;
        upperPrice = null;
        break;
      case "p1":
        lowerPrice = null;
        upperPrice = 1000000;
        break;
      case "p2":
        lowerPrice = 1000000;
        upperPrice = 2000000;
        break;
      case "p3":
        lowerPrice = 2000000;
        upperPrice = 4000000;
        break;
      case "p4":
        lowerPrice = 4000000;
        upperPrice = null;
        break;
      default:
        break;
    }
    setFilterData({ ...filterData, lowerPrice, upperPrice });
    console.log(filterData)
  };
  

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue)
  };
  const handleCate = (event) => {
    setCategory(event.target.value);
  };
  useEffect(() => {
    axiosBaseUrl
      .get("/address")
      .then((res) => {
        setCities(res.data);
        const defaultCity = res.data.filter((city) => city.code == 79)[0];
        setCity(defaultCity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (typeof city == "string") return;
    axiosBaseUrl
      .get(`/address/province/${city.code}`)
      .then((res) => {
        setDistricts(res.data);
        setWards(res.data[0].wards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [city]);
  const handleDistrictChange = (districtCode) => {
    const selectedDistrict = districts.filter(
      (value) => value.code == districtCode
    )[0];
    setDistrict(selectedDistrict);
    setWards(selectedDistrict.wards);
  };
  const handleCityChange = (e) => {
    const selectedCity = cities.filter(
      (value) => value.code == e.target.value
    )[0];
    setCity(selectedCity);
  };
  const handleWardChange = (e) => {
    setFilterData({ ...filterData, wardId: e.target.value });
  };
  const handleChange = (name) => (event) => {
    setFilterData({ ...filterData, [name]: event.target.value });
  };
  const handleFilterClick = () => {
    fetchPost(filterData);
  };
  const fetchPost = async (filterData) => {
    console.log(filterData);
    const pageSize = 10; // Đặt giá trị pageSize tại đây
    const pageNo = 1; // Đặt giá trị pageNo tại đây
    await axiosBaseUrl
      .get("posts/filter", {
        params: { ...filterData, pageSize, pageNo },
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
  const handleSearchClick = async()=>{
      console.log(searchValue);
      const pageSize = 10; // Đặt giá trị pageSize tại đây
      const pageNo = 1; // Đặt giá trị pageNo tại đây
      await axiosBaseUrl
        .get("posts/search", {
          params: {
            pageSize,
            pageNo, 
            sortBy: "createAt", 
            sortDir: "desc",
            q: searchValue },
        })
        .then((res) => {
          setPosts(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  useEffect(() => {
  }, [filterData]);

  return (
    <Contain>
      <Grid container spacing={2} style={{ width: "90%", marginLeft: "5%" }}>
        <Grid item xs={6} md={6}>
          <Grid item xs={6} md={11}>
            <Item elevation={0}>
              <Title>Hỗ Trợ Tìm Nhà Trọ Uy Tín - Giá Rẻ</Title>
            </Item>
            <Item elevation={0}>
              <Title2>
                Khám phá mọi ngóc ngách, giúp bạn tìm một chỗ để an cư, nơi bắt
                đầu hành trình mới trong cuộc đời bạn.
              </Title2>
            </Item>
            <BoxSearch>
              <IconPlace />
              <CustomInput type="text" placeholder="Tìm kiếm" value={searchValue} onChange={handleSearch}/>
              <SearchBut onClick={handleSearchClick}>
                Tìm <ArrowForwardIosIcon />{" "}
              </SearchBut>
            </BoxSearch>
            <BoxFil container spacing={2}>
              <Grid item xs={6} md={9}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    Loại phòng
                    <Selection
                      name="category"
                      id="category"
                      value={filterData.category}
                      onChange={handleChange("category")}
                    >
                      <option value="1">Nhà trọ</option>
                      <option value="2">Ở ghép</option>
                      <option value="3">Homestay</option>
                    </Selection>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    Đơn giá
                    <Selection onChange={handleChangePrice}>
                    <option value="p0">Tất cả</option>
                      <option value="p1">Dưới 1 Triệu</option>
                      <option value="p2">1-2 Triệu</option>
                      <option value="p3">2-4 Triệu</option>
                      <option value="p4">Trên 4 Triệu</option>
                    </Selection>
                  </Grid>
                  <Grid item xs={6} md={4} />
                  <Grid item xs={6} md={4}>
                    Thành phố
                    <Selection
                      value={city.code}
                      defaultValue={79}
                      onChange={handleCityChange}
                    >
                      {cities.map((cityName) => (
                        <option key={cityName.code} value={cityName.code}>
                          {" "}
                          {cityName.nameWithType}{" "}
                        </option>
                      ))}
                    </Selection>
                  </Grid>
                  {city && (
                    <Grid item xs={6} md={4}>
                      Quận/huyện
                      <Selection
                        value={district.code}
                        defaultValue={760}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                      >
                        {districts.map((districtName) => (
                          <option
                            key={districtName.code}
                            value={districtName.code}
                          >
                            {" "}
                            {districtName.nameWithType}{" "}
                          </option>
                        ))}
                      </Selection>
                    </Grid>
                  )}
                  {district && (
                    <Grid item xs={6} md={4}>
                      Phường xã
                      <Selection
                        value={ward.code}
                        defaultValue={26734}
                        onChange={handleWardChange}
                      >
                        {wards &&
                          wards.map((wardObj) => (
                            <option key={wardObj.code} value={wardObj.code}>
                              {wardObj.nameWithType}
                            </option>
                          ))}
                      </Selection>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={6} md={3} style={{ textAlign: "right" }}>
                <SearchBut
                  style={{ width: "80%", marginLeft: "10%" }}
                  onClick={handleFilterClick}
                >
                  Lọc <FilterAltIcon />
                </SearchBut>
              </Grid>
            </BoxFil>
            <BoxCity container spacing={1}>
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
          </Grid>
        </Grid>
        <Grid item xs={6} md={1} />
        <BoxAdver item xs={6} md={5}>
          <Grid container>
            <BoxShow item xs={6} md={5}>
              <Grid item xs={6} md={6}>
                <ImgAvar src={HCM} style={{ transform: "translateY(-50%)" }} />
                <ImgAvar
                  src={HCM}
                  style={{ transform: "translateX(+50%) translateY(-50%)" }}
                />
                <ImgAvar
                  src={HCM}
                  style={{ transform: "translateX(+100%) translateY(-50%)" }}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                1K+ Người dùng
              </Grid>
            </BoxShow>
            <Grid item xs={6} md={1} />
            <BoxShow item xs={6} md={5}>
              <Grid item xs={6} md={4}>
                <ImgAvar src={HCM} style={{ transform: "translateY(-50%)" }} />
              </Grid>
              <Grid item xs={6} md={6}>
                45K+ Phòng cho thuê
              </Grid>
            </BoxShow>
          </Grid>
        </BoxAdver>
      </Grid>
      <Box style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} style={{marginLeft: "5%" }}>
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <Box >
                <Title1>Kết quả tìm kiếm</Title1>
                <Box sx={{marginLeft: "30vh"}}>
                  <Post4Motel data={item} key={index} />
                </Box>
              </Box>
            ))
          ) : (
            <Box>
                <Title1>Kết quả tìm kiếm</Title1>
                <Typography>Không tìm thấy</Typography>
              </Box>
          )}
        </Grid>
      </Box>
      
      <News />
      <Footer />
    </Contain>
  );
}
