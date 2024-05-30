import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import DelPost from "./delPost";
import { useCookies } from "react-cookie";
import ReDel from "./ReDel";

const mappingStatus = (status) => {
  if (status === "waiting") {
    return {
      msg: "Chưa thanh toán",
      color: "#ff8d39",
    };
  } else if (status === "active") {
    return {
      msg: "Đang hiển thị",
      color: "#4bcaa0",
    };
  } else if (status === "delete") {
    return {
      msg: "Đã xoá",
      color: "red",
    };
  } else if (status === "inactive") {
    return {
      msg: "Đã hết hạn",
      color: "gray",
    };
  }
};

export default function PostTable(props) {
  const navigate = useNavigate()
  const [openRe, setOpenRe] = useState(false)
  const [cookies] = useCookies(["jwt"]);
  const cookieData = cookies.jwt;
  const handleDetail = (id) =>{
    navigate(`/admin/posts/${id}`)
  }
  const [id, setId] = useState()
  const handleOpen = (id) =>{
    setId(id)
    if(cookieData && cookieData.roles.includes("STAFF"))
      {setOpenRe(true)}
    else{
      setOpen(true)
    }
    
  }
  const { post, setLoading, handleConfirmPost, open, setOpen } = props;
  return (
    <TableContainer component={Paper} sx={{margin: "20px auto" }}>
      <Table>
        <TableHead sx={{ bgcolor: "rgba(16, 185, 129, 0.41)" }}>
          <TableRow>
            <TableCell align="left" sx={{ color: "#0C1537" }}>ID</TableCell>
            <TableCell align="left" sx={{ color: "#0C1537" }}>Tiêu đề</TableCell>
            <TableCell align="left" sx={{ color: "#0C1537" }}>Loại tin</TableCell>
            <TableCell align="left" sx={{ color: "#0C1537" }}>Ngày tạo</TableCell>
            <TableCell align="left" sx={{ color: "#0C1537" }}>Ngày hết hạn</TableCell>
            <TableCell align="left" sx={{ color: "#0C1537" }}>Trạng thái</TableCell>
            <TableCell align="left" sx={{ color: "#0C1537" }}></TableCell>
          </TableRow>
        </TableHead>
        {post.length > 0 ? (
          <TableBody>
            {post?.map((item, index) => {
              const status = mappingStatus(item.status);
              return (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.createAt}</TableCell>
                  <TableCell>{item.expireAt}</TableCell>
                  <TableCell style={{ color: `${status.color}` }}>
                    {mappingStatus(item.status).msg}
                  </TableCell>
                  <TableCell>
                    <Button
                       style={{
                        margin: 0,
                        padding: 0,
                        textTransform: "none",
                        color: "black",
                      }}
                      onClick={()=>handleDetail(item.id)}
                    >
                      <ArticleIcon/>
                    </Button >
                    <Button
                      style={{
                        margin: 0,
                        padding: 0,
                        textTransform: "none",
                        color: "black",
                      }}
                      onClick={()=>handleOpen(item.id)}
                    >
                      <DeleteIcon/>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <></>
        )}
      </Table>
      <DelPost open={open} setOpen={setOpen} id={id}/>
      <ReDel open={openRe} setOpen={setOpenRe} id={id}/>
    </TableContainer>
  );
}
