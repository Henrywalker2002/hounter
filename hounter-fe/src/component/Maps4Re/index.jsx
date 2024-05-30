import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import { Box, Button, Typography, styled, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axiosBaseUrl from "../../api/axiosBaseUrl";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const USERNAME = "thanhtuancsk20";
const STYLE_ID = "clgfhviyf001v01qtabbzghph";
const ACCESS_TOKEN =
  "pk.eyJ1IjoidGhhbmh0dWFuY3NrMjAiLCJhIjoiY2xyZGRnZHYxMGZqazJqbzNiY3pjNTdzdiJ9.lCNHVLuQsMyIx41kAZGE7g";

const iconPerson = new L.Icon({
  iconUrl:
    "https://firebasestorage.googleapis.com/v0/b/bhx-clone-5db5a.appspot.com/o/marker.png?alt=media&token=861d37da-9d43-49cb-ab48-da360cdbc6b1",
  iconRetinaUrl:
    "https://firebasestorage.googleapis.com/v0/b/bhx-clone-5db5a.appspot.com/o/marker.png?alt=media&token=861d37da-9d43-49cb-ab48-da360cdbc6b1",
  iconSize: [30, 40],
});
const iconResult = new L.Icon({
  iconUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSR7uagvRdBlgyI9fsT7t3mOaZUpgekFOvCEjPI2qYOg&s",
  iconRetinaUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSR7uagvRdBlgyI9fsT7t3mOaZUpgekFOvCEjPI2qYOg&s",
  iconSize: [40, 40],
});
const Title3 = styled(Typography)({
  color: "0C1537",
  fontSize: "28px",
  fontStyle: "normal",
  fontWeight: "600",
});
const Title4 = styled(Typography)({
  color: "0C1537",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  margin: "3px 15px 0 0",
});
const CustomInput = styled("input")({
  border: "solid 1px #737373",
  color: "#737373",
  width: "80%",
  padding: "8px 16px",
  display: "flex",
  borderRadius: "32px",
  marginRight: "2.5%",
  fontSize: "16px",
  backgroundColor: "#fff",
  "&:focus": {
    outline: "none",
  },
  "::placeholder": {
    color: "#737373",
  },
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
  width: "100px",
});
const Selection2 = styled("select")({
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
  width: "150px",
});
const But = styled(Button)({
  display: "flex",
  padding: "4px 8px",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "32px",
  background: "#10B981",
  color: "#FFF",
  fontSize: "18px",
  fontWeight: "400",
  textTransform: "none",
  "&:hover": {
    background: "#10B981",
  },
});
const ButSearch = styled(Button)({
  display: "flex",
  padding: "8px 12px",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "32px",
  background: "#10B981",
  color: "#FFF",
  fontSize: "20px",
  fontWeight: "600",
  textTransform: "capitalize",
  "&:hover": {
    background: "#10B981",
  },
});
const ButDel = styled(Button)({
  display: "flex",
  padding: "2px 4px",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "32px",
  background: "#737373",
  color: "#FFF",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "capitalize",
  "&:hover": {
    background: "#737373",
  },
});
const ButIn = styled(Button)({
  display: "flex",
  padding: "2px 4px",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "32px",
  background: "#10B981",
  color: "#FFF",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "capitalize",
  "&:hover": {
    background: "#10B981",
  },
});

const RecenterAutomatically = ({ center }) => {
  if (!center.length) return null;
  const map = useMap();
  map.setView((center = { lat: center[0], lng: center[1] }));
  return null;
};

function Maps4Re({ data }) {
  const zoom = 13;
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [city, setCity] = useState(79); // Lưu thành phố đã chọn
  const [district, setDistrict] = useState(760); // Lưu quận/huyện đã chọn
  const [ward, setWard] = useState(26734); // Lưu phường/xã đã chọn
  const [fakeData, setFakeData] = useState(data);
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [area, setArea] = useState();
  const [respone, setRespone] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [center, setCenter] = useState([data[0].latitude, data[0].longitude]);

  const [url, setUrl] = useState(
    `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`
  );
  const [filterData, setFilterData] = useState({
    pageSize: 10,
    pageNo: 1,
    type: "MARKET",
    wardId: 26734,
  });
  useEffect(() => {
    if (typeof city == "string") return;
    axiosBaseUrl
      .get(`/address/province/${79}`)
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
        console.log(res.data);
        if (res.data.length === 0) {
          // showSnackbar();
        } else {
          const updatedData = [...fakeData, ...res.data];
          setFakeData(updatedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////////////
  const handleAreaChange = (e) => {
    setArea(e.target.value)
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDeleteMarker = (id) => {
    setFakeData(fakeData.filter((item) => item.id !== id));
  };
  const handleToInfor = (id) => {
    navigate(`/detail/${id}`);
  };
  const handleSelect = (item) => {
    setSelected(item.id);
    setCenter([item.latitude, item.longitude]);
    console.log(center);
  };
  const addNewPoint = (latitude, longitude, name) => {
    const newPoint = {
      id: fakeData.length + 1, // Tính id dựa trên độ dài hiện tại của mảng
      name: name,
      latitude: latitude,
      longitude: longitude,
      address: name, // Bạn có thể thay đổi nếu cần
    };
    const updatedData = [...fakeData, newPoint];
    setFakeData(updatedData);
  };
  const convertData = (fakeData) => {
    return fakeData.map((item) => ({
      lat: item.latitude,
      lng: item.longitude,
    }));
  };
  const handleAdd = async () => {
    await axiosBaseUrl
      .get("place/get-point", {
        params: { address: inputValue },
      })
      .then((res) => {
        addNewPoint(res.data.lat, res.data.lng, inputValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFind = async () => {
    const convertedData = convertData(fakeData); // Chuyển đổi dữ liệu đầu vào
    await axiosBaseUrl
      .post("posts/find_post", { area: area, points: convertedData })
      .then((res) => {
        setRespone(res.data);
        console.log(respone);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
  }, [respone]);

  return (
    <Box sx={{ width: "90%", margin: "0 5% 0 5%" }}>
      <Title3>Bản đồ:</Title3>
      <Grid container style={{ marginBottom: "10px" }}>
        <Grid item xs={3} md={10}>
          <Grid container>
            {city && (
              <Grid
                item
                xs={3}
                md={3.5}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Title4>Quận, Huyện</Title4>
                <Selection2
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
                </Selection2>
              </Grid>
            )}
            {district && (
              <Grid
                item
                xs={3}
                md={3.5}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Title4>Xã, Phường</Title4>
                <Selection2
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
                </Selection2>
              </Grid>
            )}
            <Grid
              item
              xs={3}
              md={3}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Title4>Tiện ích</Title4>
              <Selection2 onChange={handleTypeChange}>
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
              </Selection2>
            </Grid>
            <Grid item xs={6} md={1.5}>
              <But onClick={handleConfirm}>Thêm tiện ích</But>
            </Grid>
            <Grid
              item
              xs={6}
              md={7}
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
                marginTop: "10px",
              }}
            >
              <CustomInput
                type="text"
                placeholder="Nhập địa điểm bạn muốn ở gần"
                value={inputValue}
                onChange={handleInputChange}
              />
              <But onClick={handleAdd}>Thêm điểm</But>
            </Grid>
            <Grid
              item
              xs={3}
              md={3}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Title4>Bán kính</Title4>
              <Selection name="lang" id="lang-select">
                <option value="1">1km</option>
                <option value="2">2km</option>
                <option value="3">3km</option>
                <option value="4">4km</option>
                <option value="5">5km</option>
                <option value="6">6km</option>
              </Selection>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          md={1}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ButSearch onClick={handleFind}>
            {" "}
            <SearchIcon />
            Tìm kiếm
          </ButSearch>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} md={8}>
          <MapContainer
            center={center}
            scrollWheelZoom={false}
            style={{ minHeight: "60vh", minWidth: "60vw" }}
            zoom={zoom}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={url}
            />
            {fakeData?.map((position, index) => (
              <Marker
                key={index}
                position={[position.latitude, position.longitude]}
                icon={iconPerson}
              >
                <Popup>
                  <div>
                    <h3>Thông tin vị trí</h3>
                    <p>Tên: {position.name}</p>
                    <p>Địa chỉ: {position.address}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ButDel onClick={() => handleDeleteMarker(position.id)}>
                      Xóa
                    </ButDel>
                  </div>
                </Popup>
     
              </Marker>
            ))}

            {respone?.map((position, index) => (
              <Marker
                key={index}
                position={[position.latitude, position.longitude]}
                icon={iconResult}
              >
                <Popup>
                  <div>
                    <h3>Thông tin nhà trọ</h3>
                    <p>Tên: {position.title}</p>
                    <p>Diện tích: {position.area}m2</p>
                    <p>Giá: {position.price}VNĐ</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                    <ButIn
                      onClick={() => {
                        handleToInfor(position.id);
                      }}
                    >
                      Xem chi tiết
                    </ButIn>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            <RecenterAutomatically center={center} />
          </MapContainer>
        </Grid>
        <Grid item xs={3} md={0.5}></Grid>
        <Grid
          item
          xs={3}
          md={3}
          style={{ overflowY: "auto", maxHeight: "60vh" }}
        >
          <div>
            <Typography>Các điểm yêu cầu:</Typography>
            
            {fakeData.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                style={{
                  cursor: "pointer",
                  border: "solid 1px gray",
                  backgroundColor: selected === item.id ? "#10b981" : "white",
                  padding: "0px 10px",
                  color: selected === item.id ? "white" : "gray",
                  marginBottom: "5px", // Khoảng cách giữa các mục
                }}
              >
                <p>Địa điểm: {item.name}</p>
                {/* <p>Address: {item.address}</p> */}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Maps4Re;
