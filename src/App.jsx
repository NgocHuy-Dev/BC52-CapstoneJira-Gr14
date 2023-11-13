import UserProvider from "./contexts/UserContext/UserContext";
import ProjectLayout from "./layout/ProjectLayout/ProjectLayout";
import Home from "./modules/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProject from "./modules/EditProject/EditProject";
import ProtectedRoute from "./Routers/ProtectedRoute/ProtectedRoute";
import ProjectDetail from "./modules/ProjectDetail/ProjectDetail";
import CreateProject from "./modules/CreateProject";

import NotFound from "./components/NotFound/NotFound";
import Signin from "./modules/Auth/pages/Signin";
import Signup from "./modules/Auth/pages/Signup";
import CreateTask from "./modules/CreateTask/CreateTask";
import EditTask from "./modules/Auth/components/EditTask/EditTask";
import UserManagement from "./modules/User/UserManagement/UserManagement";
import Text from "./modules/EditProject/Text";

function App() {
  <UserManagement />;

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ProjectLayout />}>
              <Route index element={<Home />} />
              <Route
                path="/projectdetail/:projectId"
                element={<ProjectDetail />}
              />
              <Route path="/createproject" element={<CreateProject />} />
              <Route path="/createtask" element={<CreateTask />} />
              <Route path="/edit/task" element={<EditTask />} />
              <Route path="/user/management" element={<UserManagement />} />
              {/* <Route path="/user/edit/:userId" element={<EditUser />} /> */}
            </Route>
            <Route path="/edit/:projectId" element={<EditProject />} />
          </Route>

          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
