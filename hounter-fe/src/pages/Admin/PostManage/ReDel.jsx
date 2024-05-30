import React from 'react';
import { Dialog, DialogTitle, Button, Typography, styled, Box } from '@mui/material';
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

const ReDel = ({ open, setOpen, id }) => {
    const user = useSelector((state) => state.user);
    const handleDel = () => {
      const response = axiosBaseUrl
        .post(`staffs/request-delete-post/${id}`,{} ,{
          headers: {
            Authorization: "Bearer " + user.token,
            // ContentType: "application/json",
          },
        })
        .then((res) => {
          setOpen(false);
        }).catch((e)=>{
            console.log(e)
        });
    }; 
    
    return (
        <Dialog open={open} setOpen={setOpen} >
            <DialogTitle>
            <Title>Gửi yêu cầu xóa bài viết này?</Title>
            </DialogTitle>
            <Box sx={{textAlign: "center"}}>
                <ButtonCancel onClick={()=>{setOpen(false)}}>Hủy</ButtonCancel>
                <ButtonCom
                type="submit"
                variant="contained"
                onClick={handleDel}
                >
                Gửi
                </ButtonCom>                  
            </Box>
        </Dialog>
    );
};

export default ReDel;
