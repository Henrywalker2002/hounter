import React, { useState, useEffect } from "react";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import { useSelector } from "react-redux";
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
  Grid,
  Button,
  TextField,
  Typography,
  styled
} from "@mui/material";
import Loading from "../../../component/Loading";
import { Link } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';

const PaginationContainer = styled (Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px", 
})

export default function FeedbackList() {
  const user = useSelector((state) => state.user);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const handleChange = (name) => (event) => {
    setParams({ ...params, [name]: event.target.value });
  };

  const fetchFeedback = async () => {
    await axiosBaseUrl
      .get(`/feedbacks`, {
        params: params,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFeedbacks(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePage = (e, value) => {
    params.pageNo = value;
    fetchFeedback();
  };

  useEffect(() => {
    fetchFeedback();
  }, [loading, params]);

  return (
    <Box
      style={{
        marginTop: "64px",
      }}
    >
      <Box
        style={{
          padding: "20px 150px 20px 150px",
          backgroundColor: "#fff",
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
          Quản lý báo cáo
        </Typography>
        {/* <Box style={{ padding: "0px 5px", margin: "10px 0px 10px 0px" }}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <TextField
                id="date"
                label="Từ ngày"
                type="date"
                value={params.beginDate}
                onChange={handleChange("beginDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                id="date"
                label="Đến ngày"
                type="date"
                value={params.endDate}
                onChange={handleChange("endDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box> */}
        {loading ? (
          <Loading />
        ) : (
          <TableContainer component={Paper} sx={{ margin: "20px auto" }}>
            <Table>
              <TableHead sx={{ bgcolor: "rgba(16, 185, 129, 0.41)" }}>
                <TableRow>
                  <TableCell align="left" sx={{ color: "#0C1537" }}>
                    Mã tin đăng
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#0C1537" }}>
                    Tiêu đề tin đăng
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#0C1537" }}>
                    Nội dung báo cáo
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#0C1537" }}>
                    Ngày tạo
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#0C1537" }}></TableCell>
                </TableRow>
              </TableHead>
              {feedbacks.length > 0 ? (
                <TableBody>
                  {feedbacks.map((feedback, index) => (
                    <TableRow key={index}>
                      <TableCell>{feedback.postId}</TableCell>
                      <TableCell>{feedback.postTitle}</TableCell>
                      <TableCell>{feedback.content}</TableCell>
                      <TableCell>{feedback.createAt}</TableCell>
                      <TableCell>
                        <Link
                          to={`/admin/feedbacks/${feedback.id}`}
                          key={index}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            textAlign: "center",
                          }}
                        >
                          <ArticleIcon/>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <></>
              )}
            </Table>
          </TableContainer>
        )}
        <PaginationContainer>
          <Pagination count={5} onChange={handlePage} />
        </PaginationContainer>
        
      </Box>
    </Box>
  );
}
