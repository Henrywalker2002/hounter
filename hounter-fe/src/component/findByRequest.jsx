import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  styled,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Maps4Re from "./Maps4Re";
import axiosBaseUrl from "../api/axiosBaseUrl";

const RequestBox = styled(Grid)({
  padding: "20px 0px 30px 30px",
  alignItems: "center",
  backgroundColor: "#fff",
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
const Title2 = styled(Typography)({
  color: "#1B1C57",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "700",
  textTransform: "capitalize",
  padding: "15px 0px 0px 30px",
});
const InputReq = styled(Grid)({
  // marginTop: "15px",
  marginLeft: "15px",
});
const Selection = styled("select")({
  border: "none",
  background: "#ff7008",
  color: "#FFF",
  borderRadius: "32px",
  padding: "4px 8px",
  fontSize: "18px",
  marginTop: "5px",
  "&:focus": {
    outline: "none",
  },
  width: "170px",
});
const Title3 = styled(Typography)({
  color: "0C1537",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "600",
});
const SearchBut = styled(Button)({
  display: "flex",
  padding: "12px 16px",
  alignItems: "center",
  gap: "4px",
  flexShrink: 0,
  borderRadius: "32px",
  background: "#10B981",
  color: "#FFF",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "22px",
  textTransform: "capitalize",
  "&:hover": {
    background: "rgba(16, 185, 129, 0.41)",
  },
});
// const Icon = styled(LocationSearchingIcon)({
//   width: "35px",
//   height: "35px",
//   marginLeft: "5px",
// });

export default function FBD() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [city, setCity] = useState(79); // Lưu thành phố đã chọn
  const [district, setDistrict] = useState(760); // Lưu quận/huyện đã chọn
  const [ward, setWard] = useState(26734); // Lưu phường/xã đã chọn
  const [showMap, setShowMap] = useState(false); // State để kiểm soát việc hiển thị Map
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  const [filterData, setFilterData] = useState({
    pageSize: 10,
    pageNo: 1,
    type: "MARKET",
    wardId: 26734,
  });

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
  //handle
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
  const handleTypeChange = (e) => {
    setFilterData({ ...filterData, type: e.target.value });
  };
  const handleConfirm = async () => {
    console.log(filterData);
    await axiosBaseUrl
      .get("place", {
        params: { ...filterData },
      })
      .then((res) => {
        if(res.data.length === 0){
          showSnackbar()
        }
        else{
          setData(res.data);
          setShowMap(true);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <RequestBox containter spacing={6}>
      <Box>
        <Bar>
          <Line />
          <Title1>Tìm kiếm theo yêu cầu</Title1>
        </Bar>
        <Title2>Nhập yêu cầu</Title2>
      </Box>
      {!showMap && (
        <InputReq container spacing={6}>
          <Grid item xs={6} md={9}>
            <Grid container spacing={4}>
              <Grid item xs={6} md={2.5}>
                <Title3>Thành phố</Title3>
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
                <Grid item xs={6} md={2.5}>
                  <Title3>Quận/huyện</Title3>
                  <Selection
                    value={district.code}
                    defaultValue={760}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                  >
                    {districts.map((districtName) => (
                      <option key={districtName.code} value={districtName.code}>
                        {" "}
                        {districtName.nameWithType}{" "}
                      </option>
                    ))}
                  </Selection>
                </Grid>
              )}
              {district && (
                <Grid item xs={6} md={2.5}>
                  <Title3>Phường xã</Title3>
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
              <Grid item xs={3} md={2.5}>
                <Title3>Tiện ích</Title3>
                <Selection onChange={handleTypeChange}>
                  <option value="MARKET">Chợ</option>
                  <option value="SUPERMARKET">Siêu thị</option>
                  <option value="HOSPITAL">Bệnh viện</option>
                  <option value="HIGHER_SCHOOL">Trường THPT</option>
                  <option value="SECONDARY_SCHOOL">Trường THCS</option>
                  <option value="PRIMARY_SCHOOL">Trường tiểu học</option>
                  <option value="COMMERCIAL_CENTER">
                    Trung tâm thương mại
                  </option>
                  <option value="GROCERY_STORE">Tạp hóa</option>
                </Selection>
              </Grid>
              <Grid item xs={3} md={2} alignItems={"center"} display={"flex"}>
                <SearchBut onClick={handleConfirm}>Xác Nhận</SearchBut>
              </Grid>
            </Grid>
          </Grid>
        </InputReq>
      )}
      {showMap && <Maps4Re data={data} />}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={"error"}>
          Không tìm thấy tiện ích
        </Alert>
      </Snackbar>
    </RequestBox>
  );
}
