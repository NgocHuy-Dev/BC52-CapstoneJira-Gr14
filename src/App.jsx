import UserProvider from "./contexts/UserContext/UserContext";
import ProjectLayout from "./layout/ProjectLayout/ProjectLayout";
import Home from "./modules/Home";
import SignIn from "./modules/Auth/Sign-in";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProject from "./modules/EditProject/EditProject";
import ProtectedRoute from "./Routers/ProtectedRoute/ProtectedRoute";
import Signup from "./modules/Auth/Sign-up/Signup";
import ProjectDetail from "./modules/ProjectDetail/ProjectDetail";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ProjectLayout />}>
              <Route index element={<Home />} />
              <Route path="/projectdetail" element={<ProjectDetail />} />
            </Route>
            <Route path="/edit/:projectId" element={<EditProject />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
<<<<<<< HEAD
          {/* <Route path="/loginfb" element={<LoginFb />} /> */}
          <Route exact path="*" element={<NotFound />} />
=======
>>>>>>> 2b926a73b6d631c823e6cb03c25f1d7236d447be
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
