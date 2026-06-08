import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;