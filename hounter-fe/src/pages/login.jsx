import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  styled,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosBaseUrl from "../api/axiosBaseUrl";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/Reducers/User";
import image from "../image/logo.png";
import { useCookies } from 'react-cookie';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';


const Title = styled(Typography)({
  color: "#1B1C57",
  fontSize: "32px",
  fontWeight: 700,
  lineHeight: "normal",
  textTransform: "capitalize",
  marginLeft: "15px",
});
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigateToHome = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await axiosBaseUrl
      .post("auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        setOpen(true);
        dispatch(LOGIN(response.data));
        setCookie('jwt', JSON.stringify(response.data), { path: '/' })
        // response.data.roles.includes("ADMIN") ? navigate("/admin/accounts") : navigate("/")
        if (response.data.roles.includes("ADMIN")) {
          navigate("/admin/accounts");
        } else if (response.data.roles.includes("STAFF")) {
          navigate("/staff/accounts");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setFailAlert(true);
        console.log(error);
      });
  };

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [failAlert, setFailAlert] = useState(false);
  const handleFailAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFailAlert(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "50px" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thành công!
        </Alert>
      </Snackbar>
      <Snackbar
        open={failAlert}
        autoHideDuration={3000}
        onClose={handleFailAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "50px" }}
      >
        <Alert
          onClose={handleFailAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Thông tin tài khoản hoặc mật khẩu không chính xác.
        </Alert>
      </Snackbar>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "100px" }}>
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: '30px' }} onClick={navigateToHome}>
          <img
            src={image}
            alt="akn"
            style={{ height: "36px", width: "36px" }}
          />
          <Title variant="h2">Hounter</Title>
        </Box>
        <Typography variant="h5" align="center" style={{fontWeight: '600', color: "#1b1c57"}}>
          Đăng nhập
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            margin="normal"
            fullWidth
            label="Tên người dùng"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name = "username"
            id = "username"
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name = "password"
            id = "password"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box mt={2}>
            Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              style={{ marginTop: "10px", backgroundColor: "#10b981" }}
            >
              Đăng nhập
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
