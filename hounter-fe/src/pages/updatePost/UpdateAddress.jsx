import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";
import { Title, Selection } from ".";
import axiosBaseUrl from "../../api/axiosBaseUrl";

export default function UpdateAddress(props) {
  const { values, provinceDe, districtDe, wardDe, handleChange, setWardId } = props;

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [city, setCity] = useState(null); // Lưu thành phố đã chọn
  const [district, setDistrict] = useState(null); // Lưu quận/huyện đã chọn
  const [ward, setWard] = useState(null);

  useEffect(() => {
    axiosBaseUrl.get("/address")
      .then((res) => {
        setCities(res.data);
        const defaultCity = res.data.find((city) => city.code == provinceDe);
        if (defaultCity) {
          setCity(defaultCity);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [provinceDe]);

  useEffect(() => {
    if (!city) return; // Thêm điều kiện này để tránh gọi API khi city chưa được chọn
    axiosBaseUrl.get(`/address/province/${city.code}`)
      .then((res) => {
        setDistricts(res.data);
        const defaultDistrict = res.data.find((district) => district.code == districtDe);
        if (defaultDistrict) {
          setDistrict(defaultDistrict);
          setWards(defaultDistrict.wards);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [city, districtDe]); // Thêm districtDe vào dependencies

  useEffect(() => {
    if (!district) return; // Thêm điều kiện này để tránh gọi API khi district chưa được chọn
    // Không cần cập nhật phường/xã ở đây vì sẽ được cập nhật khi district thay đổi
  }, [district]);

  const handleDistrictChange = (districtCode) => {
    const selectedDistrict = districts.find((value) => value.code == districtCode);
    setDistrict(selectedDistrict);
    setWards(selectedDistrict.wards);
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find((value) => value.code == e.target.value);
    setCity(selectedCity);
    setDistrict(null); // Reset district và ward khi city thay đổi
    setWard(null);
    setDistricts([]);
    setWards([]);
  };

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setWard(e.target.value);
  };

  return (
    <>
      <Title
          style={{ color: "#FF7008", padding: "10px 20px", fontSize: "36px" }}
        >
          Chỉnh sửa tin đăng
      </Title>
      <div style={{ borderTop: "1px solid #e0e0e0 ", marginLeft: 20, marginRight: 20 }}></div>
      <Title style={{ paddingLeft: "20px" }}>Khu Vực</Title>
      <Grid container spacing={2} style={{ width: "90%", margin: "5px 5%" }}>
        <Grid item xs={4} style={{ padding: "0" }}>
          <div style={{ fontFamily: "bolder" }}>
            Tỉnh/Thành phố <span style={{ color: "red" }}>*</span>
          </div>
          <Selection
            value={city ? city.code : ""}
            onChange={handleCityChange}
            name="province"
            id="province"
          >
            {cities.map((cityObj) => (
              <option key={cityObj.code} value={cityObj.code}>
                {cityObj.nameWithType}
              </option>
            ))}
          </Selection>
        </Grid>

        <Grid item xs={4} style={{ padding: "0" }}></Grid>

        {city && typeof city !== "string" && (
          <Grid item xs={4} md={4} style={{ padding: "0" }}>
            <div style={{ fontFamily: "bolder" }}>
              Quận/Huyện <span style={{ color: "red" }}>*</span>
            </div>
            <Selection
              value={district ? district.code : ""}
              onChange={(e) => handleDistrictChange(e.target.value)}
              name="district"
              id="district"
            >
              {districts.map((districtObj) => (
                <option key={districtObj.code} value={districtObj.code}>
                  {districtObj.nameWithType}
                </option>
              ))}
            </Selection>
          </Grid>
        )}

        {district && typeof district !== "string" && (
          <Grid item xs={6} md={4} style={{ padding: "0" }}>
            <div style={{ fontFamily: "bolder" }}>
              Phường xã <span style={{ color: "red" }}>*</span>
            </div>
            <Selection
              value={ward || ""}
              onChange={handleWardChange}
              name="ward"
              id="ward"
            >
              {wards.map((wardObj) => (
                <option key={wardObj.code} value={wardObj.code}>
                  {wardObj.nameWithType}
                </option>
              ))}
            </Selection>
          </Grid>
        )}

        <Grid item xs={12} style={{ padding: "0" }}>
          <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
            Số nhà tên đường
          </div>
          <TextField
            id="street"
            style={{ width: "75%" }}
            placeholder="Nhập địa chỉ chính xác"
            onChange={handleChange("full_address")}
            value={values.street || ""}
          />
        </Grid>
      </Grid>
      <div style={{ borderTop: "1px solid #e0e0e0 ", marginLeft: 20, marginRight: 20 }}></div>
    </>
  );
}
