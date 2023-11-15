import fetcher from "./fetcher";

// hàm post người dùng (đăng nhập) gửi lên API
export async function signin(payload) {
  try {

      const response = await fetcher.post('/quanlynguoidung/dangnhap/',payload);
      // thêm ? optional chaining vào data để kiểm tra có dữ liệu thì trả chứ không báo lỗi
      return (response.data?.content);
    
  } catch  (error){
     
      throw (error.response.data?.content);
    }


        
//////////////////////////////////////////////////////

// axios.post('/quanlynguoidung/dangnhap', payload)
//   .then((response) => {
//     return (response.data?.content);
//   })
//   .catch((error) => {
//     return (error.response.data?.content);
//   });



  }

  //signin(payload);

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/quanlynguoidung/dangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};



export const editUser = async (payload) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getInfoUser = async (username) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/LayThongTinNguoiDung",
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
      {
        params: {
          taiKhoan: username,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const addUser = async (payload) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const removeUser = async (username) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.delete(
      "/QuanLyNguoiDung/XoaNguoiDung",
      {
        params: {
          TaiKhoan: username || undefined,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};



export async function getCustomer() {
  try {
    const response = await fetcher.get(
      "/QuanLyNguoiDung/LayDanhSachNguoiDung",
      {
        params: {
          MaNhom: "GP13",
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}