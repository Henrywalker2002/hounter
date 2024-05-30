import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { Box, Typography, styled, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CropIcon from "@mui/icons-material/Crop";
import PaidIcon from "@mui/icons-material/Paid";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import { mappingStatus } from "../../../helpers/helper";
import Map from "../../../component/StaticMap";
import PostFeedbackList from "./PostFeedbackList";
import DelPost from "../PostManage/delPost";
import ReDel from "../PostManage/ReDel";
import { useCookies } from "react-cookie";

const LocateIcon = styled(PlaceOutlinedIcon)({
  width: "28px",
  height: "28px",
  marginRight: "5px",
});
const ButtonDel = styled(Button)({
  width: "120px",
  height: "36px",
  color: "white",
  background: "#ff7008",
  borderRadius: "32px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  textTransform: "none",
  "&:hover": {
    background: "#ff7008",
  },
  marginLeft: "10px",
});

export const Title = styled(Typography)({
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
});
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
});
export default function PostDetailAdmin(props) {
  const { id } = useParams(props, "id");
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [feedback,setFeedback] = useState({});
  const [open, setOpen] = useState(false)
  const [openRe, setOpenRe] = useState(false)
  const [cookies] = useCookies(["jwt"]);
  const cookieData = cookies.jwt;
  const handleClick = ()=>{
    if(cookieData && cookieData.roles.includes("STAFF"))
      {setOpenRe(true)}
    else{
      setOpen(true)
    }
  }

  useEffect(() => {
    const fetchDetailAdmin = async () => {
      await axiosBaseUrl
        .get(`staffs/posts/${id}`)
        .then((res) => {
          setDetail(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDetailAdmin();
  }, [loading, id]);

  return !loading ? (
    <Box
      style={{
        margin: "64px 0 10px 0",
        backgroundColor: "f1f1f1",
        padding: "10px 64px",
      }}
    >
       <Typography
        sx={{
          color: "#f59e0b",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "700",
          textTransform: "capitalize",
          padding: "0px 0px 10px 0px",
          marginLeft: "20px",
        }}
      >
        {" "}
        Quản lý Tin Đăng / Xem chi tiết
      </Typography>
      <Box style={{ backgroundColor: "white", marginTop: "5px", borderRadius: 15 }}>
        <Box
          style={{
            marginLeft: "10%",
            padding: "10px 0",
            display: "flex"
          }}
        >
          <Typography
            style={{
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "normal",
              width: "80%"
            }}
          >
            {detail.title}
          </Typography>
          <ButtonDel onClick={handleClick}>Xóa bài viết</ButtonDel>
        </Box>

        <Box>
          <Carousel
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosNewIcon />}
            navButtonsAlwaysVisible
          >
            {detail.imageList?.map((image, index) => (
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

          <Box style={{ marginLeft: "10%" }}>
            <Box
              style={{
                display: "flex",
                margin: "5px 0",
                alignItems: "center",
              }}
            >
              <LocateIcon />
              <Title>{detail.fullAddress}</Title>
            </Box>
            <Box
              style={{
                display: "flex",
                margin: "5px 0",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  marginRight: "20%",
                  alignItems: "center",
                }}
              >
                <CropIcon style={{ marginRight: "6px" }} />
                <Title>{detail.area} m2</Title>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PaidIcon style={{ marginRight: "6px" }} />
                <Title>{formatter.format(detail.price)}</Title>
              </Box>
            </Box>

            <Box
              style={{
                margin: "10px 0",
              }}
            >
              <Title> Trạng thái: {mappingStatus(detail.status)}</Title>
            </Box>
            <Box
              style={{
                margin: "10px 0",
              }}
            >
              <Title>Thông tin bài đăng</Title>
              <Typography>
                Người đăng: {detail.owner.fullName} <br></br>
                Ngày đăng: {detail.createAt} <br></br>
                Ngày hết hạn: {detail.expireAt} <br></br>
              </Typography>
            </Box>
            <Box
              style={{
                margin: "10px 0",
              }}
            >
              <Title>Thông tin chi tiết</Title>
              <Typography>{detail.description}</Typography>
              <Title
                style={{
                  margin: "10px 0 0 0",
                }}
              >
                Thông tin liên hệ
              </Title>
              <Typography>
                {" "}
                Liên hệ: {detail.ownerName}
                <br></br>
                Sđt: {detail.ownerPhone}
                <br></br>
                Zalo: {detail.note}
              </Typography>
            </Box>
            <Box
              style={{
                margin: "10px 0",
              }}
            >
              <Title>Bản đồ</Title>
              <Box sx={{
                width: "90%",
              }}>
                <Map data={[detail.latitude,detail.longitude]}/>
              </Box>
            </Box>
            <Box
              style={{
                margin: "10px 0",
              }}
            >
              <Title>Báo cáo từ người dùng: </Title>
              <PostFeedbackList postId={id} user={user}/>
            </Box>
          </Box>
        </Box>
        <DelPost open={open} setOpen={setOpen} id={id}/>
        <ReDel open={openRe} setOpen={setOpenRe} id={id}/>
      </Box>
    </Box>
  ) : (
    <>Waiting</>
  );
}
