import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();

  const location = useLocation();
  console.log(location);

  if (!currentUser) {
    // chưa đăng nhập
    const url = `sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }
  return children || <Outlet />;
}
