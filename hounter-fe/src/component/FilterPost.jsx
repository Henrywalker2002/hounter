import React from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function FilterPost(props) {
  const { params, handleChange } = props;

  return (
    <Box
      style={{
        padding: "0px 5px",
        margin: "10px 0px 10px 0px",
        display: "flex",
      }}
    >
      
      <FormControl sx={{ minWidth: 120, paddingRight: "10px" }}>
        <InputLabel id="category">Phân loại</InputLabel>
        <Select
          labelId="category"
          label="Phân loại"
          value={params.category}
          onChange={handleChange("category")}
          style={{ width: "100%" }}
        >
          <MenuItem value={""}>Tất cả</MenuItem>
          <MenuItem value={"Nhà trọ"}>Nhà trọ</MenuItem>
          <MenuItem value={"Homestay"}>Homestay</MenuItem>
          <MenuItem value={"Ở ghép"}>Ở ghép</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, paddingRight: "10px" }}>
        <InputLabel id="status">Trạng thái</InputLabel>
        <Select
          labelId="status"
          label="Trạng thái"
          value={params.status}
          onChange={handleChange("status")}
          style={{ width: "100%" }}
        >
          <MenuItem value={""}>Tất cả</MenuItem>
          <MenuItem value={"waiting"}>Chưa thanh toán</MenuItem>
          <MenuItem value={"active"}>Đang hiển thị</MenuItem>
          <MenuItem value={"inactive"}>Đã hết hạn</MenuItem>
          <MenuItem value={"delete"}>Đã xoá</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, paddingRight: "10px" }}>
        <InputLabel id="cost">Loại tin</InputLabel>
        <Select
          labelId="cost"
          label="Loại tin"
          value={params.cost}
          onChange={handleChange("cost")}
          style={{ width: "100%" }}
        >
          <MenuItem value={""}>Tất cả</MenuItem>
          <MenuItem value={"Tin Thường"}>Tin Thường</MenuItem>
          <MenuItem value={"Tin VIP 1"}>Tin VIP 1</MenuItem>
          <MenuItem value={"Tin VIP 2"}>Tin VIP 2</MenuItem>
          <MenuItem value={"Tin VIP 3"}>Tin VIP 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
