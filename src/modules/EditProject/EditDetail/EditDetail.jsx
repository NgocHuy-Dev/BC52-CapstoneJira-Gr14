import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  TextField,
  Button,
  Container,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";

import { Editor } from "@tinymce/tinymce-react";
import { EditBox } from "./styles";
import { updateProject } from "../../../apis/projectAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const editProjectSchema = object({
  id: number().required("ID là bắt buộc"),
  projectName: string().required("Tên dự án là bắt buộc"),

  description: string(),
  categoryId: string().required("Tên danh mục là bắt buộc"),
});

export default function EditDetail({ data, projectId }) {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // state của select

  console.log("data edit", data);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      id: data.id,
      projectName: data.projectName,
      creator: 0,
      description: data.description,
      categoryId: data.projectCategory.id,
    },
    resolver: yupResolver(editProjectSchema),
    mode: "onTouched",
  });

  const { mutate: handleUpdate, error } = useMutation({
    mutationFn: (formData) => updateProject(projectId, formData),
  });

  const onSubmit = (formData) => {
    // clean special value
    const newDes = formData.description
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "");

    const formatedValue = { ...formData, description: newDes };

    console.log("data submit", formatedValue);
    handleUpdate(formatedValue);

    Swal.fire("Cập nhật thành công!", "", "success");
  };

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
          {/* === ID  ===== */}
          <Box sx={{ maxWidth: "28%" }}>
            <InputLabel>Project ID</InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              name="id"
              disabled
              {...register("id")}
            />
          </Box>

          {/* ==== NAME ===  */}
          <Box sx={{ maxWidth: "28%" }}>
            <InputLabel>Project Name</InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              name="projectName"
              {...register("projectName")}
              helperText={errors.projectName?.message}
              fullWidth
            />
          </Box>

          {/* ===== SELECT CATEGORY ID ==== */}
          <Box sx={{ maxWidth: "28%" }}>
            <InputLabel>Project Category</InputLabel>
            <Select
              labelId="projectCategory"
              onChange={handleChange}
              id="projectCategory"
              defaultValue={data.projectCategory.id}
              {...register("categoryId")}
              sx={{ width: "200px" }}
            >
              <MenuItem value="1">Dự án phần mềm</MenuItem>
              <MenuItem value="2">Dự án web</MenuItem>
              <MenuItem value="3">Dự án di động</MenuItem>
            </Select>
          </Box>
        </EditBox>

        {/* =====  DES ===  */}
        <Box sx={{ marginBottom: "15px" }}>
          <Editor
            apiKey="rfmzf1ezo0i5w87f9fm8q1hk5rzfwi29ak9grgk8bnhden57"
            initialValue={data.description}
            onEditorChange={(content) => {
              setValue("description", content);
            }}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "link",
                "image",
                "lists",
                "charmap",
                "preview",
                "anchor",
                "pagebreak",
                "searchreplace",
                "wordcount",
                "visualblocks",
                "visualchars",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "emoticons",
                "help",
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
