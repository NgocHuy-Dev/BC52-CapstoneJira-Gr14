import React, { useState, useRef } from "react";
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

  // const { data = [], isLoading } = useQuery({
  //   queryKey: ["projectId", projectId],
  //   queryFn: () => getProjectDetail(projectId),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   id: data.id,
    //   projectName: data.projectName,
    //   creator: data.creator,
    //   description: data.description,
    //   categoryId: data.categoryId,
    // },
    resolver: yupResolver(editProjectSchema),
    mode: "onTouched",
  });

  // KO ĐƯỢC XÓA
  // const { mutate: onSubmit } = useMutation({
  //   mutationFn: (formData) => {
  //     return updateProject(formData);
  //   },
  //   onSuccess: () => {
  //     Swal.fire("Thành Công!", "Đã cập nhật thông tin người dùng", "success");
  //     queryClient.invalidateQueries({ queryKey: ["project"] });
  //   },
  // });
  // KO ĐƯỢC XÓA

  const onSubmit = (value) => {
    console.log("update Project", value);
  };

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // const { id, projectName, description, categoryName } = data[0];

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
  return (
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <h3>Edit Project</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditBox>
          <TextField
            sx={{ maxWidth: "28%" }}
            variant="outlined"
            margin="normal"
            name="id"
            label="Project ID"
            // defaultValue={id}
          />
          <TextField
            sx={{ maxWidth: "28%" }}
            variant="outlined"
            margin="normal"
            {...register("projectName")}
            name="projectName"
            label="Project Name"
            // defaultValue={projectName}
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
            fullWidth
          />

          <Box sx={{ minWidth: "28%", marginBottom: "8px", marginTop: "16px" }}>
            <FormControl fullWidth>
              <InputLabel id="categoryName">Category</InputLabel>
              <Select
                labelId="categoryName"
                id="categoryName"
                // defaultValue={categoryName}
                value={name}
                label="categoryName"
                onChange={handleChange}
              >
                <MenuItem value="Dự án phần mềm">Dự án phần mềm</MenuItem>
                <MenuItem value="Dự án web">Dự án web</MenuItem>
                <MenuItem value="Dự án di động">Dự án di động</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </EditBox>
        <Box sx={{ marginBottom: "15px" }}>
          <Editor
            apiKey="rfmzf1ezo0i5w87f9fm8q1hk5rzfwi29ak9grgk8bnhden57"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="Nhét descript vào đây"
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
