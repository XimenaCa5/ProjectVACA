import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>HOME OK</h1>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
