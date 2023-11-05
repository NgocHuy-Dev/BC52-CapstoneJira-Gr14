import fetcher from "./fetcher";

export async function getAllProject() {
  try {
    const response = await fetcher.get("/Project/getAllProject");

    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function getProjectDetail(projectId) {
  try {
    const response = await fetcher.get("/Project/getProjectDetail", {
      params: {
        id: projectId,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// Create project
export async function getProjectCategory() {
  try {
    const response = await fetcher.get("/ProjectCategory");

    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function createProject(payload) {
  try {
    const response = await fetcher.post(
      "/Project/createProjectAuthorize",
      payload
    );
    // thêm ? optional chaining vào data để kiểm tra có dữ liệu thì trả chứ không báo lỗi
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// Create project

// edit project
export async function updateProject(payload) {
  try {
    const response = await fetcher.put("/Project/updateProject", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// xóa project
export const deleteProject = async (projectId) => {
  try {
    const response = await fetcher.delete("/Project/deleteProject", {
      params: {
        projectId: projectId,
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};

// xóa user trong project
export const removeUserFromProject = async (userId) => {
  try {
    const response = await fetcher.post("/Project/removeUserFromProject");
  } catch (error) {
    throw error.response.data;
  }
};
