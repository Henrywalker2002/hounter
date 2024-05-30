import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  styled,
} from "@mui/material";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import Loading from "../../../component/Loading";
import {Link} from "react-router-dom";
import { useCookies } from "react-cookie";
import DelPost from "../PostManage/delPost";
import ReDel from "../PostManage/ReDel";

const BoxStyled = styled(Box)({
  margin: "10px 0",
});

const Title = styled(Typography)({
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
});

const ButtonStyled = styled(Button)({
  width: "120px",
  height: "36px",
  color: "white",
  background: "#10B981",
  borderRadius: "32px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  textTransform: "none",
  "&:hover": {
    background: "#9de2cb",
    marginRight: "10px"
  },
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
  marginLeft: "10px"
});

export default function FeedbackDetail(props) {
  const { id } = useParams(props, "id");
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState();
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
    const fetchFeedbackDetail = async () => {
      await axiosBaseUrl
        .get(`/feedbacks/${id}`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFeedback(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchFeedbackDetail();
  }, [loading]);

  const handleDeleteFeedback = async () => {};

  return loading ? (
    <Loading />
  ) : (
    <Box
      style={{
        marginTop: "64px",
        backgroundColor: "f1f1f1",
        padding: "5px 80px",
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
          }}
        >
          Quản lý báo cáo / Xem chi tiết
        </Typography>
      <Box style={{ backgroundColor: "white", marginTop: "5px", padding: 15, borderRadius: 10 }}>
        <BoxStyled>
          <Title display="inline"> </Title>
          <Typography display="inline"> Mã báo cáo: {feedback.id} </Typography>
        </BoxStyled>
        <BoxStyled>
          <Title display="inline">Người gửi: </Title>
          <Typography display="inline">{feedback.sender.fullName}</Typography>
        </BoxStyled>
        <BoxStyled>
          <Title>Thông tin bài đăng: </Title>
          <Typography>Mã bài đăng: {feedback.postId}</Typography>
          <Typography>Tên bài viết: {feedback.postTitle}</Typography>
          <Typography>Người viết: {feedback.postOwner.fullName}</Typography>
          <Typography>Thông tin mô tả: {feedback.postDescription}</Typography>
        </BoxStyled>
        <BoxStyled>
          <Title display="inline">Nội dung báo cáo </Title>
          <Typography display="inline">{feedback.content}</Typography>
        </BoxStyled>
        <Box sx={{textAlign: "right", marginRight: "20px"}}>
          <Link to={`/admin/posts/${feedback.postId}`}>
            <ButtonStyled>Xem bài đăng</ButtonStyled>
          </Link>
          <ButtonDel onClick={handleClick}>Xoá bài đăng</ButtonDel>
        </Box>
        <DelPost open={open} setOpen={setOpen} id={feedback.postId}/>
        <ReDel open={openRe} setOpen={setOpenRe} id={feedback.postId}/>
      </Box>
    </Box>
  );
}
