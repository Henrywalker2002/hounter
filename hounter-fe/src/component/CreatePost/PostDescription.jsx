import React from "react";
import {Box, TextField, Grid, Select, MenuItem} from "@mui/material";

export default function PostDecription(props){
    const {values, handleChange, error, setError } = props;
    return (
        <Box style={{ width: "90%", margin: "5px 5%" }}>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
            {" "}
            Tiêu đề <span style={{ color: "red" }}>*</span>
          </div>
          <TextField
            id="title"
            style={{ width: "75%" }}
            placeholder="Nhập tiêu đề"
            name= "title"
            multiline
            required
            onChange={handleChange("title")}
          />
        </div>
        <div style={{ margin: "12px 0" }}>
          <div style={{ fontFamily: "bolder" }}> Mô tả</div>
          <Box maxHeight={200}>
            <TextField
              id="description"
              multiline
              name = "description"
              rows={7}
              required
              variant="outlined"
              style={{ width: "75%" }}
              onChange={handleChange("description")}
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
                name = "category"
                value={values.category}
                onChange={handleChange("category")}
                style={{ width: "100%" }}
              >
                <MenuItem value={"Nhà trọ"}>Nhà trọ</MenuItem>
                <MenuItem value={"Homestay"}>Homestay</MenuItem>
                {/* <MenuItem value={"Ở ghép"}>Ở ghép</MenuItem> */}
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
                name=  "area"
                type="number"
                required
                style={{ width: "100%" }}
                onChange={handleChange("area")}
                placeholder="Nhập diện tích"
                error = {error.area ? true : false}
                helperText = {error.area ?? ""}
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
                name = "price"
                type="number"
                required
                style={{ width: "100%" }}
                onChange={handleChange("price")}
                placeholder=""
                error = {error.price ? true : false}
                helperText = {error.price ?? ""}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    )
}