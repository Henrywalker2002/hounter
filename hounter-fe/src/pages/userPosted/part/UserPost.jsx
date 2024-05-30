import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Typography,
  Button,
  styled,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import { useSelector } from "react-redux";
import FilterPost from "../../../component/FilterPost";
import { mappingStatus } from "../../../helpers/helper";
import ArticleIcon from "@mui/icons-material/Article";

const SaveBut = styled(Button)({
  padding: "8px 10px",
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
});
const PayBut = styled(Button)({
  padding: "4px 8px",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  fontSize: "14px",
  textTransform: "capitalize",
  backgroundColor: "#10b981",
  "&:hover": {
    background: "#10b981",
  },
  borderRadius: "24px",
  marginTop: "10px",
});
export default function UserPost() {
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    pageSize: "10",
    pageNo: "1",
    cost: "",
    category: "",
    status: "",
  });

  const createPayment = async (payment_param) => {
    await axiosBaseUrl
      .get(`payments/create-payment`, {
        params: payment_param,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = response.data.url;
        } else {
          console.error("Unexpected response status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Failed to create payment: ", error);
      });
  };

  const handleChange = (name) => (event) => {
    setParams({ ...params, [name]: event.target.value });
    console.log(params);
  };

  const fetchPost = async () => {
    await axiosBaseUrl
      .get(`customers/${user.user.id}/posts`, {
        params: params,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchPost = async () => {
      await axiosBaseUrl
        .get(`customers/${user.user.id}/posts`, {
          params: params,
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setPost(response.data);
          console.log(post);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPost();
  }, [loading, user.user.id, user.token, params]);

  return (
    <Container
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          component="h2"
          align="left"
          gutterBottom
          style={{ color: "#FF7008", paddingTop: "10px", fontWeight: "700" }}
        >
          Quản lý tin đã đăng
        </Typography>
        <div
          style={{
            borderTop: "1px solid #e0e0e0 ",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <Box style={{ padding: "0px 5px", margin: "10px 0px 10px 0px" }}>
          <FilterPost params={params} handleChange={handleChange} />
          {/* <SaveBut
                style={{ marginTop: "10px" }}
                variant="contained"
                color="success"
                onClick={() => {
                  console.log(params);
                  fetchPost();
                }}
              >
                Lọc
              </SaveBut> */}
        </Box>

        <div
          style={{
            borderTop: "1px solid #e0e0e0 ",
          }}
        ></div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#9de2cb" }}>
              <TableRow>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Loại tin</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Ngày hết hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {post.length > 0 ? (
                post.map((item, index) => {
                  return (
                    <TableRow key={index} id={`post-${item.id}`}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.cost}</TableCell>
                      <TableCell>{item.createAt}</TableCell>
                      <TableCell>{item.expireAt}</TableCell>
                      <TableCell>{mappingStatus(item.status)}</TableCell>
                      <TableCell>
                        {item.status === "waiting" && (
                          <Link
                            to={`/user/edit-post/${item.id}`}
                            state={{ item }}
                            key={index}
                          >
                            <ArticleIcon sx={{ color: "#000" }} />
                          </Link>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.status === "waiting" ? (
                          <PayBut
                            onClick={() => {
                              createPayment({
                                postId: item.id,
                                amount: item.amount,
                              });
                            }}
                          >
                            {" "}
                            Thanh toán
                          </PayBut>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Pagination
          count={10}
          onChange={(e, value) => {
            setParams({ ...params, pageNo: value });
          }}
        />
      </Box>
    </Container>
  );
}
