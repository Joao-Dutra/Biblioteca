import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import React from "react";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile/:email" element={<Profile />} /> {/* Rota com email dinâmico */}
    </Routes>
  );
}
