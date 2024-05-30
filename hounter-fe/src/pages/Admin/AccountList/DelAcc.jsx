import React from 'react';
import { Dialog, DialogTitle, Box, Button, Typography, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosBaseUrl from '../../../api/axiosBaseUrl';
const Title = styled(Typography)({
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "normal",
    margin: "10px 0px 20px 7%",
});
const ButtonCom = styled(Button)({
    padding: "8px 12px",
    backgroundColor: "#ff7008",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "normal",
    margin: "20px 5px 5px 10px",
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
    margin: "20px 0px 5px 10px",
    textTransform: "none",
    color: "#ff7008",
    "&:hover": {
      background: "#fff",
    },
    borderRadius: "4px",
    border: "1px solid #ff7008"
  })

const DelAcc = ({ open, setOpen, id }) => {
    const user = useSelector((state) => state.user);
    const handleDel = async()=>{
        try {
            const response = await axiosBaseUrl.delete(
              `admin/account/${id}`,
              {
                headers: {
                  Authorization: "Bearer " + user.token,
                },
              }
            );
            if (response.status === 200) {
              setOpen(false)
            }
          } catch (error) {
            console.error(error);
            alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          }
    }
    return (
        <Dialog open={open} setOpen={setOpen}>
            <DialogTitle>
                <Title>Bạn có chắc muốn khóa tài khoản này?</Title>
            </DialogTitle>
            <Box sx={{textAlign: "center"}}>
                <ButtonCancel onClick={()=>{setOpen(false)}}>Hủy</ButtonCancel>
                <ButtonCom
                type="submit"
                variant="contained"
                onClick={handleDel}
                >
                Xóa
                </ButtonCom>                  
            </Box>
            {/* <DialogActions>
                <Button onClick={()=>{setOpen(false)}} color="primary">Đóng</Button>
            </DialogActions> */}
        </Dialog>
    );
};

export default DelAcc;
