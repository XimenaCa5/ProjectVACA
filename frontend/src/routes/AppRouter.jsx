import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/Home";
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard";
import Register from "../pages/register/Register";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}
