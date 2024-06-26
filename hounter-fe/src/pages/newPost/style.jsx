import React from "react";
import { Typography, Box, styled, Grid, Paper, Button } from "@mui/material";

export const Contain = styled(Box)({
    backgroundColor: "white",
    // marginTop: "84px",
    // position: "fixed",
    // width: "90%",
    // height: "90vh",
    // marginLeft: "5%",  
    // marginRight: "20px",
    margin: "0px 10%",
    paddingBottom: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    // overflowY: "scroll"
});
export const Title = styled(Typography)({
    color: "#1B1C57",
    fontSize: "24px",
    fontWeight: "1000",
    lineHeight: "normal",
    fontFamily: "Times New Roman, Times, serif"
});

export const Selection = styled("select")({
    border: "none",
    background: "#E7F0FE",
    color: "blue",
    padding: "4px 8px",
    fontSize: "15px",
    marginTop: "5px",
    "&:focus": {
      outline: "none",
    },
    height: "40px",
    width: "100%",
    marginBottom: "10px"
  });