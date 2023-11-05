import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectDetail, updateProject } from "../../apis/projectAPI";
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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";

import { Editor } from "@tinymce/tinymce-react";
import { EditBox } from "./styles";
import Swal from "sweetalert2";

const editProjectSchema = object({
  id: number().required("ID là bắt buộc"),
  projectName: string().required("Tên dự án là bắt buộc"),
  description: string(),
  categoryName: string().required("Tên danh mục là bắt buộc"),
});

export default function EditProject() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editProjectSchema),
    mode: "onTouched",
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
  });

  console.log("data edit", data);

  // LƯU Ý CÁI này
  if (Object.keys(data).length > 0) {
    console.log("ctegery Name", data.projectCategory.name);
  }
  // LƯU Ý CÁI này

  const nameOfCategory = data.projectCategory?.name;

  useEffect(() => {
    setValue("id", data.id);
    setValue("projectName", data.projectName);
    setValue("projectCategory", data.projectCategory);
    setValue("description", data.description);
  }, [setValue]);

  const [name, setName] = useState(nameOfCategory); // state của select
  // KO ĐƯỢC XÓA
  const { mutate: handleUpdate } = useMutation({
    mutationFn: (formData) => {
      return updateProject(formData);
    },
    onSuccess: () => {
      Swal.fire("Thành Công!", "Đã cập nhật thông tin người dùng", "success");
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
  // KO ĐƯỢC XÓA

  const onSubmit = (value) => {
    console.log("update Project", value);
  };

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // const { id, projectName, description, categoryName } = data[0];

  // ======= xử lý Select  =====================

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
  return (
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <h3>{`Edit Project ${data.projectName}`}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditBox>
          <Box sx={{ maxWidth: "28%" }}>
            <InputLabel>Project ID</InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              name="id"
              // label="Project ID"
              value={data.id}
              disabled
            />
          </Box>
          <Box sx={{ maxWidth: "28%" }}>
            <InputLabel>Project ID</InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              {...register("projectName")}
              name="projectName"
              // label="Project Name"
              value={data.projectName}
              error={!!errors.projectName}
              helperText={errors.projectName?.message}
              fullWidth
            />
          </Box>
          {Object.keys(data).length > 0 && (
            <Box sx={{ maxWidth: "28%" }}>
              <InputLabel>Project Category</InputLabel>
              <Select
                labelId="projectCategory"
                onChange={handleChange}
                id="projectCategory"
                defaultValue={data.projectCategory?.name}
                sx={{ width: "200px" }}
              >
                <MenuItem value="Dự án phần mềm">Dự án phần mềm</MenuItem>
                <MenuItem value="Dự án web">Dự án web</MenuItem>
                <MenuItem value="Dự án di động">Dự án di động</MenuItem>
              </Select>
            </Box>
          )}
        </EditBox>
        <Box sx={{ marginBottom: "15px" }}>
          <Editor
            apiKey="rfmzf1ezo0i5w87f9fm8q1hk5rzfwi29ak9grgk8bnhden57"
            onInit={(evt, editor) => (editorRef.current = editor)}
            id="description"
            value={data.description}
            onEditorChange={(content) => {
              setValue("description", content);
            }}
            init={{
              height: 300,
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
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Cập nhật
        </Button>
      </form>
    </Container>
  );
}
