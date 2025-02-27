import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api"; // Certifique-se de que está apontando para a URL correta

export default function RegisterBook() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [edicao, setEdicao] = useState("");
  const [estadoConservacao, setEstadoConservacao] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/livros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: 1, // ⚠️ Mudar para o ID do usuário autenticado!
          titulo,
          autor,
          edicao,
          estadoConservacao,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar livro!");
      }

      navigate("/books"); // Redireciona para a listagem de livros após o cadastro
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Cadastrar Novo Livro
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Autor</label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Edição</label>
            <input
              type="text"
              value={edicao}
              onChange={(e) => setEdicao(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado de Conservação
            </label>
            <select
              value={estadoConservacao}
              onChange={(e) => setEstadoConservacao(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Selecione</option>
              <option value="Novo">Novo</option>
              <option value="Usado - Excelente">Usado - Excelente</option>
              <option value="Usado - Bom">Usado - Bom</option>
              <option value="Usado - Aceitável">Usado - Aceitável</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Cadastrar Livro
          </button>
        </form>
      </div>
    </div>
  );
}
