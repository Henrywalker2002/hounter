import React from "react";
import { Grid, TextField, Box, Select, MenuItem } from "@mui/material";
import {Title} from "./index"

export default function UpdateDescript(props) {
  const { values, handleChange} = props;
  console.log(values.category)
  return (
    <>
      <Title style={{ paddingLeft: "20px" }}>Thông tin mô tả</Title>
      <Box style={{ width: "90%", margin: "5px 5%" }}>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
            {" "}
            Tiêu đề
          </div>
          <TextField
            id="title"
            style={{ width: "75%" }}
            placeholder="Nhập tiêu đề"
            multiline
            onChange={handleChange("title")}
            defaultValue={values.title}
          />
        </div>
        <div style={{ margin: "12px 0" }}>
          <div style={{ fontFamily: "bolder" }}> Mô tả</div>
          <Box maxHeight={200}>
            <TextField
              id="multiline-description"
              multiline
              rows={7}
              variant="outlined"
              style={{ width: "75%" }}
              onChange={handleChange("description")}
              defaultValue={values.description}
            />
          </Box>
        </div>

        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder" }}>
                {" "}
                Danh mục cho thuê <span style={{ color: "red" }}>*</span>
              </div>
              <Select
                id="category"
                value={values.category || ""}
                onChange={handleChange("category")}
                style={{ width: "100%" }}
              >
                <MenuItem value={"Nhà trọ"}>Nhà trọ</MenuItem>
                <MenuItem value={"Homestay"}>Homestay</MenuItem>
                <MenuItem value={"Ở ghép"}>Ở ghép</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={8}></Grid>

            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
                {" "}
                Diện tích (m2)
              </div>
              <TextField
                id="area"
                style={{ width: "100%" }}
                onChange={handleChange("area")}
                placeholder="Nhập diện tích"
                defaultValue={values.area}
                value={values.area}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
                {" "}
                Giá cho thuê (VNĐ)
              </div>
              <TextField
                id="price"
                style={{ width: "100%" }}
                onChange={handleChange("price")}
                placeholder=""
                defaultValue={values.price }
                value={values.price}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
