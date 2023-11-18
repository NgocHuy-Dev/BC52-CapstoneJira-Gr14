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
import * as yup from "yup";

import { Editor } from "@tinymce/tinymce-react";
import { EditBox, CusAlert } from "./CreateTask.styles";
import CancelIcon from "@mui/icons-material/Cancel";

const createTaskSchema = yup.object().shape({
  listUserAsign: yup.array(),
  taskName: yup.string().required("Tên nhiệm vụ là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  statusId: yup.number().required("Status là bắt buộc"),
  originalEstimate: yup.number(),
  timeTrackingSpent: yup.number(),
  timeTrackingRemaining: yup.number(),

  typeId: yup.number(),
  priorityId: yup.number(),
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
    },
  },
};

export default function CreateTask() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  ///////////////////////////////Time tracking//////////////////////////////////////////////

  // const handleChangeTimeline = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const handleInputChange = (event) => {
  //   setValue(event.target.value === "" ? "" : Number(event.target.value));
  // };

  /////////////////////////////////////////////////////////////////////////

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskName: "",
      projectId: "",
      statusId: "",
      priorityId: "",
      typeId: "",
      listUserAsign: [],
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      description: "",
    },
    resolver: yupResolver(createTaskSchema),
    mode: "onTouched",
  });

  // gọi data
  const { data: allProject = [], isLoading } = useQuery({
    queryKey: ["createTask"],
    queryFn: getAllProject,
    enabled: !!projectId,
  });

  const { data: priority = [] } = useQuery({
    queryKey: ["priority"],
    queryFn: getPriority,
    enabled: !!projectId,
  });
  const { data: taskType = [] } = useQuery({
    queryKey: ["taskType"],
    queryFn: getTaskType,
  });
  const { data: status = [] } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
    enabled: !!projectId,
  });

  console.log("ALL STATUS", status);

  const { data: projectDetail = [] } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
  });

  const { mutate: handleCreateTask, error } = useMutation({
    mutationFn: (values) => createTask(values),
    onSuccess: () => {
      navigate(`/projectdetail/${projectId}`);
    },
  });

  const onSubmit = (values) => {
    const newValues = {
      ...values,
      statusId: values.statusId.toString(),
      originalEstimate: Number(values.originalEstimate),
      timeTrackingSpent: Number(values.timeTrackingSpent),
      timeTrackingRemaining: Number(values.timeTrackingRemaining),
    };
    handleCreateTask(newValues);
  };

  function getMemberNameById(memberId) {
    const member = projectDetail?.members.find(
      (member) => member.userId === memberId
    );
    return member ? member.name : "";
  }

  const [valueTimeSpent, setValueTimeSpent] = useState(0);
  const [valueTimeRemaining, setValueTimeRemaining] = useState(0);
  const [valueOriginalEstimate, setValueOriginalEstimate] = useState(0);

  const RemainingAndEstimate = (Remaining, Estimate) => {
    if (Remaining) {
      if (Remaining > 0) {
        return <Typography>{Remaining}h remaining</Typography>;
      } else {
        return <Typography>0h remaining</Typography>;
      }
    } else if (Estimate) {
      if (Remaining > 0) {
        return <Typography>{Remaining}h remaining</Typography>;
      } else if (Estimate > 0) {
        return <Typography>{Estimate}h estimate</Typography>;
      } else {
        return <Typography>0h remaining</Typography>;
      }
    } else {
      return <Typography>0h remaining</Typography>;
    }
  };

  useEffect(() => {
    if (projectDetail || allProject) {
      setValue("projectId", projectId.toString());
      setValue("priorityId", priority[0]?.priorityId);
      setValue("typeId", taskType[0]?.id);
    }
  }, [setValue, projectDetail, projectId, allProject, priority, taskType]);

  // ===== Tiny =============
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  //=======================

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
  const [projectName, setProjectName] = useState();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjectName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
              <Box>
                <label htmlFor="projectId">
                  <Typography variant="p">Project Name</Typography>
                </label>
                <FormControl fullWidth>
                  <Controller
                    name="projectId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="projectId"
                        id="projectId"
                        multiline
                        value={projectName}
                        onChange={handleChange}
                        {...field}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200, // Đặt chiều cao tối đa của menu danh sách
                            },
                          },
                        }}
                      >
                        {allProject?.map((project) => {
                          return (
                            <MenuItem key={project.id} value={project.id}>
                              {project.projectName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              {/* Prioritys */}
              <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
                <label htmlFor="priorityId">
                  <Typography variant="p">Priority</Typography>
                </label>
                <FormControl fullWidth size="small">
                  <Controller
                    name="priorityId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="priorityId"
                        id="priorityId"
                        {...field}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200, // Đặt chiều cao tối đa của menu danh sách
                            },
                          },
                        }}
                      >
                        {priority.map((item) => {
                          return (
                            <MenuItem
                              key={item.priorityId}
                              value={item.priorityId}
                            >
                              {item.priority}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {/* Task Name */}

              <Box>
                <label htmlFor="taskName">
                  <Typography variant="p">Task Name</Typography>
                </label>
                <TextField
                  size="small"
                  id="taskName"
                  variant="outlined"
                  fullWidth
                  placeholder="Name task..."
                  {...register("taskName")}
                  error={!!errors.taskName}
                  helperText={errors.taskName?.message}
                />
              </Box>

              {/* Task Type */}
              <Box sx={{ marginBottom: "8px", marginTop: "16px" }}>
                <label htmlFor="typeId">
                  <Typography variant="p">Task Type</Typography>
                </label>
                <FormControl fullWidth size="small">
                  <Controller
                    name="typeId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="typeId"
                        id="typeId"
                        {...field}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
                      >
                        {taskType.map((type) => {
                          return (
                            <MenuItem key={type.id} value={type.id}>
                              {type.taskType}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Status */}
          <Box width={"100%"}>
            <label htmlFor="statusId">
              <Typography variant="p">Status Type</Typography>
            </label>
            <FormControl fullWidth size="small">
              <Controller
                name="statusId"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="statusId"
                    id="statusId"
                    {...field}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200, // Đặt chiều cao tối đa của menu danh sách
                        },
                      },
                    }}
                  >
                    {status.map((status) => {
                      return (
                        <MenuItem key={status.statusId} value={status.statusId}>
                          {status.statusName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Grid item xs={6}>
              {/* Asign */}
              {Object.keys(projectDetail).length > 0 && (
                <Box sx={{ width: "100%" }}>
                  <label htmlFor="listUserAsign">
                    <Typography variant="p">Assignees</Typography>
                  </label>
                  <FormControl fullWidth size="small">
                    <InputLabel id="listUserAsign-label">
                      Select assignees
                    </InputLabel>
                    <Controller
                      name="listUserAsign"
                      control={control}
                      render={({ field }) => (
                        <Select
                          labelId="listUserAsign-label"
                          id="listUserAsign"
                          multiple
                          {...field}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200, // Đặt chiều cao tối đa của menu danh sách
                              },
                            },
                          }}
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={getMemberNameById(value)}
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {projectDetail.members.map((member) => {
                            return (
                              <MenuItem
                                key={member.userId}
                                value={member.userId}
                              >
                                {member.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Box>
              )}

              {/*  original Estimate*/}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <label htmlFor="originalEstimate">
                    <Typography variant="p">Original Estimate</Typography>
                  </label>
                  <Controller
                    name="originalEstimate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        id="originalEstimate"
                        variant="outlined"
                        fullWidth
                        placeholder="0"
                        value={field.value}
                        onInput={(e) => {
                          const newValue = e.target.value;

                          const sanitizedValue = newValue.replace(
                            /[e+-]/gi,
                            ""
                          );

                          if (/^[0-9]*$/.test(sanitizedValue)) {
                            field.onChange(sanitizedValue);
                            setValueOriginalEstimate(Number(sanitizedValue));
                          }
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {/* time tracking */}
              <Box sx={{ width: "100%" }}>
                <label htmlFor="timeTracking">
                  <Typography variant="p">Time Tracking</Typography>
                </label>
                <Box sx={{ pl: 1 }}>
                  <Slider
                    onMouseDown={(e) => {
                      if (true) {
                        e.preventDefault();
                      }
                    }}
                    sx={{
                      "& .MuiSlider-thumb": {
                        display: "none",
                      },
                    }}
                    aria-labelledby="timeTracking-slider"
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} hours`}
                    step={1}
                    min={0}
                    max={
                      Number(valueTimeRemaining) ||
                      Number(valueOriginalEstimate)
                    }
                    value={Number(valueTimeSpent)}
                    onChange={(event, newValue) => {
                      // Cập nhật giá trị của valueTimeSpent khi Slider thay đổi
                      setValueTimeSpent(Number(newValue));
                    }}
                  />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {valueTimeSpent > 0 ? (
                      <Typography>{valueTimeSpent}h logged</Typography>
                    ) : (
                      <Typography>0h logged</Typography>
                    )}
                    {RemainingAndEstimate(
                      valueTimeRemaining,
                      valueOriginalEstimate
                    )}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  width: "100%",
                }}
              >
                {/* Time Spent */}
                <Box width={"100%"}>
                  <label htmlFor="timeTrackingSpent">
                    <Typography
                      variant="p"
                      color={"rgb(32, 73, 138)"}
                      fontWeight={"bold"}
                    >
                      Time Spent
                    </Typography>
                  </label>
                  <Controller
                    name="timeTrackingSpent"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        type="text"
                        id="timeTrackingSpent"
                        variant="outlined"
                        fullWidth
                        placeholder="0"
                        value={field.value}
                        onInput={(e) => {
                          const newValue = e.target.value;

                          // Xóa các ký tự "e", "+", và "-" khỏi giá trị mới
                          const sanitizedValue = newValue.replace(
                            /[e+-]/gi,
                            ""
                          );

                          // Kiểm tra giá trị mới sau khi xóa ký tự không hợp lệ
                          if (/^[0-9]*$/.test(sanitizedValue)) {
                            // Nếu giá trị hợp lệ (chỉ chứa các chữ số), thì cập nhật giá trị
                            field.onChange(sanitizedValue);
                            setValueTimeSpent(Number(sanitizedValue));
                          }
                          // Nếu giá trị không hợp lệ, không thực hiện thay đổi
                        }}
                      />
                    )}
                  />
                </Box>
                {/* Time Remaining */}
                <Box width={"100%"}>
                  <label htmlFor="timeTrackingRemaining">
                    <Typography
                      variant="p"
                      color={"rgb(32, 73, 138)"}
                      fontWeight={"bold"}
                    >
                      Time Remaining
                    </Typography>
                  </label>
                  <Controller
                    name="timeTrackingRemaining"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        type="text"
                        id="timeTrackingRemaining"
                        variant="outlined"
                        fullWidth
                        placeholder="0"
                        value={field.value}
                        onInput={(e) => {
                          const newValue = e.target.value;

                          // Xóa các ký tự "e", "+", và "-" khỏi giá trị mới
                          const sanitizedValue = newValue.replace(
                            /[e+-]/gi,
                            ""
                          );

                          // Kiểm tra giá trị mới sau khi xóa ký tự không hợp lệ
                          if (/^[0-9]*$/.test(sanitizedValue)) {
                            // Nếu giá trị hợp lệ (chỉ chứa các chữ số), thì cập nhật giá trị
                            field.onChange(sanitizedValue);
                            setValueTimeRemaining(Number(sanitizedValue));
                          }
                          // Nếu giá trị không hợp lệ, không thực hiện thay đổi
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Description*/}
          <Controller
            name="description"
            control={control}
            rules={{ required: "Vui lòng nhập nội dung" }}
            render={({ field }) => (
              <Editor
                apiKey="rfmzf1ezo0i5w87f9fm8q1hk5rzfwi29ak9grgk8bnhden57"
                onEditorChange={field.onChange}
                value={field.value}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
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
        </EditBox>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginRight: "12px" }}
        >
          Create task
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => navigate("/projectdetail")}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
}
