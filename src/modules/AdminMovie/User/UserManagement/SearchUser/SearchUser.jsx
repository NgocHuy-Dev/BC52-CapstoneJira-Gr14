import { React, useState } from "react";
import AddUser from "./../AddUser/AddUser";
import {
  Box,
  Button,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Query,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  removeUser,
  addUser,
  getCustomer,
} from "./../../../../../apis/userAPI";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  StyledTableCell,
  StyledTableRow,
} from "./../../UserManagement/styledTable";
import { useNavigate } from "react-router-dom";
import UpdateUser from "../UpdateUser/UpdateUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SearchUser({ searchFiltered }) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Add Movie
  const [openNewMovie, setOpenNewUser] = useState(false);
  const handleOpenNewUser = () => setOpenNewUser(true);
  const handleCloseNewUser = () => setOpenNewUser(false);

  // Edit movie
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserId, setUpdateUserId] = useState(0);
  const handleOpenUpdateUser = (userId) => {
    setOpenUpdateUser(true);
    setUpdateUserId(userId);
  };
  const handleCloseUpdateUser = () => setOpenUpdateUser(false);

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (values) => removeUser(values),

    onSuccess: () => {
      queryClient.invalidateQueries("listUser");
    },
    onError: () => {},
  });
  // search button
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchFiltered, setSearchFiltered] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async () => {
    // const filtered = data.filter((entry) =>
    //   Object.values(entry).some(
    //     (val) => typeof val === "string" && val.includes(searchTerm)
    //   )
    // );
    // // setSearchFiltered(filtered);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Box height={100} />
        <Typography
          sx={{ color: "grey", fontSize: "35px", textAlign: "center" }}
        >
          Quản lý Phim
        </Typography>

        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* //-----------------------------------------------------Tìm sản phẩm ----------------------------------------------------- */}

          <div style={{ marginBottom: "10px", marginTop: "10px" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchSubmit}>Search</button>
          </div>

          {/* /////////////////////////////////////////// */}
          <Button
            variant="contained"
            color="warning"
            onClick={handleOpenNewUser}
            style={{
              marginLeft: "850px",
            }}
          >
            Thêm Phim
          </Button>
        </div>
        <TableContainer
          sx={{ paddingBottom: "20px", width: "100%" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Tài khoản</StyledTableCell>
                <StyledTableCell align="center">Mật khẩu</StyledTableCell>
                <StyledTableCell align="center">Tên Phim</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Họ tên</StyledTableCell>
                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                <StyledTableCell align="center">Mã người dùng</StyledTableCell>
                <StyledTableCell align="center">Chức năng</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {searchFiltered.map((customer) => {
                return (
                  <StyledTableRow
                    key={customer.taiKhoan}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {customer.taiKhoan}
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">
                      <img src={customer.hinhAnh} height={50} />
                    </StyledTableCell> */}
                    <StyledTableCell align="right">
                      {customer.matKhau}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {customer.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {customer.hoTen}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {customer.soDT}
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ display: "flex" }}>
                      <EditIcon
                        sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                        color="success"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenUpdateUser(customer.taiKhoan)}
                      />
                      <DeleteIcon
                        sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                        color="error"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteUser(customer.taiKhoan)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Add Movie */}
      <Modal
        keepMounted
        open={openNewMovie}
        onClose={handleCloseNewUser}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h1>Thêm Phim Mới</h1>
          <AddUser handleClose={handleCloseNewUser} />
        </Box>
      </Modal>

      {/* Edit Movie */}
      <Modal
        keepMounted
        open={openUpdateUser}
        onClose={handleCloseUpdateUser}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h1>Update User</h1>
          <UpdateUser handleClose={handleCloseUpdateUser} id={updateUserId} />
        </Box>
      </Modal>
    </div>
  );
}
