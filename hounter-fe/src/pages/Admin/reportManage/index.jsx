import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import {
  categories,
  cost_lst,
  status_lst,
} from "../../../assets/json_data/constants";
import { Link } from "react-router-dom";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import Loading from "../../../component/Loading";
import { useSelector } from "react-redux";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
const Title1 = styled("div")({
  color: "#f59e0b",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "700",
  textTransform: "capitalize",
  padding: "0px 0px 10px 0px",
  marginLeft: "5%"
});
export default function AdminManageReport() {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    pageSize: "10",
    pageNo: "1",
  });
  const mappingStatus = (status) => {
    if (status === "waiting") {
      return {
        msg: "Chờ duyệt",
        color: "green",
      };
    } else if (status === "active") {
      return {
        msg: "Đang hiển thị",
        color: "green",
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
  const user = useSelector(state => state.user);
  const [category, setCategory] = useState("Nhà trọ");
  // const [cost, setCost] = useState(0);
  // const [status, setStatus] = useState(0);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const handleClick = (id) => {
    navigate(`/admin/posts/${id}`);
  };
  const handleChange = (name) => (event) => {
    setParams({ ...params, [name]: event.target.value });
    console.log(params);
  };
  const fetchProductList = async (page) => {
    await axiosBaseUrl
      .get(`/feedbacks`, {
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
        .get(`/feedbacks`, {
          params: params,
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setPost(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };    
    fetchProductList(1);
  }, [loading, user.token ,params]);

  const handleDelete = async (postId) => {
    console.log("test");
    console.log(user.token);
    await axiosBaseUrl
      .delete(
        `feedbacks/${postId}`,
        {
          id: postId,
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((res) => {
        const post_list = post.filter(item => item.id !== postId);
        setPost(post_list);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
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
          <Title1>Quản lý báo cáo</Title1>
          <TableContainer component={Paper} style={{width: "90%", marginLeft: "5%"}} >
            <Table>
              <TableHead>
                <TableRow style={{backgroundColor: "rgb(157, 226, 203)"}}>
                  <TableCell style={{fontWeight: "bold"}}>ID</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Nội dung</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Người báo cáo</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Ngày tạo</TableCell>
                  {/* <TableCell>Ngày hết hạn</TableCell>
                  <TableCell>Trạng thái</TableCell> */}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {post.length > 0 ? (
                <TableBody>
                  {post?.map((item, index) => {
                    const status = mappingStatus(item.status);
                    return (
                      <TableRow key={index}>
                        <TableCell >{item.id}</TableCell>
                        <TableCell>{item.content}</TableCell>
                        <TableCell>{item.sender.fullName}</TableCell>
                        <TableCell>{item.create_at}</TableCell>
                        {/* <TableCell>{item.expireAt}</TableCell> */}
                        {/* <TableCell style={{ color: `${status.color}` }}>
                          {mappingStatus(item.status).msg}
                        </TableCell> */}
                        <TableCell style={{ display: "flex", alignItems: "center" }}>
                        <Button onClick={()=>{handleClick(item.post)}}>
                           <AssignmentOutlinedIcon style={{color:"black"}}/>
                          </Button>
                          <Button
                            variant="text"
                            onClick={() => {
                              setLoading(true);
                              handleDelete(item.id);
                            }}
                          >
                            <DeleteIcon style={{color:"black", height: "27px"}}/>
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
    </Box>
  );
}