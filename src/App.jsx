import UserProvider from "./contexts/UserContext/UserContext";
import ProjectLayout from "./layout/ProjectLayout/ProjectLayout";
import Home from "./modules/Home";
import SignIn from "./modules/Auth/Sign-in";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProject from "./modules/EditProject/EditProject";
import ProtectedRoute from "./Routers/ProtectedRoute/ProtectedRoute";
import Signup from "./modules/Auth/Sign-up/Signup";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ProjectLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/edit/:projectId" element={<EditProject />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
