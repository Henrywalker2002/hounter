import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import Loading from "../../../component/Loading";
import UserAccountDetail from "./UserAccountDetail";
import {useParams} from "react-router-dom";

export default function AccountDetail(props){
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const { id } = useParams(props, "id");
    const [accountDetail, setAccountDetail] = useState({});
    useEffect(() => {
        const fetchUserDetails = async () =>{
            await axiosBaseUrl.get(`/admin/users/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + user.token,
                },
            })
            .then((res) => {
                setAccountDetail(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        fetchUserDetails();
    }, [loading])
    return loading ? (
        <Loading />
      ) : (
        <Box
          style={{
            marginTop: "64px",
            backgroundColor: "f1f1f1",
            padding: "5px 64px",
          }}
        >
            <UserAccountDetail accountDetail={accountDetail} />
        </Box>
      );
}