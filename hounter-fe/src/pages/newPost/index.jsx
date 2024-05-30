import React, { useEffect, useState } from "react";
import Footer from "../../component/footer";
import CreatePost from "../../component/CreatePost";
import {Grid} from "@mui/material"
import Sidebar from "../../component/Sidebar";

export default function AddNewPost() {
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
      <Grid item xs={10} style = {{backgroundColor: "#E8E8E8", padding: "10px 5% 10px 5%"}}> 
        <CreatePost />
      </Grid>
    </Grid>
    <Footer />
  </div>
);
}
