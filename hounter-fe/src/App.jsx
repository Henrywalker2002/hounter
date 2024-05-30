import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Router from "./routes";
import "./App.css";
import { Box } from "@mui/material";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { SETCOOKIES } from "./redux/Reducers/User";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const [cookies] = useCookies(["jwt"]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const token = cookies.jwt;
    if (token && !user.isLogin) {
      dispatch(SETCOOKIES(token));
    }
  }, [cookies.jwt, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <BrowserRouter>
          <Box>
            <Router />
          </Box>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
