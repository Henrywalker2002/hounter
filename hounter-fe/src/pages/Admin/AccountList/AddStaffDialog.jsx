import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  styled
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import { useSelector } from "react-redux";
import { formatErrorBadRq } from "../../../helpers/formatError";
const ButDel = styled(Button)({
  display: "flex",
  padding: "2px 4px",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "32px",
  background: "#737373",
  color: "#FFF",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "capitalize",
  "&:hover": {
    background: "#737373",
  },
});
const ButAdd = styled(Button)({
  display: "flex",
  padding: "2px 4px",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "32px",
  background: "#ff7008",
  color: "#FFF",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "capitalize",
  "&:hover": {
    background: "#ff7008",
  },
});
export default function AddStaffDialog(props) {
  const user = useSelector((state) => state.user);
  const { open, setOpen } = props;
  const [payload, setPayload] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (name) => (event) => {
    setPayload({ ...payload, [name]: event.target.value });
  };

  const resetValue = () => {
    setPayload({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrorMsg({});
  };

  const handleSubmit = async () => {
    await axiosBaseUrl.post(`admin/staffs`,payload, {
        header: {
            Authorization: `Bearer ${user.token}`,
        }
    })
    .then((res) => {
        console.log(res.data);
        resetValue();
        setOpen(false);
    })
    .catch((err) => {
        console.log(err.response);
        if (err.response.status === 400){
          let message = formatErrorBadRq(err.response.data);
          setErrorMsg(message);
        }
    });
  };

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "764px", // Set your width here
          },
        },
      }}
    >
      <DialogTitle style={{color: "#ff7008", fontWeight: "600", textAlign: "center"}}>Thêm nhân viên</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Họ và tên <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              id="fullname"
              sx={{ width: "90%" }}
              placeholder="Họ và tên"
              multiline
              onChange={handleChange("fullName")}
              error={!!errorMsg.fullName}
              helperText={errorMsg.fullName}
            />
          </Grid>

          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Tên người dùng <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              id="username"
              required
              sx={{ width: "90%" }}
              placeholder="Username"
              multiline
              onChange={handleChange("username")}
              helperText={errorMsg.username}
              error={!!errorMsg.username}
            />
          </Grid>

          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Email <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              id="email"
              sx={{ width: "90%" }}
              multiline
              onChange={handleChange("email")}
              error={!!errorMsg.email}
              helperText={errorMsg.email}
            />
          </Grid>

          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Số điện thoại <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              id="phone"
              sx={{ width: "90%" }}
              multiline
              onChange={handleChange("phoneNumber")}
              error={!!errorMsg.phoneNumber}
              helperText={errorMsg.phoneNumber}
            />
          </Grid>

          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Địa chỉ <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              id="address"
              sx={{ width: "90%" }}
              multiline
              onChange={handleChange("address")}
              error={!!errorMsg.address}
              helperText={errorMsg.address}
            />
          </Grid>

          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Ngày sinh <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              id="date"
              type="date"
              value={payload.dob}
              onChange={handleChange("dob")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "90%" }}
              error={!!errorMsg.dob}
              helperText={errorMsg.dob}
            />
          </Grid>
          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Mật khẩu <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              margin="normal"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={payload.password}
              onChange={handleChange("password")}
              error={!!errorMsg.password}
              helperText={errorMsg.password}
              sx={{ width: "90%" }}
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
          </Grid>

          <Grid item xs={6}>
            <div style={{ fontFamily: "bolder", marginBottom: "5px" }}>
              {" "}
              Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
            </div>
            <TextField
              margin="normal"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              value={payload.confirmPassword}
              onChange={handleChange("confirmPassword")}
              sx={{ width: "90%" }}
              error={!!errorMsg.confirmPassword}
              helperText={errorMsg.confirmPassword}
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{display: "flex", justifyContent: "center"}}>
        <ButDel
          onClick={() => {
            setOpen(false);
            resetValue();
          }}
        >
          Hủy
        </ButDel>
        <ButAdd onClick={handleSubmit}>Thêm</ButAdd>
      </DialogActions>
    </Dialog>
  );
}
