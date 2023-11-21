import { React, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { getUsers, deleteUser, editUser } from "./../../../apis/userAPI";
import Loading from "./../../../components/Loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Tooltip,
  Box,
  Grid,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Avatar,
  Modal,
  Paper,
  InputBase,
} from "@mui/material";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { blue } from "@mui/material/colors";
import { object, string, ref, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonMain } from "./UserManagemanet.styles";

const editUserschema = object({
  email: string()
    .required("Email must not be empty")
    .email("Email is not in the correct format"),
  password: string()
    .required("Password must not be empty")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Password must be at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    ),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  name: string().required("Name must not be empty"),
  phoneNumber: number().positive().typeError("You can only enter the number"),
});

export default function UserManagement() {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { data: allUser = [], isLoading } = useQuery({
    queryKey: ["allUser"],
    queryFn: getUsers,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    resolver: yupResolver(editUserschema),
    mode: "onTouched",
  });

  const { mutate: handleEdit } = useMutation({
    mutationFn: (payload) => editUser(payload),
    onSuccess: () => {
      setOpen(false);

      Swal.fire("Cập nhật thành công!");
      reset();
      queryClient.invalidateQueries("allUser");
    },
    onError: (error) => Swal.fire(error),
  });

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => {
      return deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("allUser");
    },
  });

  const handleDelete = (id) => {
    // Xử lý xóa dữ liệu với ID được cung cấp
    Swal.fire({
      title: `Bạn muốn xóa người dùng  ${id}?`,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      // toast.error(" Xác nhận mật khẩu không trùng khớp!");
    } else {
      handleEdit({ ...data, id: userId });
    }
  };

  const handleUpdate = (value) => {
    setOpen(true);
    setValue("id", value.userId);
    setValue("email", value.email);
    setValue("name", value.name);
    setValue("phoneNumber", value.phoneNumber);
    setUserId(value.userId);
  };

  // tạo collumns
  const columns = [
    { field: "userId", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },

    {
      field: "avatar",
      headerName: "Avatar",
      width: 130,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt="Avatar"
          sx={{
            height: "40px",
            width: "40px",
          }}
        />
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone number", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <div>
          <Tooltip title="Delete User">
            <IconButton onClick={() => handleDelete(params.row.userId)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit User">
            <IconButton
              sx={{ color: blue[500] }}
              aria-label="update"
              size="large"
              onClick={() => handleUpdate(params.row)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          margin: "5px",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "35px", fontWeight: "bold", color: "#556CD6" }}
          >
            USER MANAGEMENT
          </Typography>
        </Box>
        <Box>
          <Paper
            component="form"
            sx={{
              p: "4px 4px",
              mr: 1,
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>

      <DataGrid
        sx={{ margin: "5px 20px", height: "580px" }}
        rows={allUser.filter((row) =>
          Object.values(row).some(
            (value) => String(value).indexOf(searchText) > -1
          )
        )}
        getRowId={(row) => row.userId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            with: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            m: 1,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              sx={{ fontSize: "30px", fontWeight: "bold" }}
              variant="h2"
              gutterBottom
            >
              Edit user
            </Typography>
          </Box>

          <DialogContent dividers sx={{ padding: 2 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="email-basic"
                    fullWidth
                    label="Email"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email")}
                  />
                  <FormControl
                    sx={{ mb: 3 }}
                    variant="outlined"
                    error={!!errors.email}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type="text"
                      label="Password"
                      {...register("password")}
                    />
                  </FormControl>
                  {!!errors.password && (
                    <Typography
                      sx={{
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: 1.66,
                        letterSpacing: "0.03333em",
                        margin: "-20px 14px 25px 14px",
                        color: "#d32f2f",
                      }}
                    >
                      {errors.password?.message}
                    </Typography>
                  )}

                  <FormControl
                    sx={{ mb: 3 }}
                    variant="outlined"
                    error={!!errors.confirmPassword}
                  >
                    <InputLabel htmlFor="confirm-password-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="confirm-password-password"
                      type="text"
                      label="Confirm Password"
                      {...register("confirmPassword")}
                    />
                  </FormControl>
                  {!!errors.confirmPassword && (
                    <Typography
                      sx={{
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: 1.66,
                        letterSpacing: "0.03333em",
                        margin: "-20px 14px 25px 14px",
                        color: "#d32f2f",
                      }}
                    >
                      {errors.confirmPassword?.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="name-basic"
                    fullWidth
                    label="Name"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name")}
                  />
                  <TextField
                    id="phone-basic"
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    {...register("phoneNumber")}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <ButtonMain color="inherit" onClick={() => setOpen(false)}>
                  Cancel
                </ButtonMain>
                <ButtonMain
                  sx={{ paddingLeft: "10px" }}
                  color="warning"
                  variant="contained"
                  type="submit"
                >
                  Edit
                </ButtonMain>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Modal>
    </>
  );
}
