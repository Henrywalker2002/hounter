import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import { Title } from ".";
import { Button, Avatar, Typography, Divider } from "@mui/material";
import avatar from "../../../image/avatar.png";

export default function PostFeedbackList(props) {
  const { postId, user } = props;
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axiosBaseUrl
      .get(`posts/${postId}/feedbacks`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return feedbacks.length > 0 ? (
    <div sx={{marginLeft: "20px"}}>
      {feedbacks.map((feedback, index) => (
        <div key={index} style={{display: "flex", padding: "5px", backgroundColor: "lightblue", width:"90%", borderRadius: "10px"}}>
            <Avatar
              src={feedback.sender.avatar ? feedback.sender.avatar : avatar}
              sx={{ width: 56, height: 56 }}
            />
            <div style={{ marginLeft: "10px" }}>
              <Typography style={{ fontSize: "15px", fontWeight: "500" }}>
                {feedback.sender.fullName}
              </Typography>
              <Typography style={{ fontSize: "12px", color: "black" }}>
                {feedback.createAt}
              </Typography>
                <Typography style={{ fontSize: "14px", color: "black" }}>
                    {feedback.content}
                </Typography>
            </div>
        </div>
      ))}
    </div>
  ) : null;
}
