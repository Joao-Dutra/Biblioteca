import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, RefreshCw, Star, Calendar, Mail } from "lucide-react";

interface User {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
}

interface Book {
  id: number;
  titulo: string;
  autor: string;
  estado_conservacao: string;
  usuario_id: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // Se não tiver usuário logado, redireciona para login
      return;
    }

    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    // Busca os livros do usuário pelo ID armazenado no localStorage
    fetch(`http://localhost:8080/livros/usuario/${parsedUser.id}`)
      .then((response) => response.json())
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error("Erro ao buscar livros:", error));
  }, [navigate]);

  if (!user) return <p className="text-center text-[#594a42]">Carregando...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-indigo-50 p-8 flex flex-col items-center">
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

            <button
              className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => {
                localStorage.removeItem("user"); // Remove usuário do localStorage
                navigate("/login");
              }}
            >
              Sair
            </button>
          </div>

          <div className="md:w-2/3 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Meus Livros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {books.length > 0 ? (
                books.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg shadow p-4 flex">
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{book.titulo}</h3>
                      <p className="text-sm text-gray-600">{book.autor}</p>
                      <span className="inline-block mt-2 text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                        {book.estado_conservacao}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Nenhum livro cadastrado.</p>
              )}
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
