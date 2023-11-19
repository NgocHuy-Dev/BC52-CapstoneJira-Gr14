import fetcher from "./fetcher";

export const getComment = async (taskId) => {
  try {
    const response = await fetcher.get("/Comment/getAll", {
      params: {
        taskId: taskId,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const insertComment = async (payload) => {
  try {
    const response = await fetcher.post("/Comment/insertComment", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await fetcher.delete("/Comment/deleteComment", {
      params: {
        idComment: commentId,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
