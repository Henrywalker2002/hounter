import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Select,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Contain, Title, Selection } from "./style";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseDb } from "../../api/firebase";
import axiosBaseUrl from "../../api/axiosBaseUrl";
import { useSelector } from "react-redux";
import UploadImageList from "./UploadImageList";
import PostDecription from "./PostDescription";

const SaveBut = styled(Button)({
  padding: "5px 7px",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  fontSize: "16px",
  textTransform: "capitalize",
  backgroundColor: "#FF7008",
  "&:hover": {
    background: "#FF7008",
  },
  borderRadius: "5px",
  marginTop: "10px",
  marginLeft: "5px"
});
const CancelBut = styled(Button)({
  padding: "5px 7px",
  alignItems: "center",
  textAlign: "center",
  color: "#FF7008",
  fontSize: "16px",
  textTransform: "capitalize",
  backgroundColor: "#fff",
  "&:hover": {
    background: "#fff",
  },
  border: "solid 1px #FF7008",
  borderRadius: "5px",
  marginTop: "10px",
  marginRight: "5px"
});

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
  return formattedDate;
}

export default function CreatePost() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const storage = getStorage(firebaseDb);
  const [imageError, setImageError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [cities, setCities] = useState([]);
  const [districts,setDistricts]=useState([]);
  const [wards, setWards]=useState([]);
  const [city, setCity] = useState("Chọn Tỉnh/Thành phố"); // Lưu thành phố đã chọn
  const [district, setDistrict] = useState("Chọn Quận/Huyện"); // Lưu quận/huyện đã chọn
  const [ward, setWard] = useState("Chọn Phường/Xã"); // Lưu phường/xã đã chọn
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handelCancel = ()=>{
    navigate("/")
  }

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    navigate("/user/posts")
    setOpen(false);
  };

  const [values, setValues] = useState({
    title: "",
    description: "",
    area: "",
    price: "",
    category: "Nhà trọ",
    cost: "Tin Thường",
    days: 3,
    wardId: 26734,
    street: "",
    customerName: user.user.fullName,
    customerPhone: "",
    note: "",
    imageUrls: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  useEffect (()=>{
    axiosBaseUrl.get("/address").then((res) => {
      setCities(res.data);
      const defaultCity=res.data.filter(city=>city.code==79)[0]
      setCity(defaultCity)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  useEffect (()=>{
    if(typeof(city) == "string") return 
    axiosBaseUrl.get(`/address/province/${city.code}`).then((res)=>{
      setDistricts(res.data);
      setWards(res.data[0].wards)
    }).catch((err)=>{
      console.log(err)
    })
  },[city])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setImageError(false);
  };
  const uploadImageAndGetUrl = async (item) => {
    const split_string = item.base64Url.split(",");
    const img_type = split_string[0].split(";")[0].split("/")[1];
    if (img_type !== "png" && img_type !== "jpg" && img_type !== "jpeg") {
      return null;
    }
    const storageRef = ref(
      storage,
      `${user.user.id}/${getCurrentDate()}/${item.file.name}`
      // `52/${getCurrentDate()}/${item.file.name}`
    );
    const imgArray = Uint8Array.from(atob(split_string[1]), (c) =>
      c.charCodeAt(0)
    );
    await uploadBytes(storageRef, imgArray, {
      contentType: `image/${img_type}`,
    })
      .then((snapshot) => {
        console.log("Uploaded image successfull!");
      })
      .catch((error) => {
        console.log(error);
        setImageError(true);
      });
    // return `52/${getCurrentDate()}/${item.file.name}`;
    let dowload_url;
    await getDownloadURL(storageRef).then((url) => {
      console.log("Downloaded image successfull!" + url);
      dowload_url = url;
    });
    return dowload_url;
  };

  const uploadImage = (imgs) => {
    let links = [];
    return new Promise(async (resolve) => {
      for (let i = 0; i < imgs.length; i++) {
        await uploadImageAndGetUrl(imgs[i]).then((res) => {
          links.push(res);
        });
      }
      resolve(links);
    });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDistrictChange = (districtCode) => {
    const selectedDistrict=districts.filter((value) => value.code == districtCode)[0]
    setDistrict(selectedDistrict);
    setWards(selectedDistrict.wards);
  };
  const handleCityChange = (e)=>{
    const selectedCity=cities.filter(value=>value.code==e.target.value)[0]
    setCity(selectedCity)
  }
  const handleWardChange = (e)=>{
    setValues({...values, wardId: e.target.value})
  }

  const checkError = () => {
    let error = {};
    if (isNaN(values.area) || values.area === "" || values.area <= 0) {
      error.area = "Diện tích không hợp lệ";
    } 

    if (values.price <= 0 || isNaN(values.price)) {
      error.price = "Giá không hợp lệ";
    }
    if (isNaN(values.days)) {
      error.days = "Số ngày không hợp lệ";
    }
    else if (values.days < 3) {
      error.days = "Số ngày nhỏ nhất là 3";
    }

    const regexPhone = new RegExp("^0[0-9]{9}$");
    if (!regexPhone.test(values.customerPhone)) {
      error.phone = "Số điện thoại không hợp lệ";
    }

    setErrorMsg(error);
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = checkError();
    if (Object.keys(error).length !== 0) return;
    setLoading(true);
    Promise.all([uploadImage(selectedFiles)])
      .then((value) => {
        values.imageUrls = value[0];
      })
      .then(async () => {
        await axiosBaseUrl
          .post(`posts`, {...values, customerName: user.user.fullName}, {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          })
          .then((res) => {
            setLoading(false);
            setOpen(true);
            console.log(res.data);
          })
          .catch((error) => {
            setLoading(false);
            setImageError(true);
            console.log(error.response);
          })
      });
  };

  return (
    <Contain>
      <form onSubmit={handleSubmit}>
        <Title
          style={{ color: "#FF7008", padding: "10px 20px", fontSize: "36px" }}
        >
          Đăng tin
        </Title>
        <Divider />
        <Title style={{ paddingLeft: "20px" }}>Khu Vực</Title>
        <Grid container spacing={2} style={{ width: "90%", margin: "5px 5%" }}>
          <Grid item xs={4} style={{ padding: "0" }}>
            <div style={{ fontFamily: "bolder" }}>
              {" "}
              Tỉnh/Thành phố <span style={{ color: "red" }}>*</span>
            </div>
            <Selection
              value={city.code}
              defaultValue={79}
              onChange={handleCityChange}
              name="province"
              id="province"
            >
              {cities.map((cityObj) => (
                <option key={cityObj.code} value={cityObj.code}>
                  {" "}
                  {cityObj.nameWithType}{" "}
                </option>
              ))}
            </Selection>
          </Grid>

          <Grid item xs={4} style={{ padding: "0" }}></Grid>

          {city && (
            <Grid item xs={4} md={4} style={{ padding: "0" }}>
              <div style={{ fontFamily: "bolder" }}>
                {" "}
                Quận/Huyện <span style={{ color: "red" }}>*</span>
              </div>
              <Selection
                value={district.code}
                defaultValue={760}
                onChange={(e) => handleDistrictChange(e.target.value)}
                name="district"
                id="district"
              >
                {districts.map((districtObj) => (
                  <option key={districtObj.code} value={districtObj.code}>
                    {" "}
                    {districtObj.nameWithType}{" "}
                  </option>
                ))}
              </Selection>
            </Grid>
          )}
          {district && (
            <Grid item xs={6} md={4} style={{ padding: "0" }}>
              <div style={{ fontFamily: "bolder" }}>
                {" "}
                Phường xã <span style={{ color: "red" }}>*</span>
              </div>
              <Selection
                value={ward.code}
                defaultValue={26734}
                onChange={handleWardChange}
                name="ward"
                id="ward"
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
          <Grid item xs={12} style={{ padding: "0" }}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Số nhà, tên đường
            </div>
            <TextField
              id="street"
              name="street"
              required
              style={{ width: "75%" }}
              placeholder="Nhập địa chỉ chính xác"
              onChange={handleChange("street")}
            />
          </Grid>
        </Grid>
        <Divider />
        <br />
        <Title style={{ paddingLeft: "20px" }}>Thông tin mô tả</Title>
        <PostDecription values={values} handleChange={handleChange} error = {errorMsg} setError = {setErrorMsg} />
        <Divider />
        <br />
        <Title style={{ paddingLeft: "20px" }}> Hình ảnh</Title>
        <UploadImageList
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
        <Divider />
        <br />
        <Title style={{ paddingLeft: "20px" }}> Thông tin liên hệ</Title>
        <Box style={{ width: "90%", margin: "5px 5%" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
                {" "}
                Họ và tên
              </div>
              <TextField
                id="full-name"
                name="full-name"
                style={{ width: "100%" }}
                placeholder=""
                onChange={handleChange("customerName")}
                value={user.user.fullName}
                disabled={true}
              />
            </Grid>

            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
                {" "}
                Số điện thoại
              </div>
              <TextField
                id="phone"
                name="phone"
                required
                style={{ width: "100%" }}
                placeholder="Số điện thoại"
                onChange={handleChange("customerPhone")}
                error = {errorMsg.phone ? true : false}
                helperText = {errorMsg.phone ?? ""}
              />
            </Grid>

            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
                {" "}
                Zalo {`(nếu có)`}
              </div>
              <TextField
                id="note"
                name= "note"
                style={{ width: "100%" }}
                placeholder=""
                onChange={handleChange("note")}
              />
            </Grid>
          </Grid>
        </Box>

        <div
          style={{
            borderTop: "1px solid #e0e0e0 ",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <Title style={{ paddingLeft: "20px" }}> Chọn loại tin đăng</Title>
        <Box style={{ width: "90%", margin: "5px 5%" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
                {" "}
                Loại tin đăng
              </div>
              <Select
                labelId="cost"
                value={values.cost}
                onChange={handleChange("cost")}
                style={{ width: "100%" }}
                name= "cost"
                id = "cost"
              >
                <MenuItem value={"Tin Thường"}>
                  Tin Thường (5.000/ngày)
                </MenuItem>
                <MenuItem value={"Tin VIP 1"}>Tin VIP 1 (10.000/ngày)</MenuItem>
                {/* <MenuItem value={"Tin VIP 2"}>Tin VIP 2 (15.000/ngày)</MenuItem>
                <MenuItem value={"Tin VIP 3"}>Tin VIP 3 (20.000/ngày)</MenuItem> */}
              </Select>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
                {" "}
                Số ngày
              </div>
              <TextField
                id="days"
                required
                style={{ width: "100%" }}
                placeholder="Nhập số ngày"
                defaultValue={3}
                onChange={handleChange("days")}
                name="days"
                error = {errorMsg.days ? true : false}
                helperText = {errorMsg.days ?? ""}
                type="number"
              />
            </Grid>
          </Grid>
        </Box>
        <div style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <CancelBut onClick={handelCancel}>Hủy</CancelBut>
          <SaveBut variant="contained" color="success" type="submit">
            {loading ? <CircularProgress size={20} color="inherit" /> : "Lưu"}
          </SaveBut>
        </div>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ marginTop: "50px" }}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thêm thành công
          </Alert>
        </Snackbar>

        <Snackbar
          open={imageError}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ marginTop: "50px" }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Có lỗi xảy ra, vui lòng thử lại!
          </Alert>
        </Snackbar>
      </form>
    </Contain>
  );
}
