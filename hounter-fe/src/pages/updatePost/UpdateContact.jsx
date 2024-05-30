import React from "react";
import { Grid, TextField, Box } from "@mui/material";
import { Title } from "./index";

export default function UpdateContact(props) {
  const { values, handleChange } = props;

  return (
    <>
      <Title style={{ paddingLeft: "20px" }}> Thông tin liên hệ</Title>
      <Box style={{ width: "90%", margin: "5px 5%" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Họ và tên
            </div>
            <TextField
              id="full-name"
              style={{ width: "100%" }}
              placeholder=""
              defaultValue={values.customerName}
              onChange={handleChange("customerName")}
              value={values.customerName}
              disabled= {true}
            />
          </Grid>

          <Grid item xs={4}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Số điện thoại
            </div>
            <TextField
              id="full-name"
              style={{ width: "100%" }}
              placeholder="Số điện thoại"
              defaultValue={values.customerPhone}
              onChange={handleChange("customerPhone")}
              value={values.customerPhone}
            />
          </Grid>

          <Grid item xs={4}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Zalo {`(nếu có)`}
            </div>
            <TextField
              id="notes"
              style={{ width: "100%" }}
              placeholder=""
              defaultValue={values.notes}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
