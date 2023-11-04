import UserProvider from "./contexts/UserContext/UserContext";
import ProjectLayout from "./layout/ProjectLayout/ProjectLayout";
import Home from "./modules/Home";
import SignIn from "./modules/Auth/Sign-in";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProject from "./modules/EditProject/EditProject";
import ProtectedRoute from "./Routers/ProtectedRoute/ProtectedRoute";
// import Signup from "./modules/Auth/Sign-up/Signup";
import Signup from "./modules/Auth/Signup/Signup";
import ProjectDetail from "./modules/ProjectDetail/ProjectDetail";
import CreateProject from "./modules/CreateProject";
import LoginFb from "./modules/Auth/FacebookLogin/LoginFb";
import NotFound from "./components/NotFound/NotFound";

function App() {
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
            </Route>
            <Route path="/edit/:projectId" element={<EditProject />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/loginfb" element={<LoginFb />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
