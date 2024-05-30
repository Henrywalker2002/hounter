import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { SET_AVATAR } from '../../../redux/Reducers/User'; 
import { TextField, Button, Container, Box, Typography, Snackbar, Alert } from "@mui/material";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import avatar from "../../../image/avatar.png";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseDb } from "../../../api/firebase";
import ImageUpload from "../../../component/ImageUpload";
import axios from "axios";
import Loading from "../../../component/Loading";

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
const ButtonCancel= styled(Button)({
  padding: "8px 12px",
  backgroundColor: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "normal",
  textTransform: "none",
  color: "#ff7008",
  "&:hover": {
    background: "#fff",
  },
  borderRadius: "4px",
  border: "1px solid #ff7008",
  marginTop: "10px",
  marginRight: "5px"
})

const UserInformation = () => {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);
  const handelCancel = ()=>{
    navigate("/")
  }
  const dispatch = useDispatch();
  const storage = getStorage(firebaseDb);
  const user = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    username: "",
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    dob: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

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

  const uploadImageAndGetUrl = async (item) => {
    try {
      const split_string = item.base64Url.split(",");
      const img_type = split_string[0].split(";")[0].split("/")[1];
      if (img_type !== "png" && img_type !== "jpg" && img_type !== "jpeg") {
        throw new Error("Invalid image type");
      }
      const storageRef = ref(
        storage,
        `${user.user.id}/${getCurrentDate()}/${item.file.name}`
      );
      const imgArray = Uint8Array.from(atob(split_string[1]), (c) =>
        c.charCodeAt(0)
      );
      await uploadBytes(storageRef, imgArray, {
        contentType: `image/${img_type}`,
      });
      const downloadUrl = await getDownloadURL(storageRef);
      console.log("Downloaded image successfully: " + downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageError(true);
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

 const handleUpdate = async () => {
  setLoading(true);
  try {
    let imageUrl = userData.avatar;

    if (selectedFile) {
      imageUrl = await uploadImageAndGetUrl(selectedFile);
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }
    }

    const updatedUserData = { ...userData, avatar: imageUrl };

    await axiosBaseUrl.put(`customers/${user.user.id}`, updatedUserData, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    }).then((res) => {
      dispatch(SET_AVATAR({ avatar: imageUrl }));
      setOpen(true);
      console.log("Change info successful");
    }).catch((error) => {
      setImageError(true);
      console.log(error.response);
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    setFailAlert(true);
  }
  setLoading(false);
};


  useEffect(() => {
    const fetchUserDetail = async () => {
      await axios
        .get(`http://localhost:8080/api/customers/get_self_information`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false); // Tắt loading sau khi fetch dữ liệu hoàn thành
        });
    };
    fetchUserDetail();
  }, [loading, user.token]);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setLoading(false)
  };

  const [failAlert, setFailAlert] = useState(false);

  const handleFailAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFailAlert(false);
  };

  return loading ? <Loading /> : (
    <Container
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: "10px",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "50px" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thành công!
        </Alert>
      </Snackbar>
      <Snackbar
        open={failAlert}
        autoHideDuration={3000}
        onClose={handleFailAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "50px" }}
      >
        <Alert
          onClose={handleFailAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Có lỗi xảy ra vui lòng thử lại!
        </Alert>
      </Snackbar>
      <Box>
        <Typography variant="h4" component="h2" align="left" gutterBottom style={{ color: "#FF7008", paddingTop: '10px', fontWeight: "700" }}>
          Thông tin cá nhân
        </Typography>
        <div
          style={{
            borderTop: "1px solid #e0e0e0 ",
          }}
        ></div>
        <div>
          <form>
            <TextField
              type="text"
              name="id"
              label="ID"
              value={userData.id}
              fullWidth
              margin="normal"
              disabled={true} 
            />
            <TextField
              type="text"
              name="username"
              label="Tài khoản"
              value={userData.username}
              fullWidth
              margin="normal"
              disabled={true} 
            />
            <TextField
              type="text"
              name="full_name"
              label="Họ và Tên"
              value={userData.full_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="email"
              label="Email"
              value={userData.email || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="phone_number"
              label="Số điện thoại"
              value={userData.phone_number || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="address"
              label="Địa chỉ"
              value={userData.address || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <div>
              <Typography align="left" gutterBottom>
                Ảnh đại diện
              </Typography>
              <img
                alt="avatar"
                src={selectedFile ? selectedFile.base64Url : (userData.avatar ? userData.avatar : avatar)}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  border: "2px solid #e0e0e0",
                  display: "block",
                  margin: "0 auto 24px",
                }}
              />
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <ImageUpload
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />
              </Box>
            </div>
            <Box sx={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <ButtonCancel>Hủy</ButtonCancel>
              <SaveBut onClick={handleUpdate}>
                Lưu
              </SaveBut>
            </Box>
          </form>
        </div>
        <br />
      </Box>
    </Container>
  );
};

export default UserInformation;
