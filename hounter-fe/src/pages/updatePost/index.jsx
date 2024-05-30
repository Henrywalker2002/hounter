import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosBaseUrl from "../../api/axiosBaseUrl";
import UpdateDescript from "./UpdateDescript";
import UpdateContact from "./UpdateContact";
import { styled } from "@mui/material/styles";
import UpdatePayment from "./UpdatePayment";
import UpdateAddress from "./UpdateAddress";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseDb } from "../../api/firebase";
import UpdateImage from "./UpdateImage";
import { useNavigate } from "react-router-dom";

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

export const Title = styled(Typography)({
  color: "#1B1C57",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "normal"
});

export const Selection = styled("select")({
  border: "none",
  background: "#E7F0FE",
  color: "blue",
  padding: "4px 8px",
  fontSize: "15px",
  marginTop: "5px",
  "&:focus": {
    outline: "none",
  },
  height: "40px",
  width: "100%",
  marginBottom: "10px",
});
export const Contain = styled(Box)({
  backgroundColor: "white",
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
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

export default function UpdatePost(props) {
  const { id } = useParams(props, "id");
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const storage = getStorage(firebaseDb);
  const [imageError, setImageError] = useState(false);
  const [wardId, setWardId] = useState();
  const [district, setDistrict] = useState();
  const [province, setProvince] = useState();
  const [images, setImages] = useState([]);
  const [deletedImage, setDeletedImage] = useState([]);
  const [values, setValues] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const handelCancel = ()=>{
    navigate("/user/posts")
  }
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setImageError(false);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
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

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setLoading(true);
    values.wardId=wardId;
    values.deleteImages = deletedImage;
    Promise.all([uploadImage(selectedFiles)])
      .then((value) => {
        values.addImages = value[0];
      })
      .then(async () => {
        await axiosBaseUrl
        .put(`posts/${id}`, values, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          setLoading(false);
          setOpen(true)
          
          console.log(res.data);
        })
        .catch((error) => {});
      });
  };

  useEffect(() => {
    const fetchPost = async () => {
      console.log("A")
      await axiosBaseUrl
        .get(`customers/${user.user.id}/posts/${id}`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          console.log(response.data)
          setValues({
            title: response.data.title,
            description: response.data.description,
            area: response.data.area,
            price: response.data.price,
            category: response.data.category,
            cost: response.data.cost.costName === "Tin Thường" ? 1 : 2,
            days: response.data.cost.activeDay,
            street: response.data.address.street,
            customerName: response.data.ownerName,
            customerPhone: response.data.ownerPhone,
            note: response.data.notes,
            addImages: [],
            deleteImages: []
          })
          setWardId(response.data.address.ward)
          setDistrict(response.data.address.district)
          setProvince(response.data.address.province)
          setImages(response.data.imageList);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPost(id);
  }, [id]);

  return (
    
        <div
      style={{
        width: "100%",
        marginTop: "84px",
        position: "fixed",
        overflowY: "scroll",
        height: "90vh",
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={10}
          style={{ backgroundColor: "#E8E8E8", padding: "10px 5% 10px 5%" }}
        >
          <Contain>
            <UpdateAddress values={values} provinceDe={province} districtDe={district} wardDe={wardId} handleChange={handleChange} setWardId={setWardId}/>
            <UpdateDescript values={values} handleChange={handleChange} />
            <UpdateImage selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} setDeletedImage={setDeletedImage} images={images} setImages={setImages}/>
            <UpdateContact values={values} handleChange={handleChange} />
            <UpdatePayment values={values} handleChange={handleChange} />
            <div style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <CancelBut onClick={handelCancel}>Hủy</CancelBut>
              <SaveBut variant="contained"  onClick={handleSubmit}>
                Lưu
              </SaveBut>
            </div>
          </Contain>
        </Grid>
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
            Cập nhật thành công!
          </Alert>
        </Snackbar>
        <Snackbar
          open={imageError}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Có lỗi xảy ra, vui lòng thử lại!
          </Alert>
        </Snackbar>
      </Grid>
      <Footer />
    </div>
  );
}
