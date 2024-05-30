import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Box, Button, Typography, styled } from "@mui/material";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import Loading from "../../../component/Loading";
import { useSelector } from "react-redux";
import PostTable from "./PostTable";
import FilterPost from "../../../component/FilterPost";

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
});

export default function AdminManagePost() {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    pageSize: "10",
    pageNo: "1",
    category: "",
    status: "",
    cost: "",
  });
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setParams({ ...params, [name]: event.target.value });
    console.log(params);
  };

  const fetchProductList = async () => {
    await axiosBaseUrl
      .get(`/staffs/posts`, {
        params: params,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setPost(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchProductList = async () => {
      await axiosBaseUrl
        .get(`/staffs/posts`, {
          params: params,
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setPost(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchProductList();
  }, [loading, user.token, params, open]);

  const handleConfirmPost = async (postId, statusName) => {
    await axiosBaseUrl
      .patch(
        `staffs/posts/${postId}`,
        {
          status: statusName,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((res) => {
        const post_list = post.filter((item) => item.id !== postId);
        setPost(post_list);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Box
      style={{
        padding: "64px 5% 20px 5%",        
        backgroundColor: "#fff"
      }}
    >
      <Typography
        sx={{
          color: "#f59e0b",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "700",
          textTransform: "capitalize",
          padding: "30px 0px 10px 0px",
        }}
      >
        {" "}
        Quản lý bài đăng
      </Typography>

      <Box
        style={{
          padding: "20px",       
         
        }}
      >
        <FilterPost params={params} handleChange={handleChange} />
        <div
          style={{
            borderTop: "1px solid #e0e0e0 ",
          }}
        ></div>
        {loading ? (
          <Loading />
        ) : (
          <PostTable
            post={post}
            setLoading={setLoading}
            handleConfirmPost={handleConfirmPost}
            open={open}
            setOpen={setOpen}
          />
        )}
        <PaginationContainer>
          <Pagination
            count={5}
            onChange={(e, value) => {
              setParams({ ...params, pageNo: value });
            }}
          />
        </PaginationContainer>
      </Box>
    </Box>
  );
}
