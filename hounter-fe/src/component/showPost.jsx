import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  styled,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  CardMedia,
  Box,
} from "@mui/material";
import axiosBaseUrl from "../api/axiosBaseUrl";
import ComparePost from "./comparePost";

const Title = styled(Typography)({
  color: "#F7B648",
  fontSize: "32px",
  fontWeight: "600",
  lineHeight: "normal",
  margin: "10px 0px 20px 7%",
});
const ButtonCom = styled(Button)({
  padding: "8px 12px",
  backgroundColor: "#F7B648",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "normal",
  margin: "10px 0px 20px 7%",
  textTransform: "none",
  color: "#fff",
  "&:hover": {
    background: "#F7B648",
  },
  borderRadius: "32px",
});

const ShowPost = ({ open, onClose, post }) => {
  const [postId, setPostId] = useState("");
  const user = useSelector((state) => state.user);
  const [favor, setFavor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCom, setOpenCom] = useState(false);
  const [error, setError] = useState();
  const handleCloseComDialog = () => {
    setOpenCom(false);
  };

  const handleCompare = () => {
    if (!postId) {
      setError("Bạn chưa nhập mã");
      return;
    } else {
      setOpenCom(true);
      console.log("Bài đăng có mã:", postId);
      setError("");
    }
  };

  const handleCompare2 = (id) => {
   setPostId(id)
   setOpenCom(true);
  };

  const handlePostIdChange = (event) => {
    setPostId(event.target.value);
  };

  useEffect(() => {
    const fetchFavor = async () => {
      await axiosBaseUrl
        .get(`favorite`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          setFavor(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    fetchFavor();
  }, [loading, user.token]);
  console.log(favor);

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"lg"}>
      <Title>Chọn bài viết để so sánh</Title>
      <Box>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ width: "70%", marginLeft: "10%" }}
        >
          <Grid item xs={7}>
            <TextField
              label="Mã bài đăng"
              variant="outlined"
              value={postId}
              onChange={handlePostIdChange}
              fullWidth
              type="number"
              error={!!error}
              helperText={error}
            />
          </Grid>
          <Grid item xs={2}>
            <ButtonCom
              onClick={handleCompare}
              variant="contained"
              color="primary"
              fullWidth
            >
              So sánh
            </ButtonCom>
          </Grid>
          <ComparePost
            open={openCom}
            handleClose={handleCloseComDialog}
            post1={post}
            post2={postId}
          />
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{padding: "10px 20px"}}>
        {favor?.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: {item.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Area: {item.area} m²
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Avatar alt={item.owner.fullName} src={item.owner.avatar} />
                      <Box sx={{ marginLeft: "10px" }}>
                        <Typography variant="body2" color="textSecondary">
                          {item.owner.fullName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(item.createAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Grid>
                <Grid item xs={5}>
                  {item.image ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.title}
                      sx={{ maxWidth: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 140,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        // width: "100%",
                      }}
                    >
                      <Typography variant="h6" color="textSecondary">
                        No Image
                      </Typography>
                    </Box>
                  )}
                 
                </Grid>
                <Grid item xs={2}>
                   <ButtonCom
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "10px", display: "block" }}
                    onClick={()=>{handleCompare2(item.id)}}
                  >
                    So sánh
                  </ButtonCom>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowPost;
