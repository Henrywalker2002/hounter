import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Footer from "../../component/footer";
import Sidebar from "../../component/Sidebar";
import PaymentHistory from "../../component/PaymentHistory";
import axiosBaseUrl from "../../api/axiosBaseUrl";
import { useSelector } from "react-redux";

export default function UserPaymentHistory() {
  const [payments, setPayments] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);


  const [params, setParams] = useState({
    pageSize: 10,
    pageNo: 1,
    fromDate: (() => {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      return date.toISOString().slice(0, 10);
    })(),
    toDate: new Date().toISOString().slice(0, 10),
    transactionId: "",
    postNum: 0,
  });

  const handleChange = (name) => (event) => {
    setParams({ ...params, [name]: event.target.value });
    console.log(params);
  };
  const fetchPaymentHistory = async () => {
    await axiosBaseUrl
      .get(`customers/${user.user.id}/payments`, {
        params: params,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [loading]);

  return (
    <div
      style={{
        width: "100%",
        marginTop: "84px",
        position: "fixed",
        overflowY: "scroll",
        height: "90vh",
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={10}
          style={{ backgroundColor: "#E8E8E8", padding: "10px 5% 10px 5%" }}
        >
          <Container
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E8E8",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h4" component="h2" align="left" gutterBottom style={{color: "#FF7008", paddingTop: '10px',fontWeight: "700"}}>
              Lịch sử giao dịch
            </Typography>
            <Box style={{ padding: "0px 5px", margin: "10px 0px 10px 0px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6} lg={2}>
                  <TextField
                    id="date"
                    label="Từ ngày"
                    type="date"
                    value={params.fromDate}
                    onChange={handleChange("fromDate")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={6} lg={2}>
                  <TextField
                    id="date"
                    label="Đến ngày"
                    type="date"
                    value={params.toDate}
                    onChange={handleChange("toDate")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} lg={2}>
                  <TextField
                    id="transactionId"
                    label="Mã giao dịch"
                    type="text"
                    value={params.transactionId}
                    onChange={handleChange("transactionId")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} lg={2}>
                  <TextField
                    id="postNum"
                    label="Mã tin đăng"
                    type="text"
                    value={params.postNum}
                    onChange={handleChange("postNum")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item lg={2}>
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      console.log(params);
                      fetchPaymentHistory();
                    }}
                  >
                    Lọc
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <PaymentHistory data={payments} />
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
