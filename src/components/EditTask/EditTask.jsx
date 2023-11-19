import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStatus,
  getPriority,
  getTaskType,
  editTask,
  getTaskDetail,
  removeTask,
} from "../../apis/projectAPI.js";
import {
  getComment,
  insertComment,
  deleteComment,
} from "../../apis/commentAPI.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
  TextField,
  Button,
  Container,
  Box,
  FormControl,
  Tooltip,
  Select,
  MenuItem,
  Typography,
  Grid,
  Slider,
  Chip,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserContext } from "../../contexts/UserContext/UserContext.jsx";

import { Editor } from "@tinymce/tinymce-react";
import { EditBox, BoxButton, Textarea } from "./EditTask.style.js";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LinkIcon from "@mui/icons-material/Link";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Swal from "sweetalert2";

const editTaskSchema = yup.object().shape({
  taskName: yup.string().required("Tên nhiệm vụ là bắt buộc"),
});

export default function EditTask({
  projectDetail,
  handleClose,
  projectId,
  taskId,
}) {
  const { currentUser } = useUserContext();
  const queryClient = useQueryClient();

  // gọi data

  const { data: taskDetail = [] } = useQuery({
    queryKey: ["getTaskDetail", taskId],
    queryFn: () => getTaskDetail(taskId),
    enabled: !!taskId,
  });
  console.log("Task Detail", taskDetail);
  const { data: priority = [] } = useQuery({
    queryKey: ["priority"],
    queryFn: getPriority,
    enabled: !!taskId,
  });
  const { data: taskType = [] } = useQuery({
    queryKey: ["taskType"],
    queryFn: getTaskType,
  });
  const { data: status = [] } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
    enabled: !!taskId,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["getComment", taskId],
    queryFn: () => getComment(taskId),
    enabled: !!taskId,
  });

  const { mutate: handleInsertComment } = useMutation({
    mutationFn: (payload) => insertComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries("getComment");
    },
  });

  const { mutate: handleRemoveComment } = useMutation({
    mutationFn: (idComment) => deleteComment(idComment),
    onSuccess: () => {
      queryClient.invalidateQueries("getComment");
    },
  });

  const { mutate: handleRemoveTask } = useMutation({
    mutationFn: (taskId) => removeTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries("getTaskDetail");
      Swal.fire("Đã xóa");
      handleClose();
    },
  });

  function getMemberNameById(memberId) {
    const member = projectDetail.members.find(
      (member) => member.userId === memberId
    );

    return member ? member.name : "";
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskName: taskDetail.taskName,
      projectId: taskDetail.projectId,
      statusId: Number(taskDetail.statusId),
      priorityId: Number(taskDetail.priorityId),
      typeId: Number(taskDetail.taskTypeDetail?.id),
      listUserAsign: taskDetail.assigness?.map((user) => user.id),
      originalEstimate: Number(taskDetail.originalEstimate),
      timeTrackingSpent: Number(taskDetail.timeTrackingSpent),
      timeTrackingRemaining: Number(taskDetail.timeTrackingRemaining),
      description: taskDetail.description,
    },
    resolver: yupResolver(editTaskSchema),
    mode: "onTouched",
  });

  const { mutate: handleUpdateTask } = useMutation({
    mutationFn: (values) => editTask(values),
    onSuccess: () => {
      queryClient.invalidateQueries("getTaskDetail");
      Swal.fire("Cập nhật thành công");
      handleClose();
    },
    onError: () => {
      Swal.fire("Kiểm tra lại nhé");
    },
  });
  const onSubmit = (values) => {
    const newValues = {
      ...values,
      taskId: taskDetail.taskId,
      statusId: values.statusId.toString(),
      originalEstimate: Number(values.originalEstimate),
      timeTrackingSpent: Number(values.timeTrackingSpent),
      timeTrackingRemaining: Number(values.timeTrackingRemaining),
    };
    console.log("DATA SUBMIT", newValues);
    handleUpdateTask(newValues);
  };

  //time tracking
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
  const [initialAssignees, setInitialAssignees] = useState(
    taskDetail.assigness?.map((user) => user.id)
  );
  useEffect(() => {
    const assignees = taskDetail.assigness?.map((user) => user.id);
    // console.log(assignees);

    if (taskDetail) {
      setValue("typeId", taskDetail.taskTypeDetail?.id);
      setValue("taskName", taskDetail.taskName);

      setValue("projectId", taskDetail.projectId);
      setValue("description", taskDetail.description);
      setValue("statusId", taskDetail.statusId);
      setValue("listUserAsign", assignees);
      setValue("priorityId", taskDetail.priorityId);
      setValue("originalEstimate", Number(taskDetail.originalEstimate));
      setValue("timeTrackingSpent", Number(taskDetail.timeTrackingSpent));
      setValue(
        "timeTrackingRemaining",
        Number(taskDetail.timeTrackingRemaining)
      );
      setValueOriginalEstimate(taskDetail.originalEstimate);
      setValueTimeRemaining(taskDetail.timeTrackingRemaining);
      setValueTimeSpent(taskDetail.timeTrackingSpent);
      setInitialAssignees(assignees);
    }
  }, [taskDetail, setValue]);

  // ===== Tiny =============
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: "100vh", overflowY: "scroll" }}>
      <Typography sx={{ fontSize: "30pX" }}>Edit Task</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditBox>
          {/* HEADER  */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Task Type */}
              <Box>
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
              {/* ACTION  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Give feedback">
                  <BoxButton>
                    <Button startIcon={<FeedbackIcon />} color="secondary">
                      Give feedback
                    </Button>
                  </BoxButton>
                </Tooltip>
                <Tooltip title="Coppy">
                  <BoxButton>
                    <Button startIcon={<LinkIcon />} color="secondary">
                      Coppy link
                    </Button>
                  </BoxButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ margin: "10px 0" }} />
          <Grid
            container
            spacing={2}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
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
                  marginBottom: "10px",
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
                          const sanitizedValue = newValue.replace(
                            /[e+-]/gi,
                            ""
                          );
                          if (/^[0-9]*$/.test(sanitizedValue)) {
                            field.onChange(sanitizedValue);
                            setValueTimeSpent(Number(sanitizedValue));
                          }
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
                          const sanitizedValue = newValue.replace(
                            /[e+-]/gi,
                            ""
                          );
                          if (/^[0-9]*$/.test(sanitizedValue)) {
                            field.onChange(sanitizedValue);
                            setValueTimeRemaining(Number(sanitizedValue));
                          }
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
              {/* Comment */}
              <Box sx={{ border: "2px solid #3399FF", padding: "2px" }}>
                <label htmlFor="desc">
                  <Typography
                    variant="p"
                    color={"rgb(32, 73, 138)"}
                    fontWeight={"bold"}
                    sx={{ padding: 1 }}
                  >
                    Comment
                  </Typography>
                </label>
                {comments.map((comment) => {
                  return (
                    <Box
                      display={"flex"}
                      key={comment.id}
                      sx={{ marginTop: "10px" }}
                    >
                      <Avatar
                        alt={comment.user.name}
                        src={comment.user.avatar}
                      />

                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{
                          width: "100%",
                          border: "1px solid #DAE2ED",
                          borderRadius: "5px",
                          marginLeft: "8px",
                          marginTop: "5px",
                          padding: "5px 10px",
                        }}
                      >
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: comment.contentComment,
                          }}
                        />
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleRemoveComment(comment.id);
                          }}
                        >
                          <BackspaceIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                })}

                <Box display={"flex"} sx={{ marginTop: "10px" }}>
                  <Avatar alt={currentUser.name} src={currentUser.avatar} />
                  <FormControl
                    size="small"
                    fullWidth
                    sx={{ ml: 1, marginTop: "5px" }}
                  >
                    <Controller
                      name="comment"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          minRows={3}
                          maxRows={6}
                          aria-label="textarea"
                          placeholder="Comment..."
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              // Prevent the default "Enter" behavior
                              handleInsertComment({
                                taskId: taskId,
                                contentComment: `<p>${e.target.value}</p>`,
                              });
                              // Clear the textarea using react-hook-form's setValue
                              field.onChange(""); // Clear the comment field
                            }
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            {/* ==========  */}
            <Grid item xs={6}>
              {/* Prioritys */}
              <Box>
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
                            <MenuItem
                              key={status.statusId}
                              value={status.statusId}
                            >
                              {status.statusName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
              {/* Asigness */}
              <Box sx={{ width: "100%" }}>
                <label htmlFor="">Assigness</label>
                <FormControl fullWidth size="small">
                  <Controller
                    name="listUserAsign"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="listUserAsign"
                        multiple
                        {...field}
                        value={Array.isArray(field.value) ? field.value : []}
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
                                deleteIcon={<PersonRemoveIcon />}
                              />
                            ))}
                          </Box>
                        )}
                      >
                        {projectDetail.members.map((member) => {
                          return (
                            <MenuItem key={member.userId} value={member.userId}>
                              {member.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              {/*  original Estimate*/}
              <Box>
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
            </Grid>
            {/* ===========  */}
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{
              flexDirection: { xs: "column", md: "row", marginTop: "6px" },
            }}
          >
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </EditBox>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button
              sx={{
                marginLeft: "5px",
                backgroundColor: "GrayText",
                "&:hover": {
                  backgroundColor: "#FF0000",
                },
              }}
              onClick={() => handleRemoveTask(taskId)}
              type="button"
              variant="contained"
            >
              Delete task
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: "12px" }}
            >
              Update Task
            </Button>
            <Button
              sx={{
                backgroundColor: "#FF0000",
                "&:hover": {
                  backgroundColor: "#d23434",
                },
              }}
              type="button"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
