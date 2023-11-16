import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProjectDetail,
  updateProject,
  getAllProject,
  getStatus,
  getPriority,
  getTaskType,
  createTask,
} from "../../apis/projectAPI";
import { getUsers, getUserByProjectId } from "../../apis/userAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Slider,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import { Editor } from "@tinymce/tinymce-react";
import { EditBox, CusLable, CusAlert } from "./CreateTask.styles";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";

const createTaskSchema = yup.object().shape({
  listUserAsign: yup.array(),
  taskName: yup.string().required("Tên nhiệm vụ là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  statusId: yup.number().required("Status là bắt buộc"),
  originalEstimate: yup.number(),
  timeTrackingSpent: yup.number(),
  timeTrackingRemaining: yup.number(),
  projectId: yup.number(),
  typeId: yup.number(),
  priorityId: yup.number(),
});

export default function CreateTask() {



  const navigate = useNavigate();



  ///////////////////////////////Time tracking//////////////////////////////////////////////

  const [value, setValue] = React.useState(0);

  const handleChangeTimeline = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  /////////////////////////////////////////////////////////////////////////

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   id: data.id,
    //   projectName: data.projectName,
    //   creator: data.creator,
    //   description: data.description,
    //   categoryId: data.categoryId,
    // },
    resolver: yupResolver(createTaskSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleCreateTask,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => createTask(payload),
    onSuccess: (data) => {},
  });

  const onSubmit = (dataSubmit) => {
    // clean special value
    const cleanedData = Object.fromEntries(
      Object.entries(dataSubmit).map(([key, value]) => {
        if (typeof value === "string") {
          return [key, value.replace(/<p>/g, "").replace(/<\/p>/g, "")];
        }
        if(typeof value === "array")
        return [key, JSON.stringify(value)];
        return [key, value];
      })
    );

    // const listUserAsign = JSON.stringify(cleanedData.map((item)=>{return item.listUserAsignTypeArray}));








   

    // Swal.fire("Đăng nhập thành công!", "", "success");
    toast.success("Create tast success!", {
      position: toast.POSITION.TOP_CENTER,
    });
    handleCreateTask(cleanedData);
    console.log(cleanedData);
  };

  // ======= xử lý Select  =====================
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  // ===== Tiny =============
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  //=======================

  // project name

  const [selectedprojectOption, setSelectedprojectOption] = useState("");

  const { data: projects = [], isLoading: loading } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProject,
    onSuccess: () => {
      setSelectedprojectOption(projects);
    },
  });

  // Status

  const [selectedStatusOption, setSelectedStatusOption] = useState("");

  const { data: status = [], isLoading: loadingStatus } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
    onSuccess: () => {
      setSelectedStatusOption(status);
    },
  });

  // Priority

  const [selectedPriorityOption, setSelectedPriorityOption] = useState("");

  const { data: prioritys = [], isLoading: loadingPriority } = useQuery({
    queryKey: ["prioritys"],
    queryFn: getPriority,
    onSuccess: () => {
      setSelectedPriorityOption(prioritys);
    },
  });
  // Task Type

  const [selectedTaskTypeOption, setSelectedTaskTypeOption] = useState("");

  const { data: tasktypes = [], isLoading: loadingTaskType } = useQuery({
    queryKey: ["tasktypes"],
    queryFn: getTaskType,
    onSuccess: () => {
      setSelectedTaskTypeOption(tasktypes);
    },
  });

  // User Asign

  const [selectedUserAsignOption, setSelectedUserAsignOption] = useState("");

  const { data: userasigns = [], isLoading: loadingUserAsign } = useQuery({
    queryKey: ["userasigns"],
    queryFn: getUsers,
   
    onSuccess: () => {
      setSelectedUserAsignOption(userasigns);
    },
  });

  //reset option

  const [choices, setChoices] = useState([]);

  const handleChangeChoice = (event) => {
    setChoices(event.target.value);
  };

  const handleDelete = (choice) => {
    // setChoices((choices) => Array.filter((name) => choices.name !== choice));

    setChoices(choice.filter((name) => choices.name !== choice));
  };

  /////////////tinymce-react

  const [htmlContent, setHtmlContent] = useState("");

  ////////////

  //------------------------------------------------------------------

  return (
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <h3>Create Task</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditBox>
          <Grid
            container
            spacing={2}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Grid item xs={6}>
              {/* Project Name */}
              <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
                <CusLable id="projectName">Project Name</CusLable>

                <FormControl sx={{ minWidth: "55%" }}>
                  <Select {...register("projectName")} fullWidth>
                    {projects.map((option) => {
                      return (
                        <MenuItem key={option.id} value={option.id}>
                          {option.projectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {errors.projectName && (
                  <CusAlert variant="a">{errors.projectName.message}</CusAlert>
                )}
              </Box>

              {/* Prioritys */}
              <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
                <CusLable id="priorityId"> Priority </CusLable>

                <FormControl sx={{ minWidth: "55%" }}>
                  <Select {...register("priorityId")} fullWidth>
                    {prioritys.map((option) => {
                      return (
                        <MenuItem
                          key={option.priorityId}
                          value={option.priorityId}
                        >
                          {option.priority}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {errors.priorityId && (
                  <CusAlert variant="a">{errors.priorityId.message}</CusAlert>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              {/* Task Name */}

              <Box sx={{ minWidth: "80%" }}>
                <CusLable id="taskName">Task Name</CusLable>
                <TextField
                disabled={false}
                  margin="normal"
                  required
                  name="taskName"
                  autoFocus
                  {...register("taskName")}
                />
                {errors.taskName && (
                  <CusAlert variant="a">{errors.taskName.message}</CusAlert>
                )}
              </Box>

              {/* Task Type */}
              <Box sx={{}}>
                <CusLable id="typeId"> Task Type </CusLable>

                <FormControl sx={{ minWidth: "55%" }}>
                  <Select {...register("typeId")} fullWidth>
                    {tasktypes.map((option) => {
                      return (
                        <MenuItem key={option.id} value={option.id}>
                          {option.taskType}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {errors.typeId && (
                  <CusAlert variant="a">{errors.typeId.message}</CusAlert>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Status */}
          <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
            <CusLable id="statusId">Status</CusLable>

            <FormControl sx={{ minWidth: "30%" }} fullWidth>
              <Select {...register("statusId")}>
                {status.map((option) => {
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

          <Grid
            container
            spacing={3}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Grid item xs={6}>
              {/* Asign */}
              <Box sx={{ marginBottom: "8px", marginTop: "10px" }}>
                <CusLable id="listUserAsign"> Asignees </CusLable>

                <FormControl sx={{ minWidth: "55%" }}>
                  <Select
                    {...register("listUserAsign")}
                    fullWidth
                    multiple
                    multiline
                    value={choices}
                    onChange={handleChangeChoice}
                    renderValue={(selected) => (
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {selected.map((choice) => (
                          <Chip
                            key={choice}
                            label={choice}
                            onDelete={() => handleDelete(choice)}
                            // onDelete={()=>handleDelete}
                            deleteIcon={<CancelIcon />}
                            style={{ margin: "2px" }}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {userasigns.map((option) => {
                      return (
                        <MenuItem key={option.userId} value={option.userId}>
                          <img
                            src={option.avatar}
                            width={25}
                            height={25}
                            style={{ borderRadius: "50%", margin: "2px" }}
                          />{" "}
                          {"  "} {option.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {errors.listUserAsign && (
                  <CusAlert variant="a">
                    {errors.listUserAsign.message}
                  </CusAlert>
                )}
              </Box>

              {/*  original Estimate*/}
              <Box sx={{ marginBottom: "5px" }}>
                <CusLable id="typeId"> Original Estimate </CusLable>
                <TextField
                  sx={{ minWidth: "55%" }}
                  variant="outlined"
                  margin="normal"
                  {...register("originalEstimate")}
                  // name="originalEstimate"
                  // label="originalEstimate"
                  // defaultValue={projectName}
                  error={!!errors.originalEstimate}
                  helperText={errors.originalEstimate?.message}
                  type="number"
                  inputProps={{ min: 0 }}
                />
                {errors.originalEstimate && (
                  <CusAlert variant="a">
                    {errors.originalEstimate.message}
                  </CusAlert>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography paddingLeft={"30%"}> Time Tracking</Typography>

              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleChange}
                aria-labelledby="input-slider"
                min={0}
                max={10}
              />

              <Box display={"flex"}></Box>

              {/* /////////////////////////////////////////////////////////////////// */}

              <Box display={"flex"}>
                <span>Spent: </span>

                <TextField
                  {...register("timeTrackingSpent")}
                  sx={{ maxWidth: "65%" }}
                  variant="outlined"
                  value={10 - value}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 10,
                    },

                    endAdornment: <span>logged</span>,
                  }}
                />
                {errors.timeTrackingSpent && (
                  <CusAlert variant="a">
                    {errors.timeTrackingSpent.message}
                  </CusAlert>
                )}
                <span style={{ paddingLeft: "23px" }}>Remaining: </span>
                <TextField
                  {...register("timeTrackingRemaining")}
                  sx={{ maxWidth: "65%" }}
                  variant="outlined"
                  value={value}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 10,
                    },

                    endAdornment: <span>estimate </span>,
                  }}
                />
                {errors.timeTrackingRemaining && (
                  <CusAlert variant="a">
                    {errors.timeTrackingRemaining.message}
                  </CusAlert>
                )}
              </Box>

              {/* ///////////////////////////////////////////////////////////// */}
            </Grid>
          </Grid>

          {/* Description*/}
          <Controller
            name="description"
            control={control}
            rules={{ required: "Vui lòng nhập nội dung" }}
            render={({ field: { onChange } }) => (
              <Editor
                value={htmlContent}
                apiKey={process.env.REACT_APP_TINYMCE_KEY}
                onEditorChange={(content) => {
                  setHtmlContent(content);
                  onChange(content);
                }}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, }",
                }}
              />
            )}
          />

          {errors.description && <p>{errors.description.message}</p>}
        </EditBox>

        <Button type="submit" variant="contained" color="primary" style={{ marginRight:'12px'}}>
          Create task
        </Button>
        <Button type="button" variant="contained" color="primary" onClick={() => navigate("/projectdetail")}>
          Cancel
        </Button>
      </form>
    </Container>
  );
}
