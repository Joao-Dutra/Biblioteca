import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para pegar o ID do usuário na URL
import { Book, Star, RefreshCw } from "lucide-react";
import { Usuario, Livro } from "../../types"; // Importando os tipos

const API_BASE_URL = "http://localhost:8080"; // Ajuste para a URL correta do seu backend

export default function Profile() {
  const { id } = useParams(); // Pegando o ID do usuário da URL
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Buscar os dados do usuário
        const userResponse = await fetch(`${API_BASE_URL}/usuarios/${id}`);
        const userData: Usuario = await userResponse.json();
        setUsuario(userData);

        // Buscar os livros do usuário
        const booksResponse = await fetch(`${API_BASE_URL}/livros?usuario_id=${id}`);
        const booksData: Livro[] = await booksResponse.json();
        setLivros(booksData);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (!usuario) {
    return <p className="text-center text-gray-500">Carregando perfil...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Perfil do Usuário */}
          <div className="md:w-1/3 bg-indigo-50 p-8 flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150" // Pode ser atualizado para a URL real
              alt={usuario?.nome || "Usuário"}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{usuario.nome}</h1>
            <p className="text-gray-600 text-center mt-2">{usuario.email}</p>
            <p className="text-gray-500 text-sm mt-2">Cadastrado em: {new Date(usuario.dataCadastro).toLocaleDateString()}</p>

            <button className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Editar Perfil
            </button>
          </div>

          {/* Lista de Livros */}
          <div className="md:w-2/3 p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Meus Livros</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {livros.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg shadow p-4 flex">
                    <img
                      src="https://via.placeholder.com/80x120" // Adicione uma URL real para as capas
                      alt={book.titulo}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{book.titulo}</h3>
                      <p className="text-sm text-gray-600">{book.autor}</p>
                      <span className="inline-block mt-2 text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                        {book.estadoConservacao}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Atividade Recente (Mockada por enquanto) */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Atividade Recente</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <RefreshCw className="h-8 w-8 text-indigo-600" />
                    <div className="ml-4">
                      <p className="text-gray-900">Troca realizada com Maria Santos</p>
                      <p className="text-sm text-gray-600">Livro: Duna</p>
                      <p className="text-xs text-gray-500">Há 2 dias</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-yellow-400" />
                    <div className="ml-4">
                      <p className="text-gray-900">Nova avaliação publicada</p>
                      <p className="text-sm text-gray-600">Livro: Fundação</p>
                      <p className="text-xs text-gray-500">Há 5 dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fim da Atividade */}
          </div>
        </div>
      </div>
    </div>
  );
}
