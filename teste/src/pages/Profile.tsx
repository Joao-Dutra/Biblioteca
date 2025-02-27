import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, RefreshCw, Star, Calendar, Mail } from "lucide-react";

interface User {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
  avatarUrl?: string;
  booksCount?: number;
  exchangesCount?: number;
  reviewsCount?: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  status: string;
}

export default function Profile() {
  const { email } = useParams<{ email: string }>(); // Obtém o email da URL
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!email) return;

    // Busca os dados do usuário pelo email
    fetch(`http://localhost:8080/usuarios/email/${email}`)
      .then((response) => response.json())
      .then((data: User) => setUser(data))
      .catch((error) => console.error("Erro ao buscar usuário:", error));

    // Busca os livros do usuário
    fetch(`http://localhost:8080/livros/usuario/${email}`)
      .then((response) => response.json())
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error("Erro ao buscar livros:", error));
  }, [email]);

  if (!user) return <p className="text-center text-[#594a42]">Carregando...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Lado esquerdo - Perfil do usuário */}
          <div className="md:w-1/3 bg-indigo-50 p-8 flex flex-col items-center">
            <img
              src={user.avatarUrl || "https://via.placeholder.com/150"}
              alt={user.nome}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{user.nome}</h1>
            <div className="flex items-center space-x-2 text-[#594a42] mt-2">
              <Mail className="h-5 w-5" />
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#594a42] mt-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">
                Membro desde: {new Date(user.dataCadastro).toLocaleDateString()}
              </span>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 w-full mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{user.booksCount || 0}</div>
                <div className="text-sm text-gray-600">Livros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{user.exchangesCount || 0}</div>
                <div className="text-sm text-gray-600">Trocas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{user.reviewsCount || 0}</div>
                <div className="text-sm text-gray-600">Resenhas</div>
              </div>
            </div>

            <button className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Editar Perfil
            </button>
          </div>

          {/* Lado direito - Meus livros e Atividade */}
          <div className="md:w-2/3 p-8">
            {/* Meus Livros */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Meus Livros</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {books.length > 0 ? (
                  books.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow p-4 flex">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{book.title}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                        <span className="inline-block mt-2 text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                          {book.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Nenhum livro cadastrado.</p>
                )}
              </div>
            </div>

            {/* Atividade Recente */}
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
          </div>
        </div>  
      </div>
    </div>
  );
}
