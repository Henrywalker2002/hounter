import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  styled
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axiosBaseUrl from "../api/axiosBaseUrl";
import image from "../image/logo.png";

const Title = styled(Typography)({
  color: "#1B1C57",
  fontSize: "32px",
  fontWeight: 700,
  lineHeight: "normal",
  textTransform: "capitalize",
  marginLeft: "15px",
});

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  const navigateToHome = () => {
    navigate("/");
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setError({});
    if (password !== confirmPassword) {
      setError({ confirmPassword: "Mật khẩu không khớp" });
      return;
    }
    else if (password.length < 8) {
      setError({ password: "Mật khẩu phải có ít nhất 8 ký tự" });
      return;
    }
    axiosBaseUrl
      .post("auth/register", {
        username: username,
        password: password,
        email: email,
        full_name: fullname,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        setOpen(true);
        ResetValue();
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        if (error.response.data.includes('Duplicate ')) {
          setError({...error, username: "Tên người dùng đã tồn tại"})
        }
      });
  };
  const ResetValue = () => {
    setUsername("");
    setFullname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [failAlert, setFailAlert] = useState(false);

  const handleFailAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFailAlert(false);
  };
  return (
    <div>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
        }}
      >
        <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "30px",
            }}
            onClick={navigateToHome}
          >
            <img
              src={image}
              alt="akn"
              style={{ height: "36px", width: "36px" }}
            />
            <Title variant="h2">Hounter</Title>
          </Box>
          <Typography variant="h5" align="center" style={{fontWeight: '600', color: "#1b1c57"}}>
            Đăng ký
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              margin="normal"
              fullWidth
              label="Tên người dùng"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              id="username"
              required
              error = {error.username ? true : false}
              helperText = {error.username ?? ""}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Họ và tên"
              variant="outlined"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              id="fullname"
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              required
              error = {error.email ? true : false}
              helperText = {error.email ?? ""}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              error = {error.password ? true : false}
              helperText = {error.password ?? ""}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              id="confirmPassword"
              error = {error.confirmPassword ? true : false}
              helperText = {error.confirmPassword ?? ""}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box mt={2}>
              Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
              <Button
                fullWidth
                variant="contained"
                style={{ marginTop: "10px", backgroundColor: "#10b981" }}
                type="submit"
              >
                Đăng ký
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Tạo tài khoản thành công. Vui lòng thực hiện đăng nhập!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
