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
    const response = await fetcher.get("/Users/getUserByProjectId", {
      params: {
        projectId: projectId,
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};
// xóa user
export const deleteUser = async (userId) => {
  try {
    const response = await fetcher.delete("/Users/deleteUser", {
      params: {
        userId: userId,
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};
// edit user
export const editUser = async (userId) => {
  try {
    const response = await fetcher.put("/Users/editUser", {
      params: {
        userId: userId,
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};