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
// Create project
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

// edit project
export async function updateProject(projectId) {
  try {
  } catch (error) {}
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
// get status

export async function getStatus() {
  try {
    const response = await fetcher.get("/Status/getAll");

    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
// get priority

export async function getPriority() {
  try {
    const response = await fetcher.get("/Priority/getAll");

    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
// get task Type

export async function getTaskType() {
  try {
    const response = await fetcher.get("/TaskType/getAll");

    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
// Create tast
export async function createTask(payload) {
  try {
    const response = await fetcher.post("/Project/createTask", payload);
    // thêm ? optional chaining vào data để kiểm tra có dữ liệu thì trả chứ không báo lỗi
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
// Edit task
export async function editTask(payload) {
  try {
    const response = await fetcher.post("/Project/updateTask", payload);
    // thêm ? optional chaining vào data để kiểm tra có dữ liệu thì trả chứ không báo lỗi
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
// get Task Details
export async function getTaskDetail(taskId) {
  try {
    const response = await fetcher.get("/Project/getTaskDetail", {
      params: {
        id: taskId,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
