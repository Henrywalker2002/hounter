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
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";

import News from "../component/news";
import Footer from "../component/footer";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CropIcon from "@mui/icons-material/Crop";
import PaidIcon from "@mui/icons-material/Paid";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axiosBaseUrl from "../api/axiosBaseUrl";
import Map from "../component/StaticMap";
import ShowPost from "../component/showPost";

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
  color: "#F7B648",
  fontSize: "32px",
  fontWeight: "600",
  lineHeight: "normal",
  margin: "10px 0px 20px 7%",
});

const Item = styled(Paper)({
  backgroundColor: "rgb(255,255,255, 0%)",
  width: "496px",
  marginTop: "10px",
});
const DetailBox = styled(Box)({
  backgroundColor: "#ffff",
  borderRadius: "10px",
  width: "100%",
  margin: "20px 0 3% 0",
});

const Content = styled(Box)({
  width: "90%",
  margin: "0 5% 0 5%",
});
const LocateIcon = styled(PlaceOutlinedIcon)({
  width: "28px",
  height: "28px",
  marginRight: "5px",
});
const Ti1 = styled(Typography)({
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
});
const Ti2 = styled(Typography)({
  fontSize: "28px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
});
const Con = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
  color: "#888B97",
});
const Ti3 = styled(Typography)({
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: "300",
});
const ButRep = styled(Button)({
  padding: "12px 24px",
  alignItems: "center",
  display: "flex",
  textAlign: "center",
  color: "#888B97",
  borderRadius: "32px",
  border: "1px solid #888B97",
  textTransform: "none",
  fontSize: "20px",
  fontWeight: "500",
});
const ButLike = styled(Button)({
  padding: "12px 24px",
  alignItems: "center",
  display: "flex",
  textAlign: "center",
  textTransform: "none",
  fontSize: "20px",
  fontWeight: "500",
  color: "#4BE4C9",
  backgroundColor: "#D1FAE5",
  "&:hover": {
    background: "#D1FAE5",
  },
  borderRadius: "32px",
  marginLeft: "70%",
});
const WarnIcon = styled(WarningAmberRoundedIcon)({
  width: "28px",
  height: "28px",
  marginRight: "10px",
});
const LikeIcon = styled(FavoriteIcon)({
  width: "28px",
  height: "28px",
  marginRight: "10px",
});
const ButtonCom = styled(Button)({
  padding: "8px 12px",
  backgroundColor: "#F7B648",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "normal",
  margin: "10px 0px 20px 7%",
  textTransform: "none",
  color: "#fff",
  "&:hover": {
    background: "#F7B648",
  },
  borderRadius: "32px",
})

export default function Detail(props) {
  const { id } = useParams(props, "id");
  const [loading, setLoading] = useState(true);
  const [postDetail, setPostDetail] = useState({});
  const user = useSelector((state) => state.user);
  const [openShowDialog, setOpenShowDialog] = useState(false);

  const handleOpenShowDialog = () => {
    setOpenShowDialog(true);
  };

  const handleCloseShowDialog = () => {
    setOpenShowDialog(false);
  };

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const fetchDetail = async () => {
      await axiosBaseUrl
        .get(`posts/${id}`)
        .then((res) => {
          console.log(res.data);
          setPostDetail(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDetail();
  }, [loading, id]);

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

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddFavor = async () => {
    await axiosBaseUrl
      .post(`favorite/${id}`,{}, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        // setLoading(false);
        setOpen(true);
      })
      .catch((err) => {
        // setLoading(false);
        setFailAlert(true);
        console.log(err.response);
      })
      .finally(() => {});
  };

  const handleAddFeedback = async (content) => {
    await axiosBaseUrl
      .post(
        `posts/${id}/feedback`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
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
      <Grid container spacing={2} style={{ width: "90%", marginLeft: "5%", marginTop: "10px" }}>
        <Item elevation={0}>
          <Title>Thông tin chi tiết</Title>
        </Item>
        <DetailBox>
          <Grid container>
            <Grid xs={1} md={9}>
              <Title2>{postDetail.title}</Title2>
            </Grid>
            <Grid xs={1} md={2}>
              <ButtonCom onClick={handleOpenShowDialog}>So Sánh</ButtonCom>
              <ShowPost open={openShowDialog} onClose={handleCloseShowDialog} post={postDetail}/>
            </Grid>
          </Grid>
          
          <Box>
            <Carousel
              NextIcon={<ArrowForwardIosIcon />}
              PrevIcon={<ArrowBackIosNewIcon />}
              navButtonsAlwaysVisible
            >
              {postDetail.imageList?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`slide-${index}`}
                  style={{
                    borderRadius: "24px",
                    width: "80%",
                    height: "500px",
                    marginLeft: "10%",
                  }}
                />
              ))}
            </Carousel>
          </Box>
          <Content>
            <Con>
              <LocateIcon /> <Ti1>{postDetail?.address?.street}</Ti1>
            </Con>
            <Con>
              <Con style={{ marginRight: "20%" }}>
                <CropIcon style={{ marginRight: "6px" }} />
                <Ti1>{`${postDetail.area}m2`}</Ti1>
              </Con>
              <Con>
                <PaidIcon style={{ marginRight: "6px" }} />
                <Ti1>{formatter.format(postDetail.price)}</Ti1>
              </Con>
            </Con>
            <Ti2>Đặc điểm tin đăng</Ti2>
            {postDetail.status == "inactive" ? <div><Ti3 style={{color: "red"}}>Bài đăng đã hết hạn!</Ti3></div> : ""}
            <Ti3>Mã tin: {postDetail.id}</Ti3>
            <Ti3>Ngày đăng: {postDetail.createAt}</Ti3>
            <Ti3>Ngày hết hạn: {postDetail.expireAt}</Ti3>
            <Ti2>Thông tin mô tả</Ti2>
            <Ti3>{postDetail.description}</Ti3>
            <Ti2>Thông tin liên hệ</Ti2>
            <Ti3>
              Liên hệ: {postDetail.ownerName}
              <br></br>
              Sđt: {postDetail.ownerPhone}
              <br></br>
              Zalo: {postDetail.note}
            </Ti3>

            <Ti2>Bản đồ</Ti2>
            {!loading && postDetail.latitude != null ? (
              <Map data={[postDetail.latitude, postDetail.longitude]} />
            ) : (
              <></>
            )}

            <Con style={{ marginTop: "15px" }}>
              <ButRep onClick={handleClickOpenDialog}>
                {" "}
                <WarnIcon />
                Báo cáo
              </ButRep>

              <ButLike onClick={handleAddFavor}>
                {" "}
                <LikeIcon />
                Yêu thích
              </ButLike>
            </Con>
          </Content>
        </DetailBox>
      </Grid>
      {/* <News /> */}
      <Footer />
      <React.Fragment>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const content = formJson.content;
              console.log(content);
              handleAddFeedback(content);
              handleCloseDialog();
            },
          }}
        >
          <DialogTitle>Gửi báo cáo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Mọi thông tin liên quan đến tin đăng này chỉ mang tín chất tham
              khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho
              thuê, không liên lạc được,...), vui lòng gửi báo cáo để chúng tôi
              xử lý.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="content"
              name="content"
              label="Nội dung chi tiết"
              type="text"
              fullWidth
              variant="standard"
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Huỷ</Button>
            <Button type="submit">Gửi</Button>
          </DialogActions>
        </Dialog>{" "}
      </React.Fragment>
    </Contain>
  );
}
