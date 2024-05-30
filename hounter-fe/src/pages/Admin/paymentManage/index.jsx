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
  styled,
} from "@mui/material";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import Loading from "../../../component/Loading";
import { useSelector } from "react-redux";

const Title1 = styled("div")({
    color: "#f59e0b",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: "700",
    textTransform: "capitalize",
    padding: "0px 0px 10px 0px",
    marginLeft: "5%"
  });
export default function AdminManagePayment() {
  const [params, setParams] = useState({
    pageSize: "10",
    pageNo: "1",
  });
  const mappingStatus = (status) => {
    if (status === "PENDING") {
      return {
        msg: "Chưa thanh toán",
        color: "#ff8d39",
      };
    } else if (status === "COMPLETE") {
      return {
        msg: "Đã thanh toán",
        color: "#4bcaa0",
      };
    } else {
      return {
        msg: "Hết hạn",
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

  const handleChange = (name) => (event) => {
    setParams({ ...params, [name]: event.target.value });
  };
  const fetchProductList = async (page) => {
    await axiosBaseUrl
      .get(`/admin/payment-history`, {
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
  const handlePage = (e, value) => {
    params.pageNo = value;
    fetchProductList();
  };
  useEffect(() => {
    const fetchProductList = async (page) => {
      await axiosBaseUrl
        .get(`/admin/payment-history`, {
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
            <Title1>Quản lý Thanh toán</Title1>
          <TableContainer component={Paper} style={{width: "90%", marginLeft: "5%"}}>
            <Table>
              <TableHead>
                <TableRow style={{backgroundColor: "rgb(157, 226, 203)"}}>
                  <TableCell style={{fontWeight: "bold"}}>Mã bài đăng</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Thông tin thanh toán</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Tổng tiền</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Ngày tạo</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Tên khách hàng</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Trạng thái</TableCell>
                  <TableCell style={{fontWeight: "bold"}}> Mã giao dịch</TableCell>
                </TableRow>
              </TableHead>
              {post.length > 0 ? (
                <TableBody>
                  {post?.map((item, index) => {
                    const status = mappingStatus(item.status);
                    return (
                      <TableRow key={index} >
                        <TableCell>{item.postNum}</TableCell>
                        <TableCell>{item.paymentInfo}</TableCell>
                        <TableCell>{item.totalPrice}</TableCell>
                        <TableCell>{item.createAt}</TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell style={{ color: `${status.color}` }}>
                          {mappingStatus(item.status).msg}
                        </TableCell>
                        <TableCell >{item.transactionId}</TableCell>
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