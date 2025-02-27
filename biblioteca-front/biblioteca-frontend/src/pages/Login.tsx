import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { API_URL } from "../../api"; // Certifique-se de que API_URL está correto

export default function Login() {
  // Estados para armazenar email, senha e erro
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); // Alterado para "senha" (igual ao backend)
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Para redirecionar o usuário

  // Função de envio do formulário (chama a API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: senha}), 
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ${response.status}: ${errorMessage}`);
      }
  
      const data = await response.json();
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("token", data.token);
      navigate(`/profile/${data.email}`);
    } catch (err) {
      console.error("Erro no login:", err.message);
      setError(err.message);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h1>
          <p className="text-gray-600 mt-2">Entre para continuar trocando livros</p>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Exibe erro se houver */}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
