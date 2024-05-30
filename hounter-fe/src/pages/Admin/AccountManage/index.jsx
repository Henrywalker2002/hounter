import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Select,
  Grid,
  Button,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import Loading from "../../../component/Loading";
import { useSelector } from "react-redux";
import ArticleIcon from '@mui/icons-material/Article';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import ReDel from "./ReDel";

const Title1 = styled("div")({
    color: "#f59e0b",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: "700",
    textTransform: "capitalize",
    padding: "0px 0px 10px 0px",
    marginLeft: "5%"
  });
export default function ManageAccount() {
  const [params, setParams] = useState({
    pageSize: "10",
    pageNo: "1",
  });
  const mappingStatus = (status) => {
    if (status === "Hoạt động") {
      return {
        msg: "Hoạt động",
        color: "gray",
      };
    } else  {
      return {
        msg: "Bị khóa",
        color: "red",
      };
    } 
  };
  const user = useSelector(state => state.user);
  const [category, setCategory] = useState("Nhà trọ");
  // const [cost, setCost] = useState(0);
  // const [status, setStatus] = useState(0);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)
  const [postId, setPostId] = useState()

  const handleChange = (name) => (event) => {
    setParams({ ...params, [name]: event.target.value });
    console.log(params);
  };
  const fetchProductList = async (page) => {
    await axiosBaseUrl
      .get(`/admin/users`, {
        params: params,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setPost(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePage = (e, value) => {
    params.pageNo = value;
    fetchProductList();
  };
  useEffect(() => {
    const fetchProductList = async (page) => {
      await axiosBaseUrl
        .get(`/admin/users`, {
          params: params,
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };    
    fetchProductList(1);
  }, [loading, user.token ,params]);

  const handleDelete = async (postId) => {
    setPostId(postId)
    setOpen(true)    
  };

  return (
    <Box
      style={{
        marginTop: "64px",
      }}
    >
      <Box
        style={{
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
            <Box>
            <Title1>Quản lý tài khoản</Title1>
          <TableContainer component={Paper} style={{width: "90%", marginLeft: "5%"}}>
            <Table>
              <TableHead>
                <TableRow style={{backgroundColor: "rgb(157, 226, 203)"}}>
                  <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Họ và tên</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Tên người dùng</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Email</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Số điện thoại</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Ngày tham gia</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Trạng thái</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              {post.length > 0 ? (
                <TableBody>
                  {post?.map((item, index) => {
                    const status = mappingStatus(item.isActive);
                    return (
                      <TableRow key={index} >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.createAt}</TableCell>
                        {/* <TableCell>{item.expireAt}</TableCell> */}
                        <TableCell style={{ color: `${status.color}` }}>
                          {mappingStatus(item.isActive).msg}
                        </TableCell>
                        <TableCell style={{ display: "flex", alignItems: "center" }}>
                          <Link
                            // to={`/admin/posts/${item.post}`}
                            state={{ item }}
                            key={index}
                          >
                           <ArticleIcon style={{color:"black"}}/>
                          </Link>
                          <Button
                            variant="text"
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          >
                            <NotInterestedIcon style={{color:"black", height: "27px"}}/>
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
            <Box style={{display: "flex", justifyContent: "flex-end", margin: "10px"}}>
                <Pagination count={5} onChange={handlePage} />
            </Box>
          </TableContainer>
        </Box>
        )}
      </Box>
      <ReDel open={open} setOpen={setOpen} postId={postId}/>
    </Box>
  );
}