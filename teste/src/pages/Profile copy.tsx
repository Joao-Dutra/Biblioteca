import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mail, User, Calendar, Edit } from "lucide-react";

interface User {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
}

export default function Profile() {
  const { email } = useParams<{ email: string }>(); // Obtém o email da URL
  const [user, setUser] = useState<User | null>(null); // Define o estado como `User | null`

  useEffect(() => {
    if (!email) return; // Evita chamadas desnecessárias

    fetch(`http://localhost:8080/usuarios/email/${email}`) // Busca usuário pelo email
      .then((response) => response.json())
      .then((data: User) => setUser(data)) // Tipagem correta do JSON
      .catch((error) => console.error("Erro ao buscar usuário:", error));
  }, [email]);

  if (!user) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Perfil de {user.nome}</h1>
          <p className="text-gray-600 mt-2">Gerencie seus dados</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={user.nome}
                readOnly
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={user.email}
                readOnly
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Cadastro</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={new Date(user.dataCadastro).toLocaleDateString()}
                readOnly
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <Edit className="h-5 w-5 mr-2" />
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
