import fetcher from "./fetcher";

export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/Users/signin", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/Users/signup", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export async function getUser(name) {
  try {
    const response = await fetcher.get("Users/getUser", {
      params: {
        keyword: name,
      },
    });

    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// getUsers
export async function getUsers() {
  try {
    const response = await fetcher.get("/Users/getUser");

    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
// getUsers by projectID
export const getUserByProjectId = async (projectId) => {
  try {
    await fetcher.get("/Users/getUserByProjectId", {
      params: {
        projectId: projectId,
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const assignUserProject = async (payload) => {
  try {
    await fetcher.post("/Project/assignUserProject", payload);
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUserFromProject = async (payload) => {
  try {
    await fetcher.post("/Project/removeUserFromProject", payload);
  } catch (error) {
    throw error.response.data;
  }
};
// edit user
export const editUser = async (payload) => {
  try {
    const response = await fetcher.put("/Users/editUser", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetcher.delete("/Users/deleteUser", {
      params: {
        id: id,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
