import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

export default function PaymentHistory(props) {
  const payments = props.data;
  const mappingStatus = (status) => {
    if (status === "PENDING") {
      return {
        msg: "Chưa thanh toán",
        color: "blue",
      };
    } else if (status === "COMPLETE") {
      return {
        msg: "Đã thanh toán",
        color: "green",
      };
    } else {
      return {
        msg: "Hết hạn",
        color: "red",
      };
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{backgroundColor: "#9de2cb"}}>
          <TableRow>
            <TableCell>Mã tin đăng</TableCell>
            <TableCell>Mã giao dịch</TableCell>
            <TableCell>Số tiền</TableCell>
            <TableCell>Nội dung</TableCell>
            <TableCell>Ngày thanh toán</TableCell>
            <TableCell>Ghi chú</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {payments.length > 0 ? payments.map((item, index) => {
              const status = mappingStatus(item.status);
                return (
                <TableRow key={index}>
                    <TableCell>{item.postId}</TableCell>
                    <TableCell>{item.transactionId}</TableCell>
                    <TableCell>{item.totalPrice}</TableCell>
                    <TableCell>{item.paymentInfo}</TableCell>
                    <TableCell>{item.paymentAt}</TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell style={{ color: `${status.color}` }}>
                          {mappingStatus(item.status).msg}
                        </TableCell>
                </TableRow>
                );
            }) : (<></>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
