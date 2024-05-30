import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./dashboard/header/index";
import img from "../image/DA.png";
import { styled } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const StyledRoot = styled("div")({
  backgroundImage: `url(${img})`,
  height: "47rem",
  width: "50rem",
  backgroundSize: "cover",
  borderBottomLeftRadius: "110px",
  position: "fixed",
  right: "0",
  top: "0",
});
const Gradient = styled("div")({
  height: "60vh",
  width: "50vh",
  background: "linear-gradient(to bottom right, #D9FDFF, #fff)",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: "-10px",
  left: "-20px",
});

const UserLayout = () => {
  const [cookies] = useCookies(["jwt"]);
  const cookieData = cookies.jwt;
  return cookieData && cookieData.roles.includes("USER") ? (
    <>
      <Gradient />
      <StyledRoot />
      <Nav />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login"/>
  );
};

export default UserLayout;
