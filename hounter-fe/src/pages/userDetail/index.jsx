import React from "react";
import Sidebar from "../../component/Sidebar";
import { Grid } from "@mui/material";
import UserInformation from "./part";
import { useSelector } from "react-redux";
import Footer from "../../component/footer";

export default function UseDetail() {
  const user = useSelector((state) => state.user);
  return !user.isLogin ? (
    <> 
      <h1> Please login to view this page </h1>
    </>
  ) : (
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
        <Grid item xs={10} style = {{ padding: "10px 5% 10px 5%"}}> 
          <UserInformation />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
