import {React,useState} from "react";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Task from "./Task/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {

  IconButton,
  Tooltip,
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Chip,

} from "@mui/material";

import {
  getProjectDetail,
 
} from "../../../../../../apis/projectAPI";
import { EditBox, CusLable, CusAlert } from "./ListTask.styles";











/////////edit////////////////



const editUserschema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber:yup.string().required("Vui lòng nhập số điện thoại của bạn"),
});















export default function ListTasks({ listTasks, projectId }) {

/////////////////////////////////////////////////

  const [isOpen, setIsOpen] = useState(false);

 
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(editUserschema),mode: "onTouched",
  });


  // const {
  //   mutate: handleEdit,
  //   isLoading:loading,
  //   error,
  // } = useMutation({
  //   mutationFn: (payload) => editUser(payload),
  //   onSuccess: (data) => {
  //     getUsers(data);
  //   },
  // });
  const onSubmit = (data) => {
    // Swal.fire("Đăng nhập thành công!", "", "success");
   
    // handleEdit(data);
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






  const { data: projectSelected = [], isLoading: loading } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
  });



  console.log(projectSelected)



















  /////////////////////////////////////
  console.log("list Task???", listTasks);
  return (


<>




<Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "0 5px",
        m: "0 5px",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.detail.detailContentHeight} - ${theme.spacing(5)} - ${
            theme.detail.columnFooterHeight
          } - ${theme.detail.coloumnHeaderHeight})`,
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2bf",
        },
      }}
    >
      <Card onClick={()=>{ setIsOpen(true)}}
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&last-child": { p: 1.5 } }}>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
        </CardContent>
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          <Button size="small" startIcon={<GroupIcon />}>
            15
          </Button>
          <Button size="small" startIcon={<CommentIcon />}>
            20
          </Button>
          <Button size="small" startIcon={<AttachmentIcon />}>
            25
          </Button>
        </CardActions>
      </Card>
      {/* LIST TASK  */}
      {listTasks?.map((task) => (
        <Task key={task.taskId} task={task} projectId={projectId} />
      ))}
      <Task />

      {/* LIST TASK  */}
    </Box>













{/* /////////////////////////////////////////////////////////////////// */}

{/* Modal edit user */}
{isOpen && (
        <Box  style={{ backgroundColor:'lavender', zIndex:'5',position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',height:'50%' }}>
          <Box display={'flex'} justifyContent={'center'}>
                 <Typography style={{ fontSize:'30px', fontWeight:'bolder'}}variant="h2" gutterBottom>Task Detail</Typography>
                 <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '0%', left: '96%'}}>X</button>
          </Box>
       
      <Box
      marginLeft={1}
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        // onSubmit={handleSubmit(onSubmit)}
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
          {/* Status */}
          <Grid item xs={6}>
         
            
            
            
            
         
          <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
            <CusLable id="statusId">Status</CusLable>

            <FormControl sx={{ minWidth: "30%" }} fullWidth>
              <Select {...register("statusId")}>
                {projectSelected.lstTask.map((option) => {
                  return (
                    <MenuItem key={option.statusId} value={option.statusId}>
                      {option.statusName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {errors.statusId && (
              <CusAlert variant="a">{errors.statusId.message}</CusAlert>
            )}
          </Box>
            
            
            
            
            
            
            
            
            
         
          </Grid>
          {/* Details */}
          <Grid item xs={6}>
                             <Typography>Details </Typography>
            
           
          </Grid>
          {/* Assignees */}
          <Grid item xs={6} >
     
          
          <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
            <CusLable id="statusId">Assignees</CusLable>

            <FormControl sx={{ minWidth: "30%" }} fullWidth>
              <Select {...register("statusId")}>
                {projectSelected.members.map((option) => {
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {errors.statusId && (
              <CusAlert variant="a">{errors.statusId.message}</CusAlert>
            )}
          </Box>
          </Grid>
       

            {/* Priority */}
          <Grid item xs={6}>
         
            
            
            
            
{/*          
         <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
           <CusLable id="statusId">Status</CusLable>

           <FormControl sx={{ minWidth: "30%" }} fullWidth>
             <Select {...register("statusId")}>
               {projectSelected.lstTask.map((option) => {
                 return (
                   <MenuItem key={option.statusId} value={option.statusId}>
                     {option.statusName}
                   </MenuItem>
                 );
               })}
             </Select>
           </FormControl>
           {errors.statusId && (
             <CusAlert variant="a">{errors.statusId.message}</CusAlert>
           )}
         </Box> */}
           
           
           
           
           
           
           
           
           
        
         </Grid>























         
        </Grid>
        <Box display={"flex"} justifyContent={"center"}>
          <Button variant="contained" m="10px 0 0 0" type="submit">
            Chỉnh sửa
          </Button>
        </Box>
   
        </Box>


         
         
        </Box>
      )}


{/* /////////////////////////////////Search//////////////////////////////////////////////// */}



</>


  );
}
