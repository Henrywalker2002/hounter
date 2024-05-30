import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  TextField,
  IconButton,
  InputAdornment,
  styled,
  Typography,
  Box
} from "@mui/material";
import Loading from "../../../component/Loading";
import axiosBaseUrl from "../../../api/axiosBaseUrl";
import SearchIcon from "@mui/icons-material/Search";
import AddStaffDialog from "./AddStaffDialog";
import ArticleIcon from '@mui/icons-material/Article';
import BlockIcon from '@mui/icons-material/Block';
import DelAcc from "./DelAcc";

const mappingStatus = (status) => {
  if (status === "Hoạt động") {
    return {
      msg: "Hoạt động",
      color: "#4bcaa0",
    };
  } else  {
    return {
      msg: "Bị khóa",
      color: "red",
    };
  } 
};

const But = styled(Button)({
  padding: "8px 12px",
  marginLeft: "10px",
  color: "#fff",
  fontSize: "14px",
  background: "#10B981",
  borderRadius: "24px",
  textTransform: "none",
  fontWeight: "600",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "#10B981",
    boxShadow: "none",
  },
});
const StyledButton = styled(Button)`
  color: ${(props) => (props.color === "primary" ? "#10b981" : "#6b7280")};
  background-color: ${(props) => (props.color === "primary" ? "#fff" : "transparent")};
  font-size: 20px;
  font-weight: 600;
  text-transform: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #10b981;
    background-color: #fff;
  }
`;
const PaginationContainer = styled (Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px", 
})


export default function AccountList() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [displayUserTable, setDisplayUserTable] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [openDel, setOpenDel] = useState(false);
  const [delId, setDelId]= useState()
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const handleDel = (id) => {
    setDelId(id)
    setOpenDel(true)
  }
  const handleDetail = (id) => {
    navigate(`/admin/accounts/${id}`);
  }
  const toggleDisplay = (value) => {
    setDisplayUserTable(value);
  };
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePageChange = (e, value) => {
    params.pageNo = value;
    fetchAccounts();
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await axiosBaseUrl
      .get(`/admin/users`, {
        params: {pageNo: 1, pageSize: 10, search: searchValue},
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAccounts(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const fetchAccounts = async () => {
    let url = "";
    if (displayUserTable) {
      url = `/admin/users`;
    } else {
      url = `/admin/staffs`;
    }
    await axiosBaseUrl
      .get(url, {
        params: params,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAccounts(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, [loading, displayUserTable, openDel, openAddStaff]);

  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        marginTop: "64px",
        padding: "20px 50px 20px 50px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        sx={{
          color: "#f59e0b",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "700",
          textTransform: "capitalize",
          padding: "0px 0px 10px 0px",
          textAlign: "center",
        }}
      >
        {" "}
        Quản lý tài khoản
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <StyledButton
          color={displayUserTable ? "primary" : "secondary"}
          onClick={() => toggleDisplay(true)}
        >
          Người dùng
        </StyledButton>
        <StyledButton
          color={!displayUserTable ? "primary" : "secondary"}
          onClick={() => toggleDisplay(false)}
        >
          Nhân viên
        </StyledButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          sx={{
            "& .MuiInputBase-input": {
              padding: "10px 12px",
              width: "330px",
              height: "40px",
              boxSizing: "border-box",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon className="w-5 h-5" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Tìm kiếm"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        {displayUserTable ? null : (
          <But
            onClick={() => {
              setOpenAddStaff(true);
            }}
          >
            Thêm nhân viên
          </But>
        )}
      </div>
      {displayUserTable ? (
        <TableContainer component={Paper} sx={{ margin: "20px auto" }}>
          <Table>
            <TableHead sx={{ bgcolor: "rgba(16, 185, 129, 0.41)" }}>
              <TableRow>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Họ và Tên
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Tên người dùng
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Số điện thoại
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Ngày tham gia
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Trạng thái
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account, index) => {
                const status = mappingStatus(account.isActive);
                return(
                <TableRow key={index}>
                  <TableCell>{account.fullName}</TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.phone}</TableCell>
                  <TableCell>{account.createAt}</TableCell>
                  <TableCell style={{ color: `${status.color}` }}>{mappingStatus(account.isActive).msg}</TableCell>
                  <TableCell>
                    <Button
                      onClick={()=>handleDetail(account.id)}
                      style={{color: "black"}}
                    >
                      <ArticleIcon/>
                    </Button>
                    <Button 
                      style={{color: "black"}}
                      onClick={()=>handleDel(account.id)}
                    >
                      <BlockIcon/>
                    </Button>
                  </TableCell>
                </TableRow>
                )})}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper} sx={{ margin: "20px auto" }}>
          <Table>
            <TableHead sx={{ bgcolor: "rgba(16, 185, 129, 0.41)" }}>
              <TableRow>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Họ và Tên
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Tên người dùng
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Số điện thoại
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Ngày tham gia
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  Trạng thái
                </TableCell>
                <TableCell align="left" sx={{ color: "#0C1537" }}>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account, index) => (
                <TableRow key={index}>
                  <TableCell>{account.fullName}</TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.phone}</TableCell>
                  <TableCell>{account.startDate}</TableCell>
                  <TableCell>{account.isActive}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <PaginationContainer>
        <Pagination count={5} onChange={handlePageChange} />
      </PaginationContainer>      
      <AddStaffDialog open={openAddStaff} setOpen={setOpenAddStaff} />
      <DelAcc open={openDel} setOpen={setOpenDel} id={delId}/>
    </div>
  );
}
