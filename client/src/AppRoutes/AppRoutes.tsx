import { Route, Routes } from "react-router-dom";
import Room from "../pages/Room";
import SignIn from "../pages/SignIn";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/room" element={<Room />} />
    </Routes>
  );
};

export default AppRoutes;
