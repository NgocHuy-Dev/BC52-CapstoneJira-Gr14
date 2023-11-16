import {React,useState} from "react";

import { DataGrid, daDK } from "@mui/x-data-grid";

import { getUsers,deleteUser,editUser } from "./../../../apis/userAPI";
import Loading from "./../../../components/Loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {

  IconButton,
  Tooltip,
  Button,
  Box,
  Typography,
  Grid,
  TextField,

} from "@mui/material";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonMain } from "./UserManagemanet.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/////////edit////////////////



const editUserschema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber:yup.string().required("Vui lòng nhập số điện thoại của bạn"),
});






export default function UserManagement() {

  //  search////////////////
  const [searchText, setSearchText] = useState('');
 

  const handleSearch = () => {
    console.log(`Searching for ${searchText}`);
    // Your search logic here
  };

/////////////////////////////////Edit///////////////////////////////////////////


// dungf state ddeer set ungws  id conf ddongj dungf setValue
const [id, setId] = useState('');







const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(editUserschema),mode: "onTouched",
  });


  const {
    mutate: handleEdit,
    isLoading:loading,
    error,
  } = useMutation({
    mutationFn: (payload) => editUser(payload),
    onSuccess: (data) => {
      getUsers(data);
    },
  });
  const onSubmit = (data) => {
    // Swal.fire("Đăng nhập thành công!", "", "success");
   
    handleEdit(data);
    setIsOpen(false)
    setValue("userId",'')
  
    setValue("name", '')
    setValue("email", '')
    setValue("phoneNumber", '')
    toast.success('Chỉnh sửa thông tin người dùng thành công!', {
      position: toast.POSITION.TOP_CENTER,
    });
    console.log(data)
  };
  const handleUpdate =(value)=>{


    
    setIsOpen(true)
    setValue("userId",value.userId)
  
    setValue("name", value.name)
    setValue("email", value.email)
    setValue("phoneNumber", value.phoneNumber)

  }


 











  //////////////////////////////////////////////////////////////



  const navigate = useNavigate();
  const queryClient = useQueryClient();
// tạo collumns

const columns = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "name", headerName: "Tên", width: 200 },

  {
    field: 'avatar',
    headerName: 'Ảnh đại diện',
    width: 130,
    renderCell: (params) => (
      <img src={params.value} alt="Avatar" style={{ height: 50, borderRadius: '50%' }} />
    ),
  },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phoneNumber", headerName: "Số điện thoại", width: 200 },

  {
    field: 'action',
    headerName: 'Hành động',
    width: 130,
    renderCell: (params) => (
      <div>
         
         <Tooltip title="Delete User">
        <IconButton onClick={() => handleDelete(params.row.userId)}>
          <DeleteIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="Edit User">
       


        <IconButton
                        aria-label="update"
                        size="large"
                        onClick={() => handleUpdate(params.row) }
                      >
                        <EditIcon fontSize="inherit" color="success" />
                      </IconButton>
        </Tooltip>
      </div>
    ),
  },
];

// xóa user

const { mutate: handleDeleteUser } = useMutation({
  mutationFn: (id) => {
    return deleteUser(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
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











//
  const { data: allUser = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });
  console.log(allUser);



  if (isLoading) {
    return <Loading />;
  }






  const rows = allUser
  
  //



 


  if (isLoading) {
    return <Loading />;
  }



 


//////////////////////
  return (

<>





{/* /////////////////////////////////////////////////////////////////// */}

{/* Modal edit user */}
{isOpen && (
        <Box  style={{ backgroundColor:'lavender', zIndex:'5',position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',height:'50%' }}>
          <Box display={'flex'} justifyContent={'center'}>
                 <Typography style={{ fontSize:'30px', fontWeight:'bolder'}}variant="h2" gutterBottom>Chỉnh sửa thông tin người dùng</Typography>
                 <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '0%', left: '96%'}}>X</button>
          </Box>
       
      <Box
      marginLeft={1}
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        onSubmit={handleSubmit(onSubmit)}
      >
 
        <Grid container spacing={2}>
          <Grid item xs={6} >
            <Typography>Số thứ tự </Typography>
            <TextField
              disabled
              // value={id}
              variant="outlined"
              fullWidth
              error={!!errors.userId}
              helperText={errors.userId?.message}
              {...register("userId")}
            />
          </Grid>
          <Grid item xs={6}>
          <Typography>Họ tên </Typography>
            <TextField
          
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.matnameKhau?.message}
              {...register("name")}
            />
          </Grid>
          <Grid item xs={6}>
          <Typography>Email </Typography>
            <TextField
            
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>
          <Grid item xs={6} >
          <Typography>Số điện thoại </Typography>
            <TextField
             
              variant="outlined"
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />
          </Grid>
       
         
        </Grid>
        <Box display={"flex"} justifyContent={"center"}>
          <ButtonMain variant="contained" m="10px 0 0 0" type="submit">
            Chỉnh sửa
          </ButtonMain>
        </Box>
   
        </Box>


         
         
        </Box>
      )}


{/* /////////////////////////////////Search//////////////////////////////////////////////// */}

<TextField
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        style={{ backgroundColor:'lavender', marginLeft:'50px', height:'55px' }}
      />
      <ButtonMain onClick={() => handleSearch()} style={{ marginLeft:'5px',height:'55px' }}>Search</ButtonMain>









{/* /////////////////////////////////////////////////////////////// */}
    <div style={{ height: 580, width: "100%" }}>
      <DataGrid




     
        // rows={rows}
        // thiet lap de search
        rows={rows.filter((row) =>
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
        // pageSizeOptions={[9, 10]}
        checkboxSelection
      

      />
    </div>



    










    </>  
  );
}
