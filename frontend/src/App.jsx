import React from "react";
import { Route, Routes } from "react-router-dom";
import MainForm from "./pages/MainForm";
import AdminDashBoard from "./pages/AdminDashBoard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainForm />} />
      <Route path="/admin" element={<AdminDashBoard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<MainForm />} />
    </Routes>
  );
};

export default App;
