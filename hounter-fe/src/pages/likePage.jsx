import * as React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  styled,
  Grid,
  Paper,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../component/footer";
import avatar from "../image/avatar.png";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CropIcon from "@mui/icons-material/Crop";
import PaidIcon from "@mui/icons-material/Paid";
import FeedIcon from "@mui/icons-material/Feed";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import axiosBaseUrl from "../api/axiosBaseUrl";
import { formatter } from "../helpers/helper";

const Contain = styled(Box)({
  marginTop: "84px",
  position: "fixed",
  overflowY: "scroll",
  height: "90vh",
});
const Title = styled(Typography)({
  color: "#F7B648",
  fontSize: "32px",
  fontWeight: "600",
  lineHeight: "normal",
});
const Item = styled(Paper)({
  backgroundColor: "rgb(255,255,255, 0%)",
  width: "496px",
  margin: "10px 0 2% 3%",
});
const LikeBox = styled(Box)({
  // width: "90%",
  marginLeft: "5%",
  backgroundColor: "rgba(255, 255, 255, 0.50)",
  borderRadius: "25px",
  height: "72%",
  overflowY: "auto",
  overflowX: "hidden"
});
const NewBox = styled(Box)({
  width: "90%",
  margin: "0 5% 0 5%",
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "15px 20px",
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
  border: "3px solid #FFF",
  //   marginLeft: '1%'
});
const Name = styled(Grid)({
  color: "#1B1C57",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "32px",
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
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
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
const LikeBut = styled(Button)({
  padding: "12px 16px",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  fontSize: "14px",
  textTransform: "capitalize",
  backgroundColor: "#F7B648",
  "&:hover": {
    background: "#F7B648",
  },
  borderRadius: "32px",
  marginTop: "10px",
});

export default function FavoritePost() {
  const user = useSelector((state) => state.user);
  const [favor, setFavor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [failAlert, setFailAlert] = useState(false);

  const handleFailAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFailAlert(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavor = async () => {
      await axiosBaseUrl
        .get(`favorite`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          setFavor(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    fetchFavor();
  }, [loading, user.token]);

  const removeFavor = async (id) => {
    await axiosBaseUrl
      .delete(`favorite/${id}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        setLoading(false);
        const list = favor.filter(item => item.id != id);
        setFavor(list);
        setOpen(true);
      })
      .catch((err) => {
        setLoading(false);
        setFailAlert(true);
        console.log(err.response);
      })
      .finally(() => {});
  };

  return (
    <Contain>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "50px" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Xoá thành công!
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

      <LikeBox>
        <Item elevation={0}>
          <Title>Tin đăng yêu thích</Title>
        </Item>
        <NewBox>
          {favor && favor.length > 0 ? (
            favor.map((item, index) => (
              <Grid container key={index}>
                <Grid item md={5}>
                  <Name>{item.title}</Name>
                  <Address>
                    <PlaceOutlinedIcon style={{ marginRight: "5px" }} />
                    {item.address}
                  </Address>
                  <Grid container>
                    <Com item md={6}>
                      <CropIcon style={{ marginRight: "5px" }} /> {item.area} m2
                    </Com>
                    <Com item md={6}>
                      <PaidIcon style={{ marginRight: "5px" }} />{" "}
                      {formatter.format(item.price)}
                    </Com>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    style={{
                      alignItems: "center",
                      display: "flex",
                      marginTop: "10px",
                    }}
                  >
                    <Grid
                      item
                      xs={2}
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {item.owner.avatar && item.owner.avatar != "" ? (
                        <ImgAvar src={item.owner.avatar} />
                      ) : (
                        <ImgAvar src={avatar} />
                      )}
                    </Grid>
                    <Grid item xs={2} md={6} style={{ alignItems: "center" }}>
                      <UserName> {item.owner.fullName}</UserName>
                      {/* <Address>
                      <ContactPhoneIcon style={{ marginRight: "5px" }} />
                      0123456789
                    </Address> */}
                    </Grid>
                    {/* <Grid item xs={2} md={4}>
                    <ContactBut>
                      {" "}
                      <MessageIcon width="25" height="25"  style={{ marginRight: '5px' }}/>
                      Liên hệ
                    </ContactBut>
                  </Grid> */}
                  </Grid>
                </Grid>
                <Grid item md={1} />
                <Grid item md={4}>
                  <Image src={item.image} />
                </Grid>
                <Grid
                  item
                  md={2}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <ContactBut
                        onClick={() => {
                          navigate(`/detail/${item.id}`);
                        }}
                      >
                        <FeedIcon style={{ marginRight: "5px" }} />
                        Xem chi tiết
                      </ContactBut>
                    </Grid>
                    <Grid item md={12}>
                      <LikeBut
                        onClick={() => {
                          setLoading(true);
                          removeFavor(item.id);
                        }}
                      >
                        <ThumbDownOffAltIcon
                          width="24"
                          height="24"
                          color="#fff"
                          style={{ marginRight: "5px" }}
                        />
                        Bỏ yêu thích
                      </LikeBut>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </NewBox>
      </LikeBox>
      <Footer />
    </Contain>
  );
}
