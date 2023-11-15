import React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getCustomer } from "../../../../APIs/customerAPI";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { StyledTableCell, StyledTableRow } from "./styledTable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getCustomer, getInfoUser, removeUser } from "../../../../apis/userAPI";
import AddUser from "./AddUser/AddUser";
import UpdateHuman from "./UpdateUser/UpdateUser";
import Loading from "../../../../components/Loading/Loading";

export default function UserManagement() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [openAddUser, setOpenAddUser] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [infoUser, setInfoUser] = React.useState({});
  const [isLoadingInfoUser, setIsLoadingInfoUser] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomer,
  });

  const { mutate: handleDeleteUser, error } = useMutation({
    mutationFn: (username) => removeUser(username),
    onSuccess: () => {
      setOpenSuccess(true);
      setOpenError(false);
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });

  const handleOpen = (username) => {
    setUserName(username);
    setIsLoadingInfoUser(true); // Bắt đầu tải dữ liệu
    setOpen(true);
  };

  const handleClose = () => {
    setUserName("");
    setOpen(false);
    setOpenBackdrop(false);
  };

  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteAndReload = () => {
    if (!error) {
      handleDeleteUser(selectedUser);
    } else {
      setOpenError(true);
      setOpenDelete(false);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
    setOpenDelete(false);
    window.location.reload(); // Reload the page if there's an error
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  React.useEffect(() => {
    if (userName) {
      setIsLoadingInfoUser(true);
      setOpenBackdrop(true);
      // Gọi API để lấy infoUser khi userName đã có giá trị
      getInfoUser(userName).then((data) => {
        setInfoUser(data);
        setIsLoadingInfoUser(false); // Dừng trạng thái tải
      });
    }
  }, [userName]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box height={100} />
        <Typography
          sx={{ color: "grey", fontSize: "35px", textAlign: "center" }}
        >
          Quản lý người dùng
        </Typography>

        <Box display={"flex"} justifyContent={"right"} mb={2}>
          <Button
            variant="contained"
            color="warning"
            style={{
              marginLeft: "850px",
            }}
            onClick={handleOpenAddUser}
          >
            Thêm người dùng
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Tài khoản
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Mật khẩu
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Email
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Họ tên
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Số điện thoại
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Mã người dùng
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Chức năng
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <StyledTableRow key={customer.taiKhoan}>
                  <StyledTableCell>{customer.taiKhoan}</StyledTableCell>
                  <StyledTableCell>{customer.matKhau}</StyledTableCell>
                  <StyledTableCell>{customer.email}</StyledTableCell>
                  <StyledTableCell>{customer.hoTen}</StyledTableCell>
                  <StyledTableCell>{customer.soDT}</StyledTableCell>
                  <StyledTableCell>{customer.maLoaiNguoiDung}</StyledTableCell>
                  <StyledTableCell>
                    <Box>
                      <IconButton
                        aria-label="update"
                        size="large"
                        onClick={() => {
                          handleOpen(customer.taiKhoan);
                        }}
                      >
                        <EditIcon fontSize="inherit" color="success" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          setOpenDelete(true);
                          setSelectedUser(customer.taiKhoan);
                        }}
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal update user */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoadingInfoUser ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop> // Hiển thị trạng thái tải
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1000,
              height: 400,
              bgcolor: "background.paper",
              border: "1px solid #fff",
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* Hiển thị form hoặc nội dung modal */}
            <UpdateHuman infoUser={infoUser} onClose={handleClose} />
          </Box>
        )}
      </Modal>

      {/* Modal add user */}
      <Modal
        open={openAddUser}
        onClose={handleCloseAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            height: 400,
            bgcolor: "background.paper",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Hiển thị form hoặc nội dung modal */}
          <AddUser onClose={handleCloseAddUser} />
        </Box>
      </Modal>

      {/* Modal hiển thị thông báo xác nhận xóa */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có muốn xóa tài khoản {selectedUser} ?
          </Typography>
          <Box display={"flex"} justifyContent={"right"} m={2}>
            <Button
              variant="contained"
              color="success"
              sx={{ marginRight: "10px" }}
              onClick={handleDeleteAndReload}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDelete(false);
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Hiện thông báo lỗi */}

      <Modal
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "lavender",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>

      {/* Hiện thông báo xóa user thành công  */}
      <Modal
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "lavender",

            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}></Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Xóa người dùng thành công
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
