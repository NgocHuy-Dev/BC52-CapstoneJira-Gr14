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

    // edit project

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
