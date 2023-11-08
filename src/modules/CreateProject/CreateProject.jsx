import { React, useState, useEffect } from "react";
import {
  styles,
  stylesTitle,
  CusImage,
  CusBackGr,
  CusPaper,
  CusButton,
  CusAlert,
  CusBox,
  stylesForm,
  CusReactQuill,
} from "./CreateProject.styles";
import {
  Typography,
  Box,
  TextField,
  InputLabel,
  Grid,
  Paper,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { getProjectCategory, createProject } from "./../../apis/projectAPI";
import { object, string, number } from "yup";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const createProjectSchema = object({
  projectName: string().required("Tên dự án không được để trống"),
  description: string().required("Mô tả không được để trống"),
  categoryId: number().required("Category Id không được để trống"),
  alias: string(),
});

//
// tạo phần description

// const [text, setText] = useState("");

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const QuillEditor = ({ name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <ReactQuill
          {...field}
          onChange={(value) => field.onChange(value)}
          modules={modules}
          formats={formats}
          placeholder="Nhập văn bản của bạn"
          style={{ height: "250px" }}
        />
      )}
    />
  );
};

export default function CreateProject() {
  // useNavigate manage navigate button

  const navigate = useNavigate();

  // project category

  const [selectedOption, setSelectedOption] = useState("");

  const { data: projectCategory = [], isLoading: loading } = useQuery({
    queryKey: ["projectCategory"],
    queryFn: getProjectCategory,
    onSuccess: () => {
      setSelectedOption(projectCategory);
    },
  });

  //---------form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      categoryId: 0,
      alias: "",
    },
    resolver: yupResolver(createProjectSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleCreate,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => createProject(payload),
    onSuccess: () => {
      navigate("/createproject");
    },
    onError: () => {
      Swal.fire("lỗi tè le hột me rồi");
    },
  });

  const onSubmit = (dataSubmit) => {
    // clean special value

    const newDes = dataSubmit.description
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "");

    const formatedValue = { ...dataSubmit, description: newDes };
    handleCreate(formatedValue);

    Swal.fire("Tạo dự án thành công!", "", "success");
  };

  return (
    <div>
      <Box style={stylesTitle.container}>
        <Typography>Project / CreateProject / Create Project</Typography>
      </Box>

      <CusBox>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ margin: "auto", width: "900px", paddingTop: "12px" }}
        >
          <InputLabel>Project Name</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            name="projectName"
            autoFocus
            {...register("projectName")}
          />
          {errors.projectName && (
            <CusAlert variant="a">{errors.projectName.message}</CusAlert>
          )}

          <InputLabel style={{ marginTop: "22px" }}>Description</InputLabel>
          <QuillEditor name="description" control={control} />
          {errors.description && <p>{errors.description.message}</p>}
          <InputLabel style={{ marginTop: "22px" }}>
            Project Category
          </InputLabel>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Alias"
            name="alias"
            autoFocus
            {...register("alias")}
          />

          <Select {...register("categoryId")} fullWidth>
            {projectCategory.map((option) => {
              return (
                <MenuItem key={option.id} value={option.id}>
                  {option.projectCategoryName}
                </MenuItem>
              );
            })}
          </Select>

          <Divider />
          <CusButton
            type="submit"
            style={styles}
            variant="contained"
            color="primary"
          >
            Create Project
          </CusButton>
          {error && <CusAlert variant="a">{errors}</CusAlert>}
        </form>
      </CusBox>
    </div>
  );
}
