import UserProvider from "./contexts/UserContext/UserContext";
import ProjectLayout from "./layout/ProjectLayout/ProjectLayout";
import Home from "./modules/Home";
import SignIn from "./modules/Auth/Sign-in";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProject from "./modules/EditProject/EditProject";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectLayout />}>
            <Route index element={<Home />} />
            <Route path="edit/:projectId" element={<EditProject />} />
          </Route>

          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;