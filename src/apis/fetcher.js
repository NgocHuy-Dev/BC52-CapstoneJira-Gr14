import axios from "axios";

// Setup axios instance
const fetcher = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjI4LzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTA3ODQwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA5MjI2MDAwfQ.GboZ7OZlrOvJ_T6lEZ9PfGJD8vygDn30BxaLgB43WbM",
  },
});

//REquest interceptor
fetcher.interceptors.request.use((request) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    request.headers.Authorization = `Bearel ${user.accessToken}`;
  }
  return request;
});

// Response
fetcher.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Kiểm tra trả lỗi 401 => token ko hợp lệ => đĂNG xuất
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/sign-in");
    }
    return Promise.reject(error);
  }
);

export default fetcher;
