import React from "react";
import { Grid } from "@mui/material";
import Footer from "../../component/footer";
import UserPost from "./part";
import Sidebar from "../../component/Sidebar";
export default function PostManage(){
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
          <Grid item xs={10} style = {{backgroundColor: "#E8E8E8", padding: "10px 20px"}}> 
            <UserPost />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
}