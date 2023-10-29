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
