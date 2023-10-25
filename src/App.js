import UserProvider from "./contexts/UserContext/UserContext";
import ProjectLayout from "./layout/ProjectLayout/ProjectLayout";
import Home from "./modules/Home";
import SignIn from "./modules/Auth/Sign-in";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/create" element={} /> */}
          </Route>
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
