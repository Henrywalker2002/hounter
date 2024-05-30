import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  styled,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Sidebar from '../component/Sidebar';
import Footer from '../component/footer';
import axiosBaseUrl from '../api/axiosBaseUrl';
import { useNavigate } from 'react-router-dom';

const Title = styled(Typography)({
  color: "#FF7008",
  fontSize: "32px",
  fontWeight: "600",
  lineHeight: "normal",
  marginBottom: "30px",
  marginTop: "10px"
});
const ButtonCom = styled(Button)({
  padding: "8px 12px",
  backgroundColor: "#ff7008",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "normal",
  margin: "10% 5px 5px 10px",
  textTransform: "none",
  color: "#fff",
  "&:hover": {
    background: "#ff7008",
  },
  borderRadius: "4px",
})
const ButtonCancel= styled(Button)({
  padding: "8px 12px",
  backgroundColor: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "normal",
  margin: "10% 0px 5px 10px",
  textTransform: "none",
  color: "#ff7008",
  "&:hover": {
    background: "#fff",
  },
  borderRadius: "4px",
  border: "1px solid #ff7008"
})

const ChangePassword = () => {
  const navigate= useNavigate()
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const user = useSelector((state) => state.user);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };
  const handelCancel = ()=>{
    navigate("/")
  }
  const handleChangePassword = async (e) => {
    e.preventDefault(); // Ngăn chặn form load lại trang

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const response = await axiosBaseUrl.patch(
        `accounts/${user.user.id}`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      if (response.status === 200) {
        setSuccessOpen(true)
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error(error);
      setErrorOpen(true)
    }
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: "84px",
        position: "relative",
        overflowY: "scroll",        
      }}
    >
      <Grid container sx={{ position: "relative"}}>
        <Grid item xs={2.5}> 
          <Sidebar />
        </Grid>
        <Grid item xs={0.5}/>
        <Grid item xs={8.5} sx={{minHeight: "60vh"}}>
            <Box sx={{backgroundColor: "rgba(255, 255, 255)", borderRadius: "24px",padding: "10px 10px 0px 5%", height: "90%", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1)', marginTop: "10px"}}>
              <Title>Đổi mật khẩu</Title>      
              <Grid container component="form" onSubmit={handleChangePassword} >
              <Grid xs={1} md={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="oldPassword"
                  label="Tên người dùng"
                  id="oldPassword"
                  autoComplete="current-password"
                  value={user.user.username}
                  disabled= {true}
                  sx={{width: "75%", marginTop: "20px"}}
                />
                
                </Grid>
                
                <Grid xs={1} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="oldPassword"
                  label="Mật khẩu cũ"
                  type={showOldPassword ? 'text' : 'password'}
                  id="oldPassword"
                  autoComplete="current-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  sx={{width: "75%", marginTop: "20px"}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                </Grid>
                <Grid xs={1} md={6}>
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  label="Mật khẩu mới"
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{width: "75%", marginTop: "20px"}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>
                <Grid xs={1} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{width: "75%", marginTop: "20px"}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>   
                <Box sx={{textAlign: "center", width: "90%"}}>
                  <ButtonCancel onClick={handelCancel}>Hủy</ButtonCancel>
                  <ButtonCom
                    type="submit"
                    variant="contained"
                  >
                    Lưu
                  </ButtonCom>
                  
              </Box>             
              </Grid>
              
            </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: "100%" }}>
          Thành công!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: "100%" }}>
          Có lỗi xảy ra, vui lòng thử lại!
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
};

export default ChangePassword;
