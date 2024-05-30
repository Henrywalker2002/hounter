import React, {useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, styled, Grid, Box} from '@mui/material';
import Map4Com from './map4Com';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CropIcon from "@mui/icons-material/Crop";
import PaidIcon from "@mui/icons-material/Paid";
import Carousel from "react-material-ui-carousel";
import axiosBaseUrl from '../api/axiosBaseUrl';


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
const Title = styled(Typography)({
    color: "#F7B648",
    fontSize: "32px",
    fontWeight: "600",
    lineHeight: "normal",
    margin: "10px 0px 20px 7%",
}); 
const Title2 = styled(Typography)({
    color: "#1B1C57",
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "normal",
    padding: "12px 12px 20px 20px"
});

const ComparePost = ({ open, handleClose, post1, post2 }) => {
    const [loading, setLoading] = useState(true);
    const [postDetail, setPostDetail] = useState({});
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
      });
      useEffect(() => {
        const fetchDetail = async () => {
          await axiosBaseUrl
            .get(`posts/${post2}`)
            .then((res) => {
              setPostDetail(res.data);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        fetchDetail();
      }, [loading, post2]);
      console.log(postDetail)
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xl"}>
        <Title>So sánh</Title>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Phần thứ nhất */}
          <Grid item xs={6} sx={{
                border: "2px solid #000",
            }}>
            {/* Nội dung phần thứ nhất */}
            <Title2>{post1?.title}</Title2>
            <Box>
            <Carousel
              NextIcon={<ArrowForwardIosIcon />}
              PrevIcon={<ArrowBackIosNewIcon />}
              navButtonsAlwaysVisible
            >
              {post1.imageList?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`slide-${index}`}
                  style={{
                    borderRadius: "24px",
                    width: "80%",
                    height: "300px",
                    marginLeft: "10%",
                  }}
                />
              ))}
            </Carousel>
          </Box>
          <Content>
            <Con>
              <LocateIcon /> <Ti1>{post1?.address?.street}</Ti1>
            </Con>
            <Con>
              <Con style={{ marginRight: "20%" }}>
                <CropIcon style={{ marginRight: "6px" }} />
                <Ti1 >{`${post1.area}m2`}</Ti1>
              </Con>
              <Con>
                <PaidIcon style={{ marginRight: "6px" }} />
                <Ti1>{formatter.format(post1.price)}</Ti1>
              </Con>
            </Con>
            <Ti2>Đặc điểm tin đăng</Ti2>
            {post1.status == "inactive" ? <div><Ti3 style={{color: "red"}}>Bài đăng đã hết hạn!</Ti3></div> : ""}
            <Ti3>Mã tin: {post1.id}</Ti3>
            <Ti3>Ngày đăng: {post1.createAt}</Ti3>
            <Ti3>Ngày hết hạn: {post1.expireAt}</Ti3>
            <Ti2>Thông tin mô tả</Ti2>
            <Ti3>{post1.description}</Ti3>
            <Ti2>Thông tin liên hệ</Ti2>
            <Ti3>
              Liên hệ: {post1.ownerName}
              <br></br>
              Sđt: {post1.ownerPhone}
              <br></br>
              Zalo: {post1.note}
            </Ti3>

            <Ti2>Bản đồ</Ti2>
            {post1.latitude != null ? (
              <Map4Com data={[post1.latitude, post1.longitude]} sx={{with:"500px"}}/>
            ) : (
              <></>
            )}
            </Content>
          </Grid>
          {/* Phần thứ hai */}
          <Grid item xs={6} sx={{
                borderTop: "2px solid #000", // Độ dày và màu của border bên trên
                borderRight: "2px solid #000", // Độ dày và màu của border bên trái
                borderBottom: "2px solid #000",
            }}>
            {/* Nội dung phần thứ hai */}
            <Title2>{postDetail?.title}</Title2>
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
                    height: "300px",
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
                <Ti1>{formatter.format(post1.price)}</Ti1>
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
            {post1.latitude != null ? (
              <Map4Com data={[postDetail.latitude, postDetail.longitude]} sx={{with:"500px"}}/>
            ) : (
              <></>
            )}
            </Content>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComparePost;
