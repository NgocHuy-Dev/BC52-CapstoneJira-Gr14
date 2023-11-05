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
