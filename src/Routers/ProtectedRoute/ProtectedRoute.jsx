import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();

  const location = useLocation();
  console.log(location);

  if (!currentUser) {
    //User chưa đăng nhập => redirect về trang login
    const url = `/signin?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  // if(currentUser.maLoaiNguoiDung !== "QuanTri"){
  //     return <Navigate to="/404"/>
  // }

  return children || <Outlet />;
}
/*
TH1:
<Route path ="..."
element = {
    <ProtectedRoute>
    <Component/>
    </ProtectedRoute>
}
 />
*/
