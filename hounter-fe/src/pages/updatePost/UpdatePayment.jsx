import React from "react";
import {Grid, TextField, Box, Select, MenuItem } from "@mui/material";
import { Title } from ".";

export default function UpdatePayment(props) {
  const { values, handleChange} = props;
  console.log(values.cost)

  return (
    <>
      <Title style={{ paddingLeft: "20px" }}> Chọn loại tin đăng</Title>
      <Box style={{ width: "90%", margin: "5px 5%" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Loại tin đăng
            </div>
            <Select
              labelId="cost"
              value={values.cost || ""}
              onChange={handleChange("cost")}
              style={{ width: "100%" }}
            >
              <MenuItem value={1}>Tin Thường (5.000/ngày)</MenuItem>
              <MenuItem value={2}>Tin VIP 1 (10.000/ngày)</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Số ngày
            </div>
            <TextField
              id="days"
              style={{ width: "100%" }}
              placeholder="Nhập số ngày"
              onChange={handleChange("days")}
              value={values.days}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
