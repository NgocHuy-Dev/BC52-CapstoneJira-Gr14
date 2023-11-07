import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectDetail, updateProject } from "../../apis/projectAPI";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FilledInput,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";

import { Editor } from "@tinymce/tinymce-react";
import { EditBox } from "./styles";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const editProjectSchema = object({
  id: number().required("ID là bắt buộc"),
  projectName: string().required("Tên dự án là bắt buộc"),
  description: string(),
  categoryId: string().required("Tên danh mục là bắt buộc"),
});

export default function EditProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(); // select

  const { data = [], isLoading } = useQuery({
    queryKey: ["projectId", projectId],
    queryFn: () => getProjectDetail(projectId),
  });
  console.log("data edit", data);
  console.log("project Name:", data?.projectName);
  console.log("data edit", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data?.id,
      projectName: data?.projectName,
      creator: 0,
      description: data?.description,
      categoryId: data?.projectCategory?.id,
    },

    resolver: yupResolver(editProjectSchema),
    mode: "onTouched",
  });

  const { mutate: handleUpdate, error } = useMutation({
    mutationFn: (payload) => updateProject(payload),
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      Swal.fire("Lỗi!!");
    },
  });

  const onSubmit = (dataUpdate) => {
    const newDes = dataUpdate.description
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "");
    const formatValue = { ...dataUpdate, description: newDes };
    handleUpdate(formatValue);
    Swal.fire("Cập nhật thành công!", "", "success");
  };

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
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
              name="id"
              required
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("id")}
            />
          </Box>

          <Box sx={{ maxWidth: "28%" }}>
            <InputLabel>Project Name</InputLabel>
            <TextField
              name="projectName"
              required
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("projectName")}
            />
          </Box>

          {Object.keys(data).length > 0 && (
            <Box sx={{ maxWidth: "28%" }}>
              <InputLabel>Project Category</InputLabel>
              <FormControl fullWidth>
                <Select value={category} fullWidth {...register("categoryId")}>
                  <MenuItem value={1}>Dự án web</MenuItem>
                  <MenuItem value={2}>Dự án phần mềm</MenuItem>
                  <MenuItem value={3}>Dự án di động</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </EditBox>
        <Box sx={{ marginBottom: "15px" }}>
          <Editor
            apiKey="rfmzf1ezo0i5w87f9fm8q1hk5rzfwi29ak9grgk8bnhden57"
            onInit={(evt, editor) => (editorRef.current = editor)}
            {...register("description")}
            init={{
              height: 300,
              menubar: true,
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
