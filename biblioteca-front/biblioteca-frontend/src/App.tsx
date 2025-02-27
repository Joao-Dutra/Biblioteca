import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes"; // Importando as rotas
import Navbar from "./components/Navbar"; // Se tiver uma Navbar

export default function App() {
  return (
    <Router>
      <Navbar /> {/* Exibir a Navbar em todas as páginas */}
      <AppRoutes />
    </Router>
  );
}
